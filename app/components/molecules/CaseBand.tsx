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

type CaseBandProps = {
  gradient: string;
  accent: string;
  sectorLabel: string;
  ordinal: string;
  total: string;
  photoHint: string;
  title: string;
  body: string;
  stats: CaseStat[];
  cta: { label: string; href: string };
  /** The first band claims the viewport; the rest sit at the design's 600px. */
  isLead?: boolean;
};

const SCAN_DURATION_S = 1.1;
const SCAN_EASE = [0.16, 1, 0.3, 1] as const;
/** Content starts trailing the scan line by this fraction of the pass, so the copy
 *  reads as revealed by the beam rather than appearing on its own timer. */
const CONTENT_DELAY_S = 0.35;

/** `Pending`'s default amber sits on white; against this band's dark gradient it needs
 *  the same brighter on-dark variant `ProjectsHero` and `CaseStudyFeature` already use. */
const PENDING_ON_DARK = "border-amber-500/80 bg-amber-500/12 text-amber-300";

/**
 * One band of the stacked showcase: full-bleed, dark, with the client name and the result
 * bottom-aligned against the site's 126px hero spine and the case-study link opposite it.
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
  body,
  stats,
  cta,
  isLead = false,
}: CaseBandProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex min-h-150 flex-col overflow-hidden",
        isLead && "lg:min-h-[calc(100svh-4rem)]",
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
          </div>

          <Link
            href={cta.href}
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2.5 text-caption font-semibold text-white transition-colors hover:bg-white/20"
          >
            {cta.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
