"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useId, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { CASE_HATCH } from "@/config/gradients";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type CaseStat = {
  value: string;
  label: string;
};

type CaseBandProps = {
  gradient: string;
  accent: string;
  sectorLabel: string;
  ordinal: string;
  total: string;
  photoHint: string;
  title: string;
  summary: string;
  body: string;
  stats: CaseStat[];
  revealLabel: string;
  hideLabel: string;
  sectorLink: { label: string; href: string };
};

const SCAN_DURATION_S = 1.1;
const SCAN_EASE = [0.16, 1, 0.3, 1] as const;
/** Content starts trailing the scan line by this fraction of the pass, so the copy
 *  reads as revealed by the beam rather than appearing on its own timer. */
const CONTENT_DELAY_S = 0.35;
const EXPAND_DURATION_S = 0.45;

/** Two bands have to fit the first screen, so each claims half of the viewport left
 *  under the 64px navbar, less its share of the 2px `gap-0.5` between the pair. */
const BAND_HEIGHT = "min-h-100 lg:min-h-[calc(50svh-2rem-1px)]";

/** `Pending`'s default amber sits on white; against this band's dark gradient it needs
 *  the same brighter on-dark variant `ProjectsHero` and `CaseStudyFeature` already use. */
const PENDING_ON_DARK = "border-amber-500/80 bg-amber-500/12 text-amber-300";

/**
 * One band of the stacked showcase: full-bleed, dark, with the client name and a
 * single-line result bottom-aligned against the site's 126px hero spine. Collapsed it
 * carries nothing but that name and line, so two bands read on the first screen; the
 * narrative, the stats and the sector link animate open on demand.
 *
 * The whole band is the toggle — the button is the keyboard-reachable handle for it and
 * lights up on band hover so the pointer cursor is not the only thing announcing that
 * anywhere on the panel opens it.
 *
 * A left-to-right scan line sweeps the band once it enters view and the copy trails just
 * behind it — the same motif RESCAN performs on a building, run once per band so all four
 * read as one set. The photograph slot stays a centred `Pending` badge until the client
 * supplies the image.
 */
export const CaseBand = ({
  gradient,
  accent,
  sectorLabel,
  ordinal,
  total,
  photoHint,
  title,
  summary,
  body,
  stats,
  revealLabel,
  hideLabel,
  sectorLink,
}: CaseBandProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();
  const toggle = () => setIsOpen((open) => !open);

  return (
    <div
      ref={ref}
      onClick={toggle}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden",
        BAND_HEIGHT,
      )}
      style={{ background: gradient }}
    >
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: CASE_HATCH }} />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-24 mix-blend-screen"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}00 0%, ${accent}55 45%, ${accent}f5 50%, ${accent}55 55%, ${accent}00 100%)`,
        }}
        initial={{ left: "-10%" }}
        animate={isInView ? { left: "110%" } : undefined}
        transition={{ duration: SCAN_DURATION_S, ease: SCAN_EASE }}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <Pending className={PENDING_ON_DARK}>{photoHint}</Pending>
      </div>

      <motion.div
        className="relative mx-auto flex w-full max-w-shell flex-1 flex-col px-6 pt-8 pb-10 lg:pr-10 lg:pl-spine"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: SCAN_DURATION_S, ease: SCAN_EASE, delay: CONTENT_DELAY_S }}
      >
        <div className="flex items-baseline gap-2.5 text-mono-xs tracking-mono-lg">
          <MonoLabel className="text-mono-xs tracking-mono-lg text-white/65">
            {ordinal} / {total}
          </MonoLabel>
          <span aria-hidden className="text-white/35">
            ·
          </span>
          <MonoLabel className="text-mono-xs tracking-mono-lg text-white/65">
            {sectorLabel}
          </MonoLabel>
        </div>

        <div className="mt-auto flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-190">
            <h2 className="text-h1 leading-hero font-extrabold tracking-tight text-balance text-white lg:text-h1-lg">
              <Pending className={cn(PENDING_ON_DARK, "text-sm")}>{title}</Pending>
            </h2>
            <p className="mt-3 max-w-160 text-note leading-copy text-pretty text-white/65 lg:text-body">
              <Pending className={cn(PENDING_ON_DARK, "text-sm")}>{summary}</Pending>
            </p>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={detailsId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: EXPAND_DURATION_S, ease: SCAN_EASE }}
                >
                  <p className="mt-5 max-w-160 text-note leading-copy text-pretty text-white/75 lg:text-body">
                    <Pending className={cn(PENDING_ON_DARK, "text-sm")}>{body}</Pending>
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/18 pt-4">
                    {stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-title-sm font-bold tracking-snug text-white">
                          <Pending className={cn(PENDING_ON_DARK, "text-xs")}>{stat.value}</Pending>
                        </div>
                        <div className="mt-1 text-micro text-white/50">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={sectorLink.href}
                    onClick={(event) => event.stopPropagation()}
                    className="group/link mt-6 inline-flex items-center gap-2 text-caption font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {sectorLink.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggle();
            }}
            aria-expanded={isOpen}
            aria-controls={detailsId}
            className="inline-flex w-fit shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-caption font-semibold text-white transition-colors group-hover:border-white/45 group-hover:bg-white/25"
          >
            {isOpen ? hideLabel : revealLabel}
            <Plus
              aria-hidden
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                isOpen && "rotate-45",
              )}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
