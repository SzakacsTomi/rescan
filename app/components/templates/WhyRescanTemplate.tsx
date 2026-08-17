import { CORE_RISK_ID, CoreRisk } from '@/app/components/organisms/sector/CoreRisk';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';
import { FitNotFit } from '@/app/components/organisms/sector/FitNotFit';
import { ProofBar } from '@/app/components/organisms/ProofBar';
import { SectorHero } from '@/app/components/organisms/sector/SectorHero';
import { Pillars } from '@/app/components/organisms/whyRescan/Pillars';

type WhyRescanTemplateProps = {
  hero: { headline: string; subheadline: string; cta: string; secondaryCta: string };
  corePrinciple: { headline: string; body: string };
  pillars: {
    headline: string;
    proofLabel: string;
    items: Array<{ title: string; lead: string; body: string; proof: string }>;
  };
  proof: {
    headline: string;
    items: Array<{ slot: string; figure: string }>;
    cta: { label: string; href: string };
  };
  focused: {
    headline: string;
    bestFit: { title: string; items: string[] };
    notFit: { title: string; items: string[] };
  };
  finalCta: { headline: string; cta: string };
};

export const WhyRescanTemplate = ({
  hero,
  corePrinciple,
  pillars,
  proof,
  focused,
  finalCta,
}: WhyRescanTemplateProps) => {
  return (
    <>
      <SectorHero
        headline={hero.headline}
        subheadline={hero.subheadline}
        primaryCta={{ label: hero.cta, href: '/contact' }}
        secondaryCta={{ label: hero.secondaryCta, href: '/projects' }}
        scrollTargetId={CORE_RISK_ID}
      />
      <CoreRisk headline={corePrinciple.headline} body={corePrinciple.body} />
      <Pillars
        headline={pillars.headline}
        proofLabel={pillars.proofLabel}
        pillars={pillars.items}
      />
      <ProofBar headline={proof.headline} items={proof.items} cta={proof.cta} />
      <FitNotFit
        headline={focused.headline}
        bestFit={focused.bestFit}
        notFit={focused.notFit}
      />
      <FinalCTA headline={finalCta.headline} cta={finalCta.cta} ctaHref="/contact" />
    </>
  );
};
