import { getTranslations } from 'next-intl/server';

import { AboutTemplate } from '@/app/components/templates/AboutTemplate';

const FACT_COUNT = 3;
const MEMBER_COUNT = 3;

export default async function AboutPage() {
  const t = await getTranslations('aboutPage');

  return (
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
        body: t('focus.body'),
        narrow: t('focus.narrow'),
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
  );
}