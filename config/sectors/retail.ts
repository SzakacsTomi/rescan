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
