import { ArrowRight } from "lucide-react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { CountUp } from "@/app/components/molecules/CountUp";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { cn } from "@/lib/utils";

type HeroStat = {
  value: string;
  label: string;
};

type ProjectsHeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  stats: HeroStat[];
  /** Both CTAs scroll down this page rather than routing, so they carry raw fragments. */
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const HERO_GRID =
  "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)";
const HERO_GRID_SIZE = "88px 88px";
const HERO_GLOW =
  "radial-gradient(ellipse 65% 60% at 22% 80%, rgba(43,99,187,0.34) 0%, rgba(43,99,187,0) 100%)";

const STAT_PENDING_CLASS =
  "px-2.5 py-1.5 text-sm border-amber-500/80 bg-amber-500/12 text-amber-300";

export const ProjectsHero = ({
  eyebrow,
  headline,
  subheadline,
  stats,
  primaryCta,
  secondaryCta,
}: ProjectsHeroProps) => {
  return (
    <section
      className="relative isolate flex flex-col overflow-hidden pt-16 sm:pt-20 lg:min-h-[calc(100svh-4rem)]"
      style={{ background: DEEP_BLUE_GRADIENT }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: HERO_GRID, backgroundSize: HERO_GRID_SIZE }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: HERO_GLOW }} />

      <div className="relative mx-auto flex w-full max-w-shell flex-1 flex-col px-6 pb-14 sm:px-8 lg:pb-16 lg:pl-31.5">
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-11 bg-white/40" />
            <MonoLabel className="tracking-eyebrow text-accent-sky">{eyebrow}</MonoLabel>
          </div>
          <Reveal>
            <h1 className="mt-7 max-w-205 text-h2 font-bold leading-display tracking-tight text-balance text-white sm:text-h1-lg lg:text-display">
              {headline}
            </h1>
            <p className="mt-7 max-w-165 text-body leading-copy text-pretty text-white/62 lg:text-lead">
              {subheadline}
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal className="grid grid-cols-2 border-t border-white/16 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "border-white/16 px-6 py-6",
                  // The design bleeds the outermost cells to the container edge. At two columns
                  // that edge falls on every other cell, so the rule is rewritten at `lg`.
                  i % 2 === 0 ? "border-r pl-0" : "pr-0",
                  i >= 2 && "border-t",
                  "lg:border-t-0 lg:border-r lg:last:border-r-0",
                  i === 0 ? "lg:pl-0" : "lg:pl-6",
                  i === stats.length - 1 ? "lg:pr-0" : "lg:pr-6",
                )}
              >
                <CountUp
                  value={stat.value}
                  className="block text-title-lg font-bold tracking-snug text-white lg:text-h2-lg"
                  pendingClassName={STAT_PENDING_CLASS}
                />
                <span className="mt-1.5 block text-caption leading-caption text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={primaryCta.href}
              className="group inline-flex items-center gap-2.5 rounded-md bg-primary px-7.5 py-4.25 text-note font-semibold text-primary-foreground transition-colors hover:bg-accent-mid"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </a>
            <a
              href={secondaryCta.href}
              className="border-b border-white/30 pb-0.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              {secondaryCta.label}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
