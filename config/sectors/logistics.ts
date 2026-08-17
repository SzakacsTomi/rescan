import type { SectorPageConfig } from '@/app/types/sectorPage';
import { CORE_RISK_ID } from '@/app/components/organisms/sector/CoreRisk';

/** No logo wall and no metrics yet: nothing in the published reference set is a
 *  logistics facility. Evidence for this page is tracked in OPEN-ITEMS.md. */
export const logisticsSectorConfig: SectorPageConfig = {
  id: 'logistics',
  hero: {
    primaryCtaHref: '/contact',
    secondaryCtaHref: '/projects',
    scrollTargetId: CORE_RISK_ID,
  },
  finalCta: {
    ctaHref: '/contact',
  },
};
