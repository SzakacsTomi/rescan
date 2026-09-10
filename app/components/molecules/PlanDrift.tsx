"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { cn } from "@/lib/utils";

/** The archived plan of a retail unit, and the same unit as it now stands: an extension on
 *  the service side, a partition that moved, a counter that was not there before. The three
 *  hatched regions are exactly where the two disagree. The drawing is the argument, which is
 *  why the section around it carries one line of copy instead of a paragraph.
 *
 *  The archive is set eight units up and left of the current outline. Without that offset it
 *  shares three of its four edges with the current plan and disappears underneath it, which
 *  leaves one plan on screen and no disagreement to see. */
const ARCHIVE_OUTLINE = "M52 52H462V312H52Z";
const ARCHIVE_PARTITION = "M372 52V312";

const ACTUAL_OUTLINE = "M60 60H470V150H548V320H60Z";
const ACTUAL_PARTITION = "M320 60V320";
const ACTUAL_COUNTER = "M118 236H214V300H118Z";
const ACTUAL_PARTS = [ACTUAL_OUTLINE, ACTUAL_PARTITION, ACTUAL_COUNTER];

const DRIFT_REGIONS = ["M470 150H548V320H470Z", "M320 60H372V320H320Z", ACTUAL_COUNTER];

/** Cropped to the two plans plus a twelve-unit margin, so the drawing starts at the column's
 *  left edge and the legend beneath it lines up with the plan rather than with dead space. */
const VIEW_BOX = "40 40 520 292";

const HATCH_ID = "plan-drift-hatch";

const OUTLINE_DURATION = 1.1;
const OUTLINE_STAGGER = 0.13;
const DRIFT_DELAY = 0.95;

type PlanDriftProps = {
  archiveLabel: string;
  actualLabel: string;
  className?: string;
};

export const PlanDrift = ({ archiveLabel, actualLabel, className }: PlanDriftProps) => {
  const reduceMotion = useReducedMotion();
  /** An IntersectionObserver put on an SVG `path` or `g` never reports, so the trigger has
   *  to hang off the wrapper — `whileInView` on the shapes themselves leaves them at their
   *  initial state forever. */
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const play = inView || reduceMotion;

  return (
    <div ref={ref} aria-hidden className={cn("w-full", className)}>
      <svg viewBox={VIEW_BOX} fill="none" className="w-full">
        <defs>
          <pattern
            id={HATCH_ID}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(135)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="9"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent-sky/40"
            />
          </pattern>
        </defs>

        <path d={ACTUAL_OUTLINE} className="fill-white/4" />

        <g className="text-white/35">
          <path d={ARCHIVE_OUTLINE} stroke="currentColor" strokeWidth="2" strokeDasharray="7 7" />
          <path d={ARCHIVE_PARTITION} stroke="currentColor" strokeWidth="2" strokeDasharray="7 7" />
        </g>

        <motion.g
          initial={false}
          animate={{ opacity: play ? 1 : 0 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : DRIFT_DELAY }}
        >
          {DRIFT_REGIONS.map((d) => (
            <path key={d} d={d} fill={`url(#${HATCH_ID})`} />
          ))}
        </motion.g>

        <g className="text-accent-sky">
          {ACTUAL_PARTS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              initial={false}
              animate={{ pathLength: play ? 1 : 0, opacity: play ? 1 : 0 }}
              transition={{
                duration: reduceMotion ? 0 : OUTLINE_DURATION,
                delay: reduceMotion ? 0 : i * OUTLINE_STAGGER,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </g>
      </svg>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="flex items-center gap-2.5">
          <span className="block h-0 w-7 border-t-2 border-dashed border-white/25" />
          <MonoLabel className="text-white/45">{archiveLabel}</MonoLabel>
        </span>
        <span className="flex items-center gap-2.5">
          <span className="block h-0.5 w-7 bg-accent-sky" />
          <MonoLabel className="text-accent-sky">{actualLabel}</MonoLabel>
        </span>
      </div>
    </div>
  );
};
