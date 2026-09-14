import { describe, expect, it } from 'vitest';

import en from '@/messages/en.json';

import {
  contactNotificationHtml,
  contactNotificationSubject,
  contactNotificationText,
  type ContactNotification,
} from './contact-notification';

const form = en.contactPage.form;
const steps = en.contactPage.steps;

const labels: ContactNotification['labels'] = {
  steps,
  questions: {
    scale: form.scale,
    decision: form.decision,
    incomplete: form.incomplete,
    additionalContext: form.additionalContext,
  },
  sector: form.sectorOptions.retail,
  timing: form.timingOptions.oneToThree,
};

const notification: ContactNotification = {
  enquiry: {
    sector: 'retail',
    name: 'Anna Lindqvist',
    email: 'anna@nordkedjan.se',
    company: 'Nordkedjan Fastigheter AB',
    role: 'Head of Property Development',
    scale: '48 stores',
    decision: 'Refits of six stores next year.',
    incomplete: 'Another site visit and a redesign round.',
    timing: 'oneToThree',
    additionalContext: 'Two are listed buildings.',
  },
  labels,
  locale: 'sv',
  receivedAt: new Date('2026-09-14T20:04:00Z'),
};

const withoutOptionals = (): ContactNotification => ({
  ...notification,
  enquiry: {
    sector: 'retail',
    name: 'Erik Holm',
    email: 'e.holm@example.com',
    company: 'Holm Logistik',
    decision: 'A mezzanine install.',
    timing: 'oneToThree',
  },
});

describe('contactNotificationSubject', () => {
  it('carries what the office triages on', () => {
    expect(contactNotificationSubject(notification)).toBe(
      'New enquiry · Nordkedjan Fastigheter AB — Retail Property Portfolios, 1–3 months',
    );
  });
});

describe('contactNotificationHtml', () => {
  it('prints the chosen options as labels, never as their keys', () => {
    const html = contactNotificationHtml(notification);
    expect(html).toContain('Retail Property Portfolios');
    expect(html).toContain('1–3 months');
    expect(html).not.toContain('oneToThree');
  });

  it('asks the questions the form asked', () => {
    const html = contactNotificationHtml(notification);
    expect(html).toContain(form.decision);
    expect(html).toContain(form.incomplete);
  });

  it('numbers its bands from the form groups', () => {
    const html = contactNotificationHtml(notification);
    expect(html).toContain(`01 / ${steps.identity}`);
    expect(html).toContain(`05 / ${steps.timing}`);
  });

  it('says an optional answer was skipped rather than dropping the band', () => {
    const html = contactNotificationHtml(withoutOptionals());
    expect(html).toContain(form.incomplete);
    expect(html).toContain('Not answered');
  });

  it('states which language the enquiry arrived in', () => {
    expect(contactNotificationHtml(notification)).toContain('Swedish (SV)');
  });

  it('escapes what the sender wrote', () => {
    const html = contactNotificationHtml({
      ...notification,
      enquiry: { ...notification.enquiry, company: '<script>alert("x")</script>' },
    });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('keeps the line breaks the sender typed', () => {
    const html = contactNotificationHtml({
      ...notification,
      enquiry: { ...notification.enquiry, decision: 'First line.\nSecond line.' },
    });
    expect(html).toContain('First line.<br />Second line.');
  });

  it('resolves the reply address into a usable mailto', () => {
    expect(contactNotificationHtml(notification)).toContain('href="mailto:anna@nordkedjan.se?subject=');
  });
});

describe('contactNotificationText', () => {
  it('carries every answer, so a client that shows only text loses nothing', () => {
    const text = contactNotificationText(notification);
    expect(text).toContain('Anna Lindqvist');
    expect(text).toContain('Refits of six stores next year.');
    expect(text).toContain('Two are listed buildings.');
    expect(text).toContain('Retail Property Portfolios');
  });

  it('marks a skipped optional answer', () => {
    expect(contactNotificationText(withoutOptionals())).toContain('Not answered');
  });
});
