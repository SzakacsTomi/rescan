import { ConsequenceChain } from '@/app/components/molecules/ConsequenceChain';
import { ConsequenceSection } from '@/app/components/organisms/sector/ConsequenceSection';
import { CoreRisk } from '@/app/components/organisms/sector/CoreRisk';
import { Differentiator } from '@/app/components/organisms/sector/Differentiator';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';
import { FitNotFit } from '@/app/components/organisms/sector/FitNotFit';
import { LogoWall } from '@/app/components/organisms/sector/LogoWall';
import { Metrics } from '@/app/components/organisms/sector/Metrics';
import { ProofBar } from '@/app/components/organisms/ProofBar';
import { NamedCase } from '@/app/components/organisms/sector/NamedCase';
import { SectorHero } from '@/app/components/organisms/sector/SectorHero';
import { StrategicValue } from '@/app/components/organisms/sector/StrategicValue';
import type { SectorPageConfig, SectorPageTranslations } from '@/app/types/sectorPage';

type SectorTemplateProps = {
  config: SectorPageConfig;
  translations: SectorPageTranslations;
  heroOverride?: React.ReactNode;
  afterHero?: React.ReactNode;
  /** Supporting visual for `CoreRisk`, e.g. a `ProofGrid` — page-specific, so it is
   *  passed in rather than added to `SectorPageTranslations`. */
  coreRiskAside?: React.ReactNode;
};

export const SectorTemplate = ({
  config,
  translations: tr,
  heroOverride,
  afterHero,
  coreRiskAside,
}: SectorTemplateProps) => {
  return (
    <>
      {heroOverride ?? (
        <SectorHero
          headline={tr.hero.headline}
          subheadline={tr.hero.subheadline}
          primaryCta={{ label: tr.hero.primaryCta, href: config.hero.primaryCtaHref }}
          secondaryCta={{ label: tr.hero.secondaryCta, href: config.hero.secondaryCtaHref }}
          scrollTargetId={config.hero.scrollTargetId}
        />
      )}
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
          layout={config.strategicValue?.layout}
        />
      )}

      {tr.differentiator && (
        <Differentiator
          headline={tr.differentiator.headline}
          subheadline={tr.differentiator.subheadline}
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

      {tr.logoWall && config.logoWall && (
        <LogoWall headline={tr.logoWall.headline} logos={config.logoWall.logos} />
      )}

      {tr.metrics && config.metrics && (
        <Metrics
          items={tr.metrics.items.map((item, i) => ({
            ...item,
            value: config.metrics!.items[i].value,
          }))}
        />
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
