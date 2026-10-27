'use client';

import { m, type HTMLMotionProps } from 'framer-motion';

/**
 * `layoutScroll` tells Framer Motion this element is a scroll boundary, which
 * it only detects for `position: fixed` elements it can track as an `m.*`
 * component. Without it, a shared `layoutId` animation inside a fixed navbar
 * bakes the page's scroll offset into the transform, so scrolling down before
 * navigating makes the pill fly in from far below.
 */
export const MotionNav = (props: HTMLMotionProps<'nav'>) => <m.nav layoutScroll {...props} />;
