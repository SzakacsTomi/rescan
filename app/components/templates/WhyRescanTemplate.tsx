import { CorePrinciple } from '@/app/components/organisms/whyRescan/CorePrinciple';
import { ProofLedger } from '@/app/components/organisms/whyRescan/ProofLedger';
import { TrustSection } from '@/app/components/organisms/whyRescan/TrustSection';
import { WhyRescanHero } from '@/app/components/organisms/whyRescan/WhyRescanHero';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';

type WhyRescanTemplateProps = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    anchors: Array<{ label: string; href: string }>;
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
  trustSections: Array<{
    id: string;
    headline: string;
    body: string;
    proofLabel: string;
    proofs: string[];
  }>;
  proof: {
    headline: string;
    rows: Array<{ slot: string; figure: string; statement: string }>;
    cta: { label: string; href: string };
  };
  finalCta: { eyebrow: string; headline: string; cta: string };
};

export const WhyRescanTemplate = ({
  hero,
  corePrinciple,
  trustSections,
  proof,
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
      {trustSections.map((section, i) => (
        <TrustSection
          key={section.id}
          id={section.id}
          index={i + 1}
          headline={section.headline}
          body={section.body}
          proofLabel={section.proofLabel}
          proofs={section.proofs}
          tone={i % 2 === 0 ? 'background' : 'secondary'}
        />
      ))}
      <ProofLedger headline={proof.headline} cta={proof.cta} rows={proof.rows} />
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