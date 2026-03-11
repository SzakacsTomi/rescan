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
      { name: 'Alhansa', src: '/assets/logos/alhansa.png' },
      { name: 'CA Fastigheter', src: '/assets/logos/ca-fastigheter.png' },
      { name: 'Carlqvist', src: '/assets/logos/carlqvist.png' },
      { name: 'Famera', src: '/assets/logos/famera.png' },
      { name: 'Ingka', src: '/assets/logos/ingka.png' },
      { name: 'Kalmarhem', src: '/assets/logos/kalmarhem.png' },
      { name: 'Omya', src: '/assets/logos/omya.png' },
      { name: 'Upvidingehus', src: '/assets/logos/upvidingehus.png' },
      { name: 'VBAB', src: '/assets/logos/vbab.png' },
      { name: 'VIDA', src: '/assets/logos/vida.png' },
      { name: 'Emilshus', src: '/assets/logos/emilshus.png' },
      { name: 'Nivika', src: '/assets/logos/nivika.png' },
      { name: 'Thulehus', src: '/assets/logos/thulehus.png' },
    ],
  },
  metrics: {
    items: [
      { value: '250+' },
      { value: '1.8M+' },
      { value: '3' },
      { value: '2' },
    ],
  },
  finalCta: {
    ctaHref: '/contact',
  },
};
