import { ConsequenceChain } from "@/app/components/molecules/ConsequenceChain";
import { ConsequenceSection } from "@/app/components/organisms/sector/ConsequenceSection";
import { CoreRisk } from "@/app/components/organisms/sector/CoreRisk";
import { Differentiator } from "@/app/components/organisms/sector/Differentiator";
import { FinalCTA } from "@/app/components/organisms/sector/FinalCTA";
import { FitNotFit } from "@/app/components/organisms/sector/FitNotFit";
import { ProofBar } from "@/app/components/organisms/ProofBar";
import { NamedCase } from "@/app/components/organisms/sector/NamedCase";
import { StrategicValue } from "@/app/components/organisms/sector/StrategicValue";
import type { SectorPageConfig, SectorPageTranslations } from "@/app/types/sectorPage";

type SectorTemplateProps = {
  config: SectorPageConfig;
  translations: SectorPageTranslations;
  /** Each sector's hero is its own organism in the redesign — a carousel for Retail, a
   *  dark facts split for Logistics — so the page composes it and hands it in. */
  hero: React.ReactNode;
  afterHero?: React.ReactNode;
  /** Supporting visual for `CoreRisk`, e.g. a `ProofGrid` — page-specific, so it is
   *  passed in rather than added to `SectorPageTranslations`. */
  coreRiskAside?: React.ReactNode;
};

export const SectorTemplate = ({
  config,
  translations: tr,
  hero,
  afterHero,
  coreRiskAside,
}: SectorTemplateProps) => {
  return (
    <>
      {hero}
      {afterHero}

      {tr.coreRisk && (
        <CoreRisk
          eyebrow={tr.coreRisk.eyebrow}
          headline={tr.coreRisk.headline}
          body={tr.coreRisk.body}
          aside={coreRiskAside}
        />
      )}

      {tr.consequenceChain && (
        <ConsequenceSection
          headline={tr.consequenceChain.headline}
          body={tr.consequenceChain.body}
          footnote={tr.consequenceChain.footnote}
        >
          <ConsequenceChain steps={tr.consequenceChain.steps} />
        </ConsequenceSection>
      )}

      {tr.strategicValue && (
        <StrategicValue
          headline={tr.strategicValue.headline}
          body={tr.strategicValue.body}
          values={tr.strategicValue.values}
          tone={config.strategicValue?.tone}
        />
      )}

      {tr.differentiator && (
        <Differentiator
          headline={tr.differentiator.headline}
          subheadline={tr.differentiator.subheadline}
          note={tr.differentiator.note}
        />
      )}

      {tr.namedCase && (
        <NamedCase
          label={tr.namedCase.label}
          headline={tr.namedCase.headline}
          body={tr.namedCase.body}
          bulletIntro={tr.namedCase.bulletIntro}
          bulletPoints={tr.namedCase.bulletPoints}
          metric={tr.namedCase.metric}
          metricLabel={tr.namedCase.metricLabel}
          image={tr.namedCase.image}
          quote={tr.namedCase.quote}
          quoteAuthor={tr.namedCase.quoteAuthor}
        />
      )}

      {tr.proof && (
        <ProofBar headline={tr.proof.headline} items={tr.proof.items} cta={tr.proof.cta} />
      )}

      {tr.fitNotFit && (
        <FitNotFit
          headline={tr.fitNotFit.headline}
          bestFit={tr.fitNotFit.bestFit}
          notFit={tr.fitNotFit.notFit}
        />
      )}

      <FinalCTA
        headline={tr.finalCta.headline}
        subheadline={tr.finalCta.subheadline}
        cta={tr.finalCta.cta}
        ctaHref={config.finalCta.ctaHref}
      />
    </>
  );
};
