import { getTranslations } from 'next-intl/server';

import { LanguageSwitcher } from '@/app/components/atoms/LanguageSwitcher';
import { Footer } from '@/app/components/organisms/Footer';
import { HeroSection } from '@/app/components/organisms/HeroSection';
import { InformationValue } from '@/app/components/organisms/home/InformationValue';
import { ProofBar } from '@/app/components/organisms/ProofBar';
import { SectionsGrid } from '@/app/components/organisms/SectionsGrid';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';
import { FitNotFit } from '@/app/components/organisms/sector/FitNotFit';

const PROOF_ITEM_COUNT = 4;
const VALUE_POINT_COUNT = 3;

export const HomeTemplate = async () => {
  const t = await getTranslations('homePage');

  return (
    <main className="flex flex-col min-h-screen w-full">
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-480 mx-auto px-6 py-5 flex justify-end pointer-events-auto">
          <LanguageSwitcher />
        </div>
      </header>
      <HeroSection />

      <div className="max-w-480 mx-auto w-full flex flex-col flex-1">
        <SectionsGrid />

        <ProofBar
          headline={t('proof.headline')}
          items={Array.from({ length: PROOF_ITEM_COUNT }, (_, i) => ({
            figure: t(`proof.item${i}.figure`),
            statement: t(`proof.item${i}.statement`),
          }))}
          cta={{ label: t('proof.cta'), href: '/projects' }}
        />

        <InformationValue
          headline={t('informationValue.headline')}
          points={Array.from({ length: VALUE_POINT_COUNT }, (_, i) => ({
            title: t(`informationValue.point${i}.title`),
            description: t(`informationValue.point${i}.description`),
          }))}
          cta={{ label: t('informationValue.cta'), href: '/why-rescan' }}
        />

        <FitNotFit
          headline={t('qualification.headline')}
          bestFit={{
            title: t('qualification.bestFit.title'),
            items: [
              t('qualification.bestFit.item0'),
              t('qualification.bestFit.item1'),
              t('qualification.bestFit.item2'),
            ],
          }}
          notFit={{
            title: t('qualification.notFit.title'),
            items: [t('qualification.notFit.item0'), t('qualification.notFit.item1')],
          }}
        />

        <FinalCTA
          headline={t('finalCta.headline')}
          cta={t('finalCta.cta')}
          ctaHref="/contact"
        />

        <Footer />
      </div>
    </main>
  );
};
