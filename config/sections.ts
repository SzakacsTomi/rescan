import type { SectionConfig } from '@/app/types/section';

export const sectionsConfig: SectionConfig[] = [
  {
    id: 'branding',
    href: '/branding',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'digital',
    href: '/digital',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d2d2d 100%)',
  },
  {
    id: 'print',
    href: '/print',
    gradient: 'linear-gradient(135deg, #2c1b47 0%, #44237a 50%, #6b3fa0 100%)',
  },
];
