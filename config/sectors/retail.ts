import type { SectorPageConfig } from '@/app/types/sectorPage';
import { contactHrefForSector } from '@/lib/contact';

export const retailSectorConfig: SectorPageConfig = {
  id: 'retail',
  hero: {
    primaryCtaHref: contactHrefForSector('retail'),
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
    ctaHref: contactHrefForSector('retail'),
  },
};
