"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const MOTION_TAG = {
  div: motion.div,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

type WipeProps = {
  children: ReactNode;
  className?: string;
  as?: keyof typeof MOTION_TAG;
  delay?: number;
};

/** The clip runs a few pixels past the border box so a descender or an italic overhang is
 *  not shaved off at the moment the pass finishes. */
const BLEED_PX = 4;

const WIPE_EASE = [0.16, 1, 0.3, 1] as const;
export const WIPE_DURATION_S = 0.85;

/** How close to the bottom of the viewport an element must be before it counts as "arriving" —
 *  matches `whileInView`'s old amount:0.25 by eye, but checked as a plain rect comparison. */
const REVEAL_VIEWPORT_FRACTION = 0.85;

const HIDDEN = { clipPath: `inset(-${BLEED_PX}px 100% -${BLEED_PX}px -${BLEED_PX}px)`, opacity: 0 };
const VISIBLE = { clipPath: `inset(-${BLEED_PX}px -${BLEED_PX}px -${BLEED_PX}px -${BLEED_PX}px)`, opacity: 1 };

/**
 * The Projects page reveals everything with the same left-to-right pass: a case square
 * gets the visible scan beam, a headline gets this silent version of the same travel.
 * Unlike `Reveal` it does not move the element, so a balanced headline keeps the line
 * breaks it was authored with.
 *
 * Reveal is driven by a plain scroll/resize rect check rather than `whileInView`'s
 * IntersectionObserver: on the projects page that observer was found to sometimes never
 * fire (Chrome/Linux, exact trigger unconfirmed), leaving the headline clipped to nothing
 * permanently. A `getBoundingClientRect` check can't silently fail to fire the same way.
 */
export const Wipe = ({ children, className, as = "div", delay = 0 }: WipeProps) => {
  const Tag = MOTION_TAG[as];
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;

    let frame: number | null = null;

    const check = () => {
      frame = null;
      const el = ref.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * REVEAL_VIEWPORT_FRACTION) {
        setRevealed(true);
      }
    };

    const scheduleCheck = () => {
      if (frame === null) frame = requestAnimationFrame(check);
    };

    scheduleCheck();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, [revealed]);

  return (
    <Tag
      // @ts-expect-error -- ref's element type varies with `as`; framer-motion accepts any of them.
      ref={ref}
      className={className}
      initial={HIDDEN}
      animate={revealed ? VISIBLE : HIDDEN}
      transition={{ duration: WIPE_DURATION_S, ease: WIPE_EASE, delay }}
    >
      {children}
    </Tag>
  );
};
