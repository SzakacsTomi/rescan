import type { SectorPageConfig } from '@/app/types/sectorPage';

/** No logo wall, no metrics and no proof band: nothing in the published reference set is
 *  a logistics facility, and the redesign drops the evidence band from this page rather
 *  than showing an empty one. */
export const logisticsSectorConfig: SectorPageConfig = {
  id: 'logistics',
  hero: {
    primaryCtaHref: '/contact',
    secondaryCtaHref: '/projects',
  },
  strategicValue: {
    tone: 'plain',
  },
  finalCta: {
    ctaHref: '/contact',
  },
};
