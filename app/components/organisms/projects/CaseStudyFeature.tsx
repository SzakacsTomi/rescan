import { ArrowRight } from "lucide-react";

import { MediaPlaceholder } from "@/app/components/atoms/MediaPlaceholder";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Stagger } from "@/app/components/atoms/Stagger";
import { DEEP_BLUE_GRADIENT, PORTRAIT_STRIPE } from "@/config/gradients";
import type { ProjectSector } from "@/config/projects";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export type CaseStudyRow = {
  label: string;
  copy: string;
};

type CaseStudyFeatureProps = {
  sector: ProjectSector;
  eyebrow: string;
  title: string;
  /** Scale and place, the two figures the design sets either side of a rule. */
  meta: [string, string];
  rows: CaseStudyRow[];
  changedSlot: string;
  changed: string;
  imageHint: string;
  keyProofLabel: string;
  keyProof: string[];
  viewProject: { label: string; href: string };
};

export const CASE_ANCHOR_ID: Record<ProjectSector, string> = {
  retail: "retail-case",
  logistics: "logistics-case",
};

const CHANGED_GRID_VERTICAL =
  "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)";
const CHANGED_GRID_BOTH =
  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)";

/**
 * The two case studies are not a mirrored pair — the design changes surface, card treatment
 * and panel behind the same structure, and those six choices always move together. One
 * lookup keyed by sector keeps them from drifting into six independent props.
 */
const CASE_TONE = {
  retail: {
    section: "bg-secondary",
    columns: "lg:grid-cols-[minmax(0,1fr)_26.25rem]",
    body: "lg:col-start-1 lg:row-start-1",
    rail: "lg:col-start-2 lg:row-start-1",
    proofCard: "border border-foreground/10 bg-background",
    proofBadge: "",
    changedSurface: "",
    changedGrid: CHANGED_GRID_VERTICAL,
    changedGridSize: "88px 88px",
  },
  logistics: {
    section: "bg-background",
    columns: "lg:grid-cols-[26.25rem_minmax(0,1fr)]",
    body: "lg:col-start-2 lg:row-start-1",
    rail: "lg:col-start-1 lg:row-start-1",
    proofCard: "bg-secondary",
    proofBadge: "bg-amber-500/14",
    changedSurface: "bg-ink",
    changedGrid: CHANGED_GRID_BOTH,
    changedGridSize: "120px 120px",
  },
} as const;

const BADGE_TITLE = "px-2.5 py-1.5 text-base font-normal";
const BADGE_ON_DARK =
  "px-2.5 py-1.5 text-base font-normal border-amber-500/80 bg-amber-500/12 text-amber-300";

/** The design accents the row that names the commercial consequence. */
const COST_ROW_INDEX = 2;

export const CaseStudyFeature = ({
  sector,
  eyebrow,
  title,
  meta,
  rows,
  changedSlot,
  changed,
  imageHint,
  keyProofLabel,
  keyProof,
  viewProject,
}: CaseStudyFeatureProps) => {
  const tone = CASE_TONE[sector];
  const lastRow = rows.length - 1;

  return (
    <section
      id={CASE_ANCHOR_ID[sector]}
      className={cn("scroll-mt-16 px-6 py-24 sm:px-8 lg:px-10 lg:py-30", tone.section)}
    >
      <div className="mx-auto max-w-page">
        <Reveal>
          <MonoLabel className="text-primary">{eyebrow}</MonoLabel>
          <h2 className="mt-6 flex flex-wrap items-baseline gap-4 text-title font-bold leading-title tracking-tight sm:text-h2">
            <Pending className={BADGE_TITLE}>{title}</Pending>
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Pending>{meta[0]}</Pending>
            <span aria-hidden className="text-foreground/25">
              |
            </span>
            <Pending>{meta[1]}</Pending>
          </div>
        </Reveal>

        <div className={cn("mt-14 grid grid-cols-1 gap-10 lg:gap-16", tone.columns)}>
          <div className={cn("flex flex-col", tone.body)}>
            <Stagger as="div" className="flex flex-col">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={cn(
                    "grid grid-cols-[3.5rem_minmax(0,1fr)] gap-6 border-t border-foreground/14 py-7",
                    i === lastRow && "pb-10",
                  )}
                >
                  <MonoLabel
                    aria-hidden
                    className={cn(
                      "pt-1",
                      i === COST_ROW_INDEX ? "text-primary" : "text-foreground/40",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </MonoLabel>
                  <div>
                    <h3 className="text-lead-lg font-semibold tracking-snug text-balance">{row.label}</h3>
                    <p className="mt-3 text-body leading-prose text-pretty text-foreground/65">
                      <Pending>{row.copy}</Pending>
                    </p>
                  </div>
                </div>
              ))}
            </Stagger>

            <Reveal>
              <div
                className={cn(
                  "relative overflow-hidden rounded-[10px] p-6 sm:p-10",
                  tone.changedSurface,
                )}
                style={tone.changedSurface ? undefined : { background: DEEP_BLUE_GRADIENT }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage: tone.changedGrid,
                    backgroundSize: tone.changedGridSize,
                  }}
                />
                <div className="relative">
                  <MonoLabel className="text-accent-sky">{changedSlot}</MonoLabel>
                  <p className="mt-5 text-2xl font-semibold leading-snug tracking-snug text-balance text-white">
                    <Pending className={BADGE_ON_DARK}>{changed}</Pending>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className={cn("flex flex-col gap-6", tone.rail)}>
            <MediaPlaceholder
              stripe={PORTRAIT_STRIPE}
              className="min-h-75 rounded-[10px] border border-foreground/14 p-6 text-center"
            >
              <Pending>{imageHint}</Pending>
            </MediaPlaceholder>

            <div className={cn("rounded-[10px] p-7", tone.proofCard)}>
              <MonoLabel className="text-foreground/45">{keyProofLabel}</MonoLabel>
              {/* No `items-start`: the design lets each badge stretch to the card width. */}
              <Stagger as="ul" className="mt-5 flex flex-col gap-3.5">
                {keyProof.map((item, i) => (
                  <li key={i}>
                    <Pending className={cn("w-full", tone.proofBadge)}>{item}</Pending>
                  </li>
                ))}
              </Stagger>
              <Link
                href={viewProject.href}
                className="group mt-7 inline-flex items-center gap-2 text-note font-semibold text-primary"
              >
                {viewProject.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
