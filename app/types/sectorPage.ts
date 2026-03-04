import type { LucideIcon } from 'lucide-react';

export type SectorHeroConfig = {
  primaryCtaHref: string;
  secondaryCtaHref: string;
  scrollTargetId: string;
};

export type PainPointConfig = {
  icon: LucideIcon;
};

export type SectorPageConfig = {
  id: string;
  hero: SectorHeroConfig;
  friction: {
    painPoints: readonly PainPointConfig[];
  };
  logoWall: {
    logos: readonly { name: string; src: string }[];
  };
  metrics: {
    items: readonly { value: string }[];
  };
  finalCta: {
    ctaHref: string;
  };
};

export type SectorPageTranslations = {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  coreRisk: {
    headline: string;
    body: string;
  };
  friction: {
    headline: string;
    points: Array<{ title: string; description: string }>;
  };
  strategicValue: {
    headline: string;
    values: Array<{ title: string; description: string }>;
  };
  differentiator: {
    headline: string;
    subheadline: string;
  };
  namedCase: {
    label: string;
    headline: string;
    body: string;
    metric: string;
    metricLabel: string;
  };
  logoWall: {
    headline: string;
  };
  metrics: {
    items: Array<{ label: string }>;
  };
  fitNotFit: {
    headline: string;
    bestFit: {
      title: string;
      items: string[];
    };
    notFit: {
      title: string;
      items: string[];
    };
  };
  finalCta: {
    headline: string;
    subheadline: string;
    cta: string;
  };
};
