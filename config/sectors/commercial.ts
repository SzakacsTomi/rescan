import { FileQuestion, GitBranch, RotateCcw } from 'lucide-react';
import type { SectorPageConfig } from '@/app/types/sectorPage';
import { CORE_RISK_ID } from '@/app/components/organisms/sector/CoreRisk';

export const commercialSectorConfig: SectorPageConfig = {
  id: 'commercial',
  hero: {
    primaryCtaHref: '/contact',
    secondaryCtaHref: '/projects',
    scrollTargetId: CORE_RISK_ID,
  },
  friction: {
    painPoints: [
      { icon: RotateCcw },
      { icon: GitBranch },
      { icon: FileQuestion },
    ],
  },
  logoWall: {
    logos: [
      { name: 'Castellum', src: '/assets/logos/castellum.svg' },
      { name: 'Vasakronan', src: '/assets/logos/vasakronan.svg' },
      { name: 'Fabege', src: '/assets/logos/fabege.svg' },
      { name: 'Atrium Ljungberg', src: '/assets/logos/atrium.svg' },
      { name: 'Kungsleden', src: '/assets/logos/kungsleden.svg' },
      { name: 'Pandox', src: '/assets/logos/pandox.svg' },
      { name: 'Hufvudstaden', src: '/assets/logos/hufvudstaden.svg' },
      { name: 'Wallenstam', src: '/assets/logos/wallenstam.svg' },
      { name: 'Wihlborgs', src: '/assets/logos/wihlborgs.svg' },
      { name: 'Balder', src: '/assets/logos/balder.svg' },
      { name: 'SBB Norden', src: '/assets/logos/sbb.svg' },
    ],
  },
  metrics: {
    items: [
      { value: '250+' },
      { value: '1.8M+' },
      { value: '56' },
      { value: '4.9' },
    ],
  },
  finalCta: {
    ctaHref: '/contact',
  },
};
