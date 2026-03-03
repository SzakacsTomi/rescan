import { FileQuestion, GitBranch, RotateCcw } from 'lucide-react';
import type { SectorPageConfig } from '@/app/types/sectorPage';

export const commercialSectorConfig: SectorPageConfig = {
  id: 'commercial',
  hero: {
    primaryCtaHref: '/contact',
    secondaryCtaHref: '/projects',
    scrollTargetId: 'core-risk',
  },
  friction: {
    painPoints: [
      { icon: RotateCcw },
      { icon: GitBranch },
      { icon: FileQuestion },
    ],
  },
};
