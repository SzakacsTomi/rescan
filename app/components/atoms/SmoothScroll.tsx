"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

/**
 * Interpolates wheel and trackpad input instead of applying it frame-for-frame — the part of
 * "smooth scrolling" a reader can actually feel. CSS `scroll-behavior` only ever animated
 * programmatic jumps, which is why it alone changed nothing about ordinary scrolling.
 *
 * Lenis moves the real document scroll position rather than transforming a wrapper, so
 * `position: sticky` (the navbar), IntersectionObserver (`useActiveSection`) and plain scroll
 * listeners (`Wipe`) keep working untouched. Anything that locks the page — the projects
 * overlay, the mobile menu — must `stop()` it, or two things own the scroll position at once.
 */
const LENIS_OPTIONS = {
  /** Share of the remaining distance covered each frame. Below ~0.08 the page feels detached
   *  from the hand; at ~0.15 and up the interpolation stops being visible at all. */
  lerp: 0.1,
  /** Touch devices already have inertia from the OS. Syncing it here fights the platform
   *  rather than adding to it, so mobile keeps native scrolling. */
  syncTouch: false,
} satisfies LenisOptions;

/**
 * In-page anchors, glided rather than jumped: the why-rescan hero index, the project ledger
 * rows and the contact rail are all plain `<a href="#id">`, which keeps them working before
 * hydration.
 *
 * Lenis has an `anchors` option for this, but it starts its animation without cancelling the
 * browser's own fragment navigation — the page lands on the target for a frame, then gets
 * pulled back to animate from where it started. Owning the click means one animation runs.
 * `scrollTo` reads the target's `scroll-margin-top`, so the existing `scroll-mt-*` offsets
 * that clear the fixed navbar still land correctly.
 */
const HashLinkScroll = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleClick = (event: MouseEvent) => {
      // A modified click is the reader asking for a new tab or a download, not for this.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const hash = (event.target as Element | null)?.closest?.("a")?.getAttribute("href");
      if (!hash?.startsWith("#") || hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target);
      // The URL still gains the hash, so the section stays linkable and copyable.
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lenis]);

  return null;
};

export const SmoothScroll = ({ children }: { children: ReactNode }) => (
  <ReactLenis root options={LENIS_OPTIONS}>
    <HashLinkScroll />
    {children}
  </ReactLenis>
);
