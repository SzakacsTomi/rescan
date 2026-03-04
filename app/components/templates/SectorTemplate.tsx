import { CoreRisk } from '@/app/components/organisms/sector/CoreRisk';
import { Differentiator } from '@/app/components/organisms/sector/Differentiator';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';
import { FitNotFit } from '@/app/components/organisms/sector/FitNotFit';
import { LogoWall } from '@/app/components/organisms/sector/LogoWall';
import { Metrics } from '@/app/components/organisms/sector/Metrics';
import { NamedCase } from '@/app/components/organisms/sector/NamedCase';
import { OperationalFriction } from '@/app/components/organisms/sector/OperationalFriction';
import { SectorHero } from '@/app/components/organisms/sector/SectorHero';
import { StrategicValue } from '@/app/components/organisms/sector/StrategicValue';
import type { SectorPageConfig, SectorPageTranslations } from '@/app/types/sectorPage';

type SectorTemplateProps = {
  config: SectorPageConfig;
  translations: SectorPageTranslations;
};

export const SectorTemplate = ({ config, translations: tr }: SectorTemplateProps) => {
  const frictionPoints = config.friction.painPoints.map((pt, i) => ({
    icon: pt.icon,
    title: tr.friction.points[i].title,
    description: tr.friction.points[i].description,
  }));

  return (
    <>
      <SectorHero
        headline={tr.hero.headline}
        subheadline={tr.hero.subheadline}
        primaryCta={{ label: tr.hero.primaryCta, href: config.hero.primaryCtaHref }}
        secondaryCta={{ label: tr.hero.secondaryCta, href: config.hero.secondaryCtaHref }}
        scrollTargetId={config.hero.scrollTargetId}
      />
      <CoreRisk headline={tr.coreRisk.headline} body={tr.coreRisk.body} />
      <OperationalFriction headline={tr.friction.headline} points={frictionPoints} />
      <StrategicValue headline={tr.strategicValue.headline} values={tr.strategicValue.values} />
      <Differentiator
        headline={tr.differentiator.headline}
        subheadline={tr.differentiator.subheadline}
      />
      <NamedCase
        label={tr.namedCase.label}
        headline={tr.namedCase.headline}
        body={tr.namedCase.body}
        metric={tr.namedCase.metric}
        metricLabel={tr.namedCase.metricLabel}
      />
      <LogoWall headline={tr.logoWall.headline} logos={config.logoWall.logos} />
      <Metrics items={tr.metrics.items.map((item, i) => ({ ...item, value: config.metrics.items[i].value }))} />
      <FitNotFit
        headline={tr.fitNotFit.headline}
        bestFit={tr.fitNotFit.bestFit}
        notFit={tr.fitNotFit.notFit}
      />
      <FinalCTA
        headline={tr.finalCta.headline}
        subheadline={tr.finalCta.subheadline}
        cta={tr.finalCta.cta}
        ctaHref={config.finalCta.ctaHref}
      />
    </>
  );
};
