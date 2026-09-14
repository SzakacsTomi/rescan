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
  namedCase: {
    imageId: '142072_original_Fasad__nät_storlek_qgsd2c',
  },
  finalCta: {
    ctaHref: '/contact',
  },
};
