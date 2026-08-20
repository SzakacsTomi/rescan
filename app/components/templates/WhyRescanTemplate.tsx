import { CorePrinciple } from '@/app/components/organisms/whyRescan/CorePrinciple';
import { FocusedByDesign } from '@/app/components/organisms/whyRescan/FocusedByDesign';
import { Pillars } from '@/app/components/organisms/whyRescan/Pillars';
import { ProofLedger } from '@/app/components/organisms/whyRescan/ProofLedger';
import { WhyRescanHero } from '@/app/components/organisms/whyRescan/WhyRescanHero';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';

type WhyRescanTemplateProps = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    anchors: string[];
    questionLabel: string;
    question: string;
    cta: string;
  };
  corePrinciple: {
    headline: string;
    body: string;
    rolesLabel: string;
    roles: string[];
  };
  pillars: {
    headline: string;
    monoLabel: string;
    proofLabel: string;
    items: Array<{ title: string; lead: string; body: string; proof: string }>;
  };
  proof: {
    headline: string;
    rows: Array<{ slot: string; figure: string; statement: string }>;
    cta: { label: string; href: string };
  };
  focused: {
    headline: string;
    note: string;
    items: string[];
    notFitLabel: string;
    notFitText: string;
  };
  finalCta: { eyebrow: string; headline: string; cta: string };
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
      <WhyRescanHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        anchors={hero.anchors}
        questionLabel={hero.questionLabel}
        question={hero.question}
        cta={{ label: hero.cta, href: '/contact' }}
      />
      <CorePrinciple
        headline={corePrinciple.headline}
        body={corePrinciple.body}
        rolesLabel={corePrinciple.rolesLabel}
        roles={corePrinciple.roles}
      />
      <Pillars
        headline={pillars.headline}
        monoLabel={pillars.monoLabel}
        proofLabel={pillars.proofLabel}
        pillars={pillars.items}
      />
      <ProofLedger headline={proof.headline} cta={proof.cta} rows={proof.rows} />
      <FocusedByDesign
        headline={focused.headline}
        note={focused.note}
        items={focused.items}
        notFitLabel={focused.notFitLabel}
        notFitText={focused.notFitText}
      />
      <FinalCTA
        eyebrow={finalCta.eyebrow}
        headline={finalCta.headline}
        cta={finalCta.cta}
        ctaHref="/contact"
        headlineClassName="leading-tight tracking-tight lg:text-display-2xs"
      />
    </>
  );
};