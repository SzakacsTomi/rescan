import type { SectorPageConfig } from '@/app/types/sectorPage';

export const retailSectorConfig: SectorPageConfig = {
  id: 'retail',
  hero: {
    primaryCtaHref: '/contact',
    secondaryCtaHref: '/projects',
    imagesFolder: 'commercial-page',
  },
  coreRisk: {
    tone: 'inverted',
  },
  strategicValue: {
    tone: 'tinted',
  },
  finalCta: {
    ctaHref: '/contact',
  },
};
