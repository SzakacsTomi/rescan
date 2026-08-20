export type SectorHeroConfig = {
  primaryCtaHref: string;
  secondaryCtaHref: string;
  /** Cloudinary folder backing the hero carousel. Named remotely — renaming the
   *  route does not rename the folder. */
  imagesFolder?: string;
};

export type SectorPageConfig = {
  id: string;
  hero: SectorHeroConfig;
  /** Presentational only. `'tinted'` sits the value grid on the light blue-grey band
   *  (Retail); `'plain'` sits it on white and inverts the card hover (Logistics). */
  strategicValue?: {
    tone?: 'tinted' | 'plain';
  };
  finalCta: {
    ctaHref: string;
  };
};

export type NamedCaseTranslations = {
  label: string;
  headline: string;
  body: string;
  bulletIntro?: string;
  bulletPoints?: string[];
  metric: string;
  metricLabel: string;
  image: string;
  quote?: string;
  quoteAuthor?: string;
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
    /** Mono sector label above the headline — e.g. "Sector 01 — Retail Property Portfolios". */
    eyebrow?: string;
    /** Side rail of facility facts beside the headline. */
    facts?: Array<{ label: string; value: string }>;
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
  strategicValue?: {
    headline: string;
    body?: string;
    values: Array<{ title: string; description: string }>;
  };
  differentiator?: {
    headline: string;
    subheadline: string;
  };
  /** A named portfolio or programme case rendered by `organisms/sector/NamedCase`. */
  namedCase?: NamedCaseTranslations;
  /** A second, lighter proof block rendered directly after `namedCase` — the retail
   *  page's 40+ property programme. Not every sector has two. */
  proofCase?: NamedCaseTranslations;
  /** Large-figure evidence. Shared with Home and Why RESCAN via `organisms/ProofBar`. */
  proof?: {
    headline: string;
    items: Array<{ slot: string; figure: string; statement?: string }>;
    cta?: { label: string; href: string };
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
