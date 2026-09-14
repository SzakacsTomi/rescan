"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { ImageStrip } from "@/app/components/atoms/ImageStrip";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { PENDING_ON_DARK, Pending } from "@/app/components/atoms/Pending";
import { CASE_HATCH, PHOTO_CEILING_SCRIM, PHOTO_FLOOR_SCRIM } from "@/config/gradients";
import { cn } from "@/lib/utils";

type CaseBandProps = {
  gradient: string;
  accent: string;
  sectorLabel: string;
  /** Position in the stack, from zero: the band's printed ordinal and the offset that
   *  keeps its sweep out of step with its neighbours' both come from it. */
  index: number;
  total: number;
  /** Every photograph in the client's folder. The band composes a strip from the first
   *  few of them and closes it with a count of the buildings it has no room for. */
  images: string[];
  /** The client's portfolio size, which the closing tile counts up to. */
  propertyCount: number;
  /** Translated `+n` figures keyed by the number the closing tile stands for. */
  morePropertyLabels: Record<number, string>;
  /** The word under that figure. */
  morePropertyLabel: string;
  /** The stack opens the page, so its first band carries the LCP image. */
  priority?: boolean;
  title: string;
  summary: string;
  isOpen: boolean;
  onToggle: () => void;
  /** The case study the band opens, so the button can own it for assistive tech. */
  panelId: string;
  revealLabel: string;
  hideLabel: string;
};

const SCAN_DURATION_S = 1.5;
/** Symmetric ease: the beam leaves and arrives softly but crosses the band at an even
 *  speed, which is what makes the pass read as a sweep rather than a snap. An ease-out
 *  curve spends most of the pass decelerating and the wipe looks like it stalls. */
const SCAN_EASE = [0.4, 0, 0.2, 1] as const;
/** Content starts trailing the scan line by this fraction of the pass, so the copy
 *  reads as revealed by the beam rather than appearing on its own timer, and finishes
 *  exactly as the beam leaves the band. */
const CONTENT_DELAY_S = 0.35;
const CONTENT_DURATION_S = SCAN_DURATION_S - CONTENT_DELAY_S;

/** Two bands have to fit the first screen, so each claims half of the viewport left
 *  under the 64px navbar, less its share of the 2px `gap-0.5` between the pair. */
const BAND_HEIGHT = "min-h-100 lg:min-h-[calc(50svh-2rem-1px)]";

/** The band's own gradient goes back over the photographs only as a tint: enough to carry
 *  the colour sequence the design drew down the stack, light enough that the buildings are
 *  still the thing you look at. Legibility is bought by the floor scrim below, not here.
 *  Hovering the band lifts most of it — the portfolio brightens under the pointer before
 *  the band has even been opened. */
const PHOTO_TINT = "opacity-40 transition-opacity duration-500 group-hover:opacity-20";

/** A soft light band crossing the photographs on a long loop, the entrance scan left
 *  running. Each band starts part-way through its own pass so the four in the stack are
 *  never sweeping in unison. */
const PHOTO_SWEEP =
  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)";
const SWEEP_STAGGER_S = 4.5;

/** The shared floor and ceiling ramps seat the name, the result line and the ordinal; this
 *  band needs a third. One ramp heavy enough for the headline also fell across the right of
 *  the grid, where the closing tile's own figure had nothing to do with it and simply went
 *  dark — so the contrast the headline needs is bought by an ellipse anchored to the
 *  bottom-left corner it occupies, which never reaches the tile. */
const PHOTO_COPY_SCRIM =
  "radial-gradient(120% 88% at 18% 100%, rgba(9,12,20,0.68) 0%, rgba(9,12,20,0.42) 44%, rgba(9,12,20,0) 74%)";

/**
 * One band of the stacked showcase: full-bleed, dark, with the client name and a
 * single-line result bottom-aligned against the site's 126px hero spine. It carries
 * nothing else — the written-up study opens underneath it in `CaseStudyPanel` — so two
 * bands read on the first screen.
 *
 * The whole band is the toggle; the button is the keyboard-reachable handle for it and
 * lights up on band hover so the pointer cursor is not the only thing announcing that
 * anywhere on the panel opens it.
 *
 * A left-to-right scan line sweeps the band once it enters view and the copy trails just
 * behind it — the same motif RESCAN performs on a building, run once per band so all four
 * read as one set. The client's photographs are wiped in on that same beat: a single image
 * fills the band, a folder of them becomes a grid of the first few whose closing cell counts
 * the buildings that did not fit, and either way the band's own gradient goes back over the
 * top as the tint that keeps the stack's colour sequence. A band whose folder is empty falls
 * back to the hatch.
 */
export const CaseBand = ({
  gradient,
  accent,
  sectorLabel,
  index,
  total,
  images,
  propertyCount,
  morePropertyLabels,
  morePropertyLabel,
  priority,
  title,
  summary,
  isOpen,
  onToggle,
  panelId,
  revealLabel,
  hideLabel,
}: CaseBandProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const revealLabelRef = useRef<HTMLSpanElement>(null);
  const hideLabelRef = useRef<HTMLSpanElement>(null);
  /** Null until both labels have been measured. Until then the box is content-sized, which
   *  is the right width already — a CSS transition cannot animate out of `auto`, so the pill
   *  needs a number on both ends of the flip to widen rather than snap. */
  const [labelWidths, setLabelWidths] = useState<{ reveal: number; hide: number } | null>(null);

  useEffect(() => {
    const reveal = revealLabelRef.current;
    const hide = hideLabelRef.current;
    if (!reveal || !hide) return;

    const measure = () =>
      setLabelWidths({
        reveal: reveal.getBoundingClientRect().width,
        hide: hide.getBoundingClientRect().width,
      });
    measure();

    // Catches the swap to the real font and the Swedish labels, both of which land after
    // the first measurement.
    const observer = new ResizeObserver(measure);
    observer.observe(reveal);
    observer.observe(hide);
    return () => observer.disconnect();
  }, []);

  const ordinalLabel = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <div
      ref={ref}
      onClick={onToggle}
      className={cn("group relative flex cursor-pointer flex-col overflow-hidden", BAND_HEIGHT)}
      style={{ background: gradient }}
    >
      {images.length > 0 ? (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
            transition={{ duration: CONTENT_DURATION_S, ease: SCAN_EASE, delay: CONTENT_DELAY_S }}
          >
            <ImageStrip
              images={images}
              overflowTotal={propertyCount}
              moreLabels={morePropertyLabels}
              overflowLabel={morePropertyLabel}
              accent={accent}
              isActive={isInView}
              priority={priority}
            />
            <div
              className={cn("pointer-events-none absolute inset-0", PHOTO_TINT)}
              style={{ background: gradient }}
            />
            <div
              className="animate-case-sweep pointer-events-none absolute inset-y-0 left-0 w-2/5 mix-blend-soft-light"
              style={{ background: PHOTO_SWEEP, animationDelay: `-${index * SWEEP_STAGGER_S}s` }}
            />
            {/* Inside the wipe, not over it: the clip-path is a stacking context, so scrims
                left outside it paint above everything in the grid — including the closing
                tile's own figure, which has no reason to be dimmed and simply went grey.
                In here the tile can lift itself over them with a z-index, and the scrims
                arrive on the same beat as the photographs they exist to seat. */}
            <div className="pointer-events-none absolute inset-0" style={{ background: PHOTO_CEILING_SCRIM }} />
            <div className="pointer-events-none absolute inset-0" style={{ background: PHOTO_FLOOR_SCRIM }} />
            <div className="pointer-events-none absolute inset-0" style={{ background: PHOTO_COPY_SCRIM }} />
          </motion.div>
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: CASE_HATCH }} />
      )}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 mix-blend-screen"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}00 0%, ${accent}55 45%, ${accent}f5 50%, ${accent}55 55%, ${accent}00 100%)`,
        }}
        initial={{ x: "-10vw" }}
        animate={isInView ? { x: "110vw" } : undefined}
        transition={{ duration: SCAN_DURATION_S, ease: SCAN_EASE }}
      />

      <motion.div
        className="pointer-events-none relative mx-auto flex w-full max-w-shell flex-1 flex-col px-6 pt-8 pb-10 lg:pr-10 lg:pl-spine"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: CONTENT_DURATION_S, ease: SCAN_EASE, delay: CONTENT_DELAY_S }}
      >
        <div className="flex items-baseline gap-2.5 text-mono-xs tracking-mono-lg">
          <MonoLabel className="text-mono-xs tracking-mono-lg text-white/65">
            {ordinalLabel} / {totalLabel}
          </MonoLabel>
          <span aria-hidden className="text-white/35">
            ·
          </span>
          <MonoLabel className="text-mono-xs tracking-mono-lg text-white/65">
            {sectorLabel}
          </MonoLabel>
        </div>

        {/* The name, its result line and the control stay one left-hand column at every width.
            The design put the control opposite the name, which worked while the right of the
            band was empty gradient — the grid's closing tile lives there now, and a pill
            parked on top of it offered two different things in one place. */}
        <div className="mt-auto flex flex-col gap-8">
          <div className="max-w-190">
            <h2 className="text-h1 leading-hero font-extrabold tracking-tight text-balance text-white lg:text-h1-lg">
              <Pending className={cn(PENDING_ON_DARK, "text-sm")}>{title}</Pending>
            </h2>
            <p className="mt-3 max-w-160 text-note leading-copy text-pretty text-white/65 lg:text-body">
              <Pending className={cn(PENDING_ON_DARK, "text-sm")}>{summary}</Pending>
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="pointer-events-auto inline-flex w-fit shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-caption font-semibold text-white transition-colors group-hover:border-white/45 group-hover:bg-white/25"
          >
            {/* Both labels stay mounted so each can be measured and the pair can cross-fade;
                `w-max` holds each to its own width inside the box that animates between them,
                and `min-w-0` lifts the flex-item minimum that would otherwise floor that box
                at the longer label and leave the pill unable to narrow. */}
            <span
              className="grid min-w-0 overflow-hidden transition-[width] duration-300 ease-in-out"
              style={{
                width: labelWidths ? (isOpen ? labelWidths.hide : labelWidths.reveal) : undefined,
              }}
            >
              <span
                ref={revealLabelRef}
                aria-hidden={isOpen}
                className={cn(
                  "col-start-1 row-start-1 w-max whitespace-nowrap transition-opacity duration-200",
                  isOpen && "opacity-0",
                )}
              >
                {revealLabel}
              </span>
              <span
                ref={hideLabelRef}
                aria-hidden={!isOpen}
                className={cn(
                  "col-start-1 row-start-1 w-max whitespace-nowrap transition-opacity duration-200",
                  !isOpen && "opacity-0",
                )}
              >
                {hideLabel}
              </span>
            </span>
            <ChevronDown
              aria-hidden
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                isOpen && "rotate-180",
              )}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
