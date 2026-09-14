"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { PENDING_ON_DARK, Pending } from "@/app/components/atoms/Pending";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyCopy = {
  title: string;
  /** The one-line promise the client's write-up opens with, under the title. */
  lead: string;
  stats: CaseStudyStat[];
  /** A write-up that titles its challenge keeps that title; the ones that open straight
   *  into the problem leave it empty and the mono label carries the section alone. */
  challenge: { headline: string; body: string };
  change: { headline: string; body: string };
  outcome: { body: string };
  closing: { headline: string; body: string; cta: string };
};

type CaseStudyPanelProps = {
  id: string;
  copy: CaseStudyCopy;
  /** `<sector> — Case study`, split so the sector half can stay a link. */
  sectorLabel: string;
  caseStudyLabel: string;
  labels: { challenge: string; change: string; outcome: string };
  contactHref: string;
  sectorLink: { label: string; href: string };
};

/** Each block waits on the one above it, so the study assembles downwards as the panel
 *  opens rather than arriving in one piece. */
const STEP_S = 0.09;
const BLOCK: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** Held back until the band above has finished its height animation, so the copy is not
 *  already rising while the panel is still cutting its own opening. */
const GROUP: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.12, staggerChildren: STEP_S } },
};

const PROSE = "max-w-160 text-note leading-copy text-pretty text-foreground/70 lg:text-body";

/**
 * The client's written-up case study, laid out under the band it belongs to: the figures,
 * the problem, what RESCAN delivered on the dark band the site reserves for the turn in
 * the argument, and what the client got out of it.
 *
 * Copy comes from the client's own write-ups, so the section shape has to survive one that
 * quotes four figures and one that quotes three, and one that titles its challenge and one
 * that does not. Anything a write-up has not supplied yet stays a `[[TODO]]` marker and
 * renders as the pending badge rather than being filled in from the neighbouring cases.
 */
export const CaseStudyPanel = ({
  id,
  copy,
  sectorLabel,
  caseStudyLabel,
  labels,
  contactHref,
  sectorLink,
}: CaseStudyPanelProps) => (
  <motion.div
    id={id}
    className="bg-background"
    initial="hidden"
    animate="show"
    exit="hidden"
    variants={GROUP}
  >
    <div className="mx-auto w-full max-w-shell px-6 py-16 sm:px-8 lg:py-20 lg:pr-10 lg:pl-spine">
      <div className="max-w-measure">
        <motion.div variants={BLOCK}>
          <MonoLabel className="text-primary">
            <Link href={sectorLink.href} className="hover:underline underline-offset-4">
              {sectorLabel}
            </Link>
            {" — "}
            {caseStudyLabel}
          </MonoLabel>
          <h3 className="mt-6 text-h3 font-bold leading-heading tracking-tight text-balance lg:text-h2">
            {copy.title}
          </h3>
          <p className="mt-5 max-w-160 text-note leading-copy text-pretty text-foreground/55 lg:text-body">
            <Pending>{copy.lead}</Pending>
          </p>
        </motion.div>

        <motion.dl
          variants={BLOCK}
          /* One row of however many figures the write-up quotes, each column an equal
             share — a fixed four would leave a three-figure case short a cell and squeeze
             every value into a width the longer ones wrap at. */
          className="mt-11 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-7 sm:grid-flow-col sm:auto-cols-fr sm:grid-cols-none"
        >
          {/* Reversed so the figure reads above its label as the design draws it, while the
              pair stays a `dt`/`dd` in the order a screen reader wants them. */}
          {copy.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1.5">
              <dt className="text-micro leading-caption text-foreground/50">{stat.label}</dt>
              <dd className="text-title-sm font-bold tracking-snug text-balance">
                <Pending className="text-xs">{stat.value}</Pending>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={BLOCK} className="mt-14">
          <MonoLabel>{labels.challenge}</MonoLabel>
          {copy.challenge.headline !== "" && (
            <h4 className="mt-5 max-w-160 text-title-sm font-bold leading-title tracking-tight text-balance">
              <Pending>{copy.challenge.headline}</Pending>
            </h4>
          )}
          <p className={cn("mt-5", PROSE)}>
            <Pending>{copy.challenge.body}</Pending>
          </p>
        </motion.div>

        <motion.div
          variants={BLOCK}
          className="mt-12 rounded-xl px-7 py-8 lg:px-10 lg:py-10"
          style={{ background: DEEP_BLUE_GRADIENT }}
        >
          <MonoLabel className="text-white/45">{labels.change}</MonoLabel>
          <h4 className="mt-5 text-title-sm font-bold leading-title tracking-tight text-balance text-white">
            <Pending className={cn(PENDING_ON_DARK, "text-sm")}>
              {copy.change.headline}
            </Pending>
          </h4>
          <p className="mt-5 max-w-160 text-note leading-copy text-pretty text-white/75 lg:text-body">
            <Pending className={cn(PENDING_ON_DARK, "text-sm")}>
              {copy.change.body}
            </Pending>
          </p>
        </motion.div>

        <motion.div variants={BLOCK} className="mt-12">
          <MonoLabel>{labels.outcome}</MonoLabel>
          <p className={cn("mt-5", PROSE)}>
            <Pending>{copy.outcome.body}</Pending>
          </p>
        </motion.div>

        <motion.div variants={BLOCK} className="mt-14 border-t border-border pt-10">
          <h4 className="text-title-sm font-bold leading-title tracking-tight text-balance">
            {copy.closing.headline}
          </h4>
          <p className="mt-2 text-note leading-copy text-foreground/55 lg:text-body">
            {copy.closing.body}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3">
            <Link
              href={contactHref}
              className="group/cta inline-flex items-center gap-2 text-body font-semibold text-primary underline-offset-4 hover:underline"
            >
              {copy.closing.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
            </Link>
            <Link
              href={sectorLink.href}
              className="text-caption font-semibold text-foreground/45 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {sectorLink.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);
