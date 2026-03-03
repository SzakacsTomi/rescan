import { getTranslations } from 'next-intl/server';
import { SectorTemplate } from '@/app/components/templates/SectorTemplate';
import type { SectorPageTranslations } from '@/app/types/sectorPage';
import { commercialSectorConfig } from '@/config/sectors/commercial';

export default async function CommercialPortfoliosPage() {
  const t = await getTranslations('sectorPage.commercial');

  const translations: SectorPageTranslations = {
    hero: {
      headline: t('hero.headline'),
      subheadline: t('hero.subheadline'),
      primaryCta: t('hero.primaryCta'),
      secondaryCta: t('hero.secondaryCta'),
    },
    coreRisk: {
      headline: t('coreRisk.headline'),
      body: t('coreRisk.body'),
    },
    friction: {
      headline: t('friction.headline'),
      points: [
        { title: t('friction.point0.title'), description: t('friction.point0.description') },
        { title: t('friction.point1.title'), description: t('friction.point1.description') },
        { title: t('friction.point2.title'), description: t('friction.point2.description') },
      ],
    },
    strategicValue: {
      headline: t('strategicValue.headline'),
      values: [
        {
          title: t('strategicValue.valueA.title'),
          description: t('strategicValue.valueA.description'),
        },
        {
          title: t('strategicValue.valueB.title'),
          description: t('strategicValue.valueB.description'),
        },
      ],
    },
    differentiator: {
      headline: t('differentiator.headline'),
      subheadline: t('differentiator.subheadline'),
    },
  };

  return <SectorTemplate config={commercialSectorConfig} translations={translations} />;
}
