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
};
