"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { CASE_HATCH } from "@/config/gradients";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type CaseStat = {
  value: string;
  label: string;
};

type CaseSquareProps = {
  gradient: string;
  accent: string;
  sectorLabel: string;
  ordinal: string;
  photoHint: string;
  title: string;
  body: string;
  stats: CaseStat[];
  cta: { label: string; href: string };
};

const SCAN_DURATION_S = 1.1;
const SCAN_EASE = [0.16, 1, 0.3, 1] as const;
/** Content starts trailing the scan line by this fraction of the pass, so the copy
 *  reads as revealed by the beam rather than appearing on its own timer. */
const CONTENT_DELAY_S = 0.35;

/** `Pending`'s default amber sits on white; against this card's dark gradient it needs
 *  the same brighter on-dark variant `ProjectsHero` and `CaseStudyFeature` already use. */
const PENDING_ON_DARK = "border-amber-500/80 bg-amber-500/12 text-amber-300";

/**
 * The hero grid's repeating tile: a left-to-right scan line sweeps it once it enters
 * view, and the card's own content trails just behind it — the same motif RESCAN itself
 * performs on a building, run once per card so all four read as one consistent set. Below
 * `lg` each tile keeps a square shape; from `lg` it stretches to fill its grid row instead,
 * so the type is kept deliberately compact — a hero-sized headline would not fit a card
 * that is only a quarter of the viewport tall.
 */
export const CaseSquare = ({
  gradient,
  accent,
  sectorLabel,
  ordinal,
  photoHint,
  title,
  body,
  stats,
  cta,
}: CaseSquareProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="group relative aspect-square overflow-hidden lg:aspect-auto"
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

      <motion.div
        className="relative flex h-full flex-col justify-end p-6 lg:p-9"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: SCAN_DURATION_S, ease: SCAN_EASE, delay: CONTENT_DELAY_S }}
      >
        <div className="absolute left-6 top-6 flex items-baseline gap-2.5 lg:left-9 lg:top-7">
          <MonoLabel className="text-white/60">{ordinal}</MonoLabel>
          <MonoLabel className="text-white/60">{sectorLabel}</MonoLabel>
        </div>

        <div className="absolute right-6 top-6 lg:right-9 lg:top-7">
          <Pending className={PENDING_ON_DARK}>{photoHint}</Pending>
        </div>

        <h2 className="max-w-140 text-title-sm font-extrabold leading-tight tracking-tight text-balance text-white sm:text-title lg:text-title-lg">
          <Pending className={cn(PENDING_ON_DARK, "text-sm")}>{title}</Pending>
        </h2>
        <p className="mt-2 max-w-130 text-xs leading-copy text-pretty text-white/65 lg:text-caption">
          <Pending className={cn(PENDING_ON_DARK, "text-sm")}>{body}</Pending>
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/18 pt-3.5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-base font-bold tracking-snug text-white lg:text-title-sm">
                <Pending className={cn(PENDING_ON_DARK, "text-xs")}>{stat.value}</Pending>
              </div>
              <div className="mt-0.5 text-micro text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        <Link
          href={cta.href}
          className="mt-3.5 inline-flex w-fit items-center gap-2 text-xs font-semibold transition-colors"
          style={{ color: accent }}
        >
          {cta.label}
          <ArrowRight
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5",
            )}
          />
        </Link>
      </motion.div>
    </div>
  );
};
