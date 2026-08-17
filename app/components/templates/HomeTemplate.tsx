import { getTranslations } from 'next-intl/server';

import { Footer } from '@/app/components/organisms/Footer';
import { HeroSection } from '@/app/components/organisms/HeroSection';
import { CostLadder } from '@/app/components/organisms/home/CostLadder';
import { InformationValue } from '@/app/components/organisms/home/InformationValue';
import { NavBar } from '@/app/components/organisms/NavBar';
import { ProofBar } from '@/app/components/organisms/ProofBar';
import { SectionsGrid } from '@/app/components/organisms/SectionsGrid';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';
import { FitNotFit } from '@/app/components/organisms/sector/FitNotFit';

const COST_LADDER_ITEM_COUNT = 4;
const PROOF_ITEM_COUNT = 4;
const VALUE_POINT_COUNT = 3;

export const HomeTemplate = async () => {
  const t = await getTranslations('homePage');

  return (
    <main className="flex flex-col min-h-screen w-full">
      <NavBar variant="dark" />
      <HeroSection />

      <div className="max-w-480 mx-auto w-full flex flex-col flex-1">
        <SectionsGrid />

        <CostLadder
          eyebrow={t('costLadder.eyebrow')}
          headline={t('costLadder.headline')}
          items={Array.from({ length: COST_LADDER_ITEM_COUNT }, (_, i) => ({
            label: t(`costLadder.item${i}.label`),
            tag: t(`costLadder.item${i}.tag`),
          }))}
        />

        <ProofBar
          headline={t('proof.headline')}
          items={Array.from({ length: PROOF_ITEM_COUNT }, (_, i) => ({
            slot: t(`proof.item${i}.slot`),
            figure: t(`proof.item${i}.figure`),
            statement: t(`proof.item${i}.statement`),
          }))}
          cta={{ label: t('proof.cta'), href: '/projects' }}
        />

        <InformationValue
          eyebrow={t('informationValue.eyebrow')}
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
