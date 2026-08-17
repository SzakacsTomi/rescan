#!/usr/bin/env node
/**
 * Reports every open `[[TODO: …]]` slot in the message catalogues, grouped by the page that
 * renders it, plus locale drift — a key filled in one catalogue but still pending in the other.
 *
 * Usage: yarn todos [--md]
 */
import { readFileSync } from 'node:fs';

const TODO_PATTERN = /^\s*\[\[TODO:\s*([\s\S]*?)\]\]\s*$/;
const LOCALES = ['en', 'sv'];

/** Top-level namespace → the page a reader would look for it on. */
const PAGE_OF_NAMESPACE = {
  metadata: 'Site metadata',
  homePage: '/',
  'sectorPage.retail': '/retail-chains',
  'sectorPage.logistics': '/logistics-warehouses',
  whyRescanPage: '/why-rescan',
  projectsPage: '/projects',
  contactPage: '/contact',
  aboutPage: '/about',
  nav: 'Navigation',
  footer: 'Footer',
  common: 'Shared',
};

const asMarkdown = process.argv.includes('--md');

const flatten = (value, prefix = '') =>
  Object.entries(value).flatMap(([key, child]) =>
    child !== null && typeof child === 'object'
      ? flatten(child, `${prefix}${key}.`)
      : [[`${prefix}${key}`, String(child)]],
  );

const catalogues = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    new Map(flatten(JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')))),
  ]),
);

const pageFor = (key) => {
  const match = Object.keys(PAGE_OF_NAMESPACE)
    .filter((namespace) => key === namespace || key.startsWith(`${namespace}.`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? PAGE_OF_NAMESPACE[match] : 'Other';
};

const hintOf = (value) => value.match(TODO_PATTERN)?.[1]?.trim() ?? null;

const pending = new Map();
const drift = [];

for (const key of catalogues.en.keys()) {
  const hints = LOCALES.map((locale) => hintOf(catalogues[locale].get(key) ?? ''));
  const [enHint, svHint] = hints;

  if (hints.every((hint) => hint === null)) continue;

  if (hints.some((hint) => hint === null)) {
    drift.push({ key, filledIn: enHint === null ? 'en' : 'sv', pendingIn: enHint === null ? 'sv' : 'en' });
    continue;
  }

  const page = pageFor(key);
  if (!pending.has(page)) pending.set(page, []);
  pending.get(page).push({ key, hint: enHint ?? svHint });
}

const total = [...pending.values()].reduce((sum, items) => sum + items.length, 0);

if (asMarkdown) {
  console.log(`# Open placeholders (${total})\n`);
  for (const [page, items] of pending) {
    console.log(`## ${page} — ${items.length}\n`);
    for (const { key, hint } of items) console.log(`- \`${key}\` — ${hint}`);
    console.log('');
  }
} else {
  console.log(`Open placeholders: ${total}\n`);
  for (const [page, items] of pending) {
    console.log(`${page}  (${items.length})`);
    for (const { key, hint } of items) console.log(`  ${key}\n    ${hint}`);
    console.log('');
  }
}

if (drift.length > 0) {
  const heading = `Locale drift (${drift.length}) — filled in one catalogue, still pending in the other:`;
  console.log(asMarkdown ? `## ${heading}\n` : `${heading}\n`);
  for (const { key, filledIn, pendingIn } of drift) {
    console.log(`  ${key}  filled: ${filledIn}  pending: ${pendingIn}`);
  }
  console.log('');
}
