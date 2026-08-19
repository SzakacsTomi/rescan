import type { SectorPageConfig } from '@/app/types/sectorPage';

export const retailSectorConfig: SectorPageConfig = {
  id: 'retail',
  hero: {
    primaryCtaHref: '/contact',
    secondaryCtaHref: '/projects',
    imagesFolder: 'commercial-page',
  },
  strategicValue: {
    tone: 'tinted',
  },
  finalCta: {
    ctaHref: '/contact',
  },
};
