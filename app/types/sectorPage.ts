import type { LucideIcon } from 'lucide-react';

export type SectorHeroConfig = {
  primaryCtaHref: string;
  secondaryCtaHref: string;
  scrollTargetId: string;
  /** Cloudinary folder backing the hero carousel. Named remotely — renaming the
   *  route does not rename the folder. */
  imagesFolder?: string;
};

export type PainPointConfig = {
  icon: LucideIcon;
};

export type SectorPageConfig = {
  id: string;
  hero: SectorHeroConfig;
  friction?: {
    painPoints: readonly PainPointConfig[];
  };
  /** Presentational only — which arrangement `StrategicValue` renders in.
   *  `'grid'` is the numbered-card treatment the redesign introduced for Retail;
   *  omitting it keeps a page's current stacked-list rendering. */
  strategicValue?: {
    layout?: 'grid';
  };
  logoWall?: {
    logos: readonly { name: string; src: string }[];
  };
  metrics?: {
    items: readonly { value: string }[];
  };
  finalCta: {
    ctaHref: string;
  };
};

/**
 * Every block except `hero` and `finalCta` is optional: the two sector briefs ask for
 * different sections in the same order, so the template renders what it is given rather
 * than forcing each page to fill in sections its brief does not have.
 */
export type SectorPageTranslations = {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    /** Mono sector label above the headline — e.g. "Sector 01 — Retail Chains". */
    eyebrow?: string;
  };
  coreRisk?: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  /** Logistics section 3 — the information-gap-to-cost sequence. */
  consequenceChain?: {
    headline: string;
    body?: string;
    steps: string[];
    footnote?: string;
  };
  friction?: {
    headline: string;
    body?: string;
    points: Array<{ title: string; description: string }>;
  };
  strategicValue?: {
    headline: string;
    body?: string;
    values: Array<{ title: string; description: string }>;
  };
  differentiator?: {
    headline: string;
    subheadline: string;
  };
  namedCase?: {
    label: string;
    headline: string;
    body: string;
    bulletIntro?: string;
    bulletPoints?: string[];
    metric: string;
    metricLabel: string;
    quote?: string;
    quoteAuthor?: string;
  };
  /** Large-figure evidence. Shared with Home and Why RESCAN via `organisms/ProofBar`. */
  proof?: {
    headline: string;
    items: Array<{ slot: string; figure: string; statement?: string }>;
    cta?: { label: string; href: string };
  };
  logoWall?: {
    headline: string;
  };
  metrics?: {
    items: Array<{ label: string }>;
  };
  fitNotFit?: {
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
    subheadline?: string;
    cta: string;
  };
};
