"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

/**
 * Scrolls to an element by id through the page's Lenis instance, so a scroll cue glides with
 * the same easing as the wheel. A native `scrollIntoView` would animate on its own clock and
 * be fought by Lenis's loop the whole way down.
 *
 * Falls back to an instant native jump before Lenis has mounted, which is also what a
 * reduced-motion reader gets — Lenis makes programmatic scrolls immediate for them.
 */
export const useScrollToId = () => {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target);
        return;
      }
      target.scrollIntoView({ block: "start" });
    },
    [lenis],
  );
};
