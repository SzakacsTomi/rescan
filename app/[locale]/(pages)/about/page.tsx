import { getTranslations } from 'next-intl/server';
import { AboutTemplate } from '@/app/components/templates/AboutTemplate';

export default async function AboutPage() {
  const t = await getTranslations('aboutPage');

  const translations = {
    hero: {
      headline: t('hero.headline'),
      subheadline: t('hero.subheadline'),
      primaryCta: t('hero.primaryCta'),
      secondaryCta: t('hero.secondaryCta'),
    },
    mission: {
      headline: t('mission.headline'),
      body: t('mission.body'),
    },
    capabilities: {
      headline: t('capabilities.headline'),
      cap0: {
        title: t('capabilities.cap0.title'),
        description: t('capabilities.cap0.description'),
      },
      cap1: {
        title: t('capabilities.cap1.title'),
        description: t('capabilities.cap1.description'),
      },
      cap2: {
        title: t('capabilities.cap2.title'),
        description: t('capabilities.cap2.description'),
      },
    },
    cta: {
      headline: t('cta.headline'),
      primaryCta: t('cta.primaryCta'),
      secondaryCta: t('cta.secondaryCta'),
    },
  };

  return <AboutTemplate translations={translations} />;
}
