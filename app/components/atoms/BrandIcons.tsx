import type { SVGProps } from 'react';

/**
 * Brand mark for the footer's LinkedIn link. lucide-react removed every brand
 * icon in 1.0, so this is the retired lucide path (ISC) kept locally on the
 * same 24px grid and stroke weight as the icons still imported from the package.
 */
const brandIconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...brandIconProps} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
