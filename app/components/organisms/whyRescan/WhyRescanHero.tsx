import { ArrowRight } from "lucide-react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type WhyRescanHeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  /** The four pillar names the index strip links down to. */
  anchors: string[];
  questionLabel: string;
  question: string;
  cta: { label: string; href: string };
};

const PILLARS_ID = "#pillars";

const QUESTION_PANEL_GRID =
  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)";
const QUESTION_PANEL_GRID_SIZE = "120px 120px";
const QUESTION_PANEL_GLOW =
  "radial-gradient(ellipse 70% 70% at 30% 20%, rgba(43,99,187,0.32) 0%, rgba(43,99,187,0) 100%)";

export const WhyRescanHero = ({
  eyebrow,
  headline,
  subheadline,
  anchors,
  questionLabel,
  question,
  cta,
}: WhyRescanHeroProps) => {
  return (
    <section className="relative isolate flex flex-col bg-background lg:min-h-[calc(100svh-4rem)]">
      <div className="relative mx-auto w-full max-w-shell lg:flex lg:flex-1">
        <div className="px-6 sm:px-8 lg:flex lg:w-[53%] lg:flex-col lg:pr-8 lg:pl-31.5">
          <div className="flex flex-col justify-between gap-10 pt-16 pb-16 sm:pt-20 lg:flex-1 lg:pt-29 lg:pb-16">
            <div>
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-11 bg-primary/50" />
                <MonoLabel className="text-primary">{eyebrow}</MonoLabel>
              </div>
              <Reveal>
                <h1 className="mt-7 max-w-160 text-h2 font-bold leading-display tracking-headline sm:text-h1-lg lg:text-display-xs">
                  {headline}
                </h1>
                <p className="mt-6 max-w-[49ch] text-base leading-prose text-foreground/70 sm:text-lg">
                  {subheadline}
                </p>
              </Reveal>
            </div>

            <Reveal>
              <ol className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
                {anchors.map((anchor, i) => (
                  <li
                    key={anchor}
                    className={cn(
                      "group relative flex flex-col justify-between gap-3 py-6 pl-4 pr-4 lg:py-7 lg:pr-6",
                      i % 2 === 0 && "border-r border-border",
                      i >= 2 && "border-t border-border lg:border-t-0",
                      "lg:border-r lg:border-border",
                    )}
                  >
                    <MonoLabel
                      aria-hidden
                      className="pointer-events-none text-h1-lg leading-none font-medium tracking-snug text-primary/12 transition-colors duration-300 group-hover:text-primary/30"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </MonoLabel>
                    <a
                      href={PILLARS_ID}
                      className="relative z-10 text-sm font-semibold text-foreground transition-colors group-hover:text-primary"
                    >
                      {anchor}
                    </a>
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-primary/35 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-primary"
                    />
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden bg-ink lg:absolute lg:inset-y-0 lg:right-0 lg:left-[53%] lg:mt-0">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: QUESTION_PANEL_GRID, backgroundSize: QUESTION_PANEL_GRID_SIZE }}
        />
        <div aria-hidden className="absolute inset-0" style={{ background: QUESTION_PANEL_GLOW }} />
        <div className="relative flex min-h-96 flex-col justify-between gap-10 px-6 py-12 sm:px-8 lg:h-full lg:min-h-0 lg:gap-0 lg:pt-29 lg:pr-16 lg:pb-16 lg:pl-14">
          <Reveal>
            <MonoLabel className="tracking-eyebrow text-accent-sky">{questionLabel}</MonoLabel>
          </Reveal>
          <Reveal>
            <p className="m-0 max-w-[26ch] text-2xl font-semibold leading-quote tracking-title text-white sm:text-h2">
              {question}
            </p>
          </Reveal>
          <Reveal>
            <Link
              href={cta.href}
              className="group inline-flex w-fit items-center gap-2.5 rounded-md bg-primary px-7.5 py-4.25 text-note font-semibold text-primary-foreground transition-colors hover:bg-accent-mid"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
