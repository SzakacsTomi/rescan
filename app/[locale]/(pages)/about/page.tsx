import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/app/components/atoms/JsonLd';
import { AboutTemplate } from '@/app/components/templates/AboutTemplate';
import { resolvePageJsonLd, resolvePageMetadata } from '@/i18n/metadata';

const FACT_COUNT = 3;
const MEMBER_COUNT = 3;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return resolvePageMetadata((await params).locale, 'about');
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('aboutPage');

  const jsonLd = await resolvePageJsonLd(locale, 'about');

  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutTemplate
        hero={{
          eyebrow: t('hero.eyebrow'),
          headline: t('hero.headline'),
          subheadline: t('hero.subheadline'),
          facts: Array.from({ length: FACT_COUNT }, (_, i) => {
            const key = ['registeredOffice', 'languages', 'founded'][i];
            return {
              label: t(`hero.facts.${key}.label`),
              value: t(`hero.facts.${key}.value`),
            };
          }),
          image: t('hero.image'),
        }}
        focus={{
          headline: t('focus.headline'),
          headlineAccent: t('focus.headlineAccent'),
          body: t('focus.body'),
          recordLabel: t('focus.recordLabel'),
          record: t('focus.record'),
          aim: t('focus.aim'),
        }}
        presence={{
          items: [
            { label: t('presence.item0.label'), value: t('presence.item0.value') },
            {
              label: t('presence.item1.label'),
              value: t('presence.item1.value'),
              coordinates: t('presence.item1.coordinates'),
            },
          ],
        }}
        people={{
          headline: t('people.headline'),
          organization: t('people.organization'),
          members: Array.from({ length: MEMBER_COUNT }, () => t('people.member')),
        }}
        cta={{
          headline: t('cta.headline'),
          subheadline: t('cta.subheadline'),
          cta: t('cta.cta'),
        }}
      />
    </>
  );
}