import type { SectorPageConfig } from '@/app/types/sectorPage';
import { contactHrefForSector } from '@/lib/contact';

export const logisticsSectorConfig: SectorPageConfig = {
  id: 'logistics',
  hero: {
    primaryCtaHref: contactHrefForSector('logistics'),
    secondaryCtaHref: '/projects',
  },
  strategicValue: {
    tone: 'plain',
  },
  /** Buildings behind each proof figure: one facility, then the three logistics centres
   *  the ~300,000 m² is spread across. */
  proof: {
    sites: [1, 3],
  },
  finalCta: {
    ctaHref: contactHrefForSector('logistics'),
  },
};
