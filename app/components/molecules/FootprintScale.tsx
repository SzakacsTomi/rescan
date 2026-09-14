"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/** The area a proof figure names, drawn instead of only stated: one plate per site, laid
 *  out on a column grid whose module is the same in every plate on the band. A figure
 *  three times another's stops reading as "also large" once it is three times as wide and
 *  carries three times the bays. */

/** Widths are a share of the largest figure in the band, so the smallest plate has to stay
 *  wide enough to show its grid rather than collapsing to a stripe. */
const MIN_SHARE = 0.18;

const BAY_MODULE_PX = 28;
const BAY_LINE = "rgba(255,255,255,0.09)";
const BAY_GRID = [
  `repeating-linear-gradient(to right, transparent 0 ${BAY_MODULE_PX - 1}px, ${BAY_LINE} ${BAY_MODULE_PX - 1}px ${BAY_MODULE_PX}px)`,
  `repeating-linear-gradient(to bottom, transparent 0 ${BAY_MODULE_PX - 1}px, ${BAY_LINE} ${BAY_MODULE_PX - 1}px ${BAY_MODULE_PX}px)`,
].join(", ");

const DRAW_DURATION_S = 1.1;

type FootprintScaleProps = {
  /** This figure's area as a fraction of the largest one on the band. */
  share: number;
  /** Separate buildings the figure covers — the plate is divided into that many. */
  sites: number;
  className?: string;
};

export const FootprintScale = ({ share, sites, className }: FootprintScaleProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const play = inView || reduceMotion;
  const width = `${Math.max(share, MIN_SHARE) * 100}%`;

  return (
    <div ref={ref} aria-hidden className={cn("w-full", className)}>
      <motion.div
        className="flex h-22 gap-2"
        initial={false}
        animate={{ width: play ? width : 0 }}
        transition={{ duration: reduceMotion ? 0 : DRAW_DURATION_S, ease: [0.16, 1, 0.3, 1] }}
      >
        {Array.from({ length: sites }, (_, i) => (
          <div
            key={i}
            className="min-w-0 flex-1 border border-white/25 bg-white/4"
            style={{ backgroundImage: BAY_GRID }}
          />
        ))}
      </motion.div>
    </div>
  );
};
