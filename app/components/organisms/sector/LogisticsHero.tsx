import { ArrowRight } from "lucide-react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { Stagger } from "@/app/components/atoms/Stagger";
import { HeroText } from "@/app/components/molecules/HeroText";
import { Link } from "@/i18n/navigation";

type Fact = {
  label: string;
  value: string;
};

type LogisticsHeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  facts: Fact[];
};

/** The design closes the second headline line in the accent blue. */
const HEADLINE_ACCENT_LINE_COUNT = 1;

/** The rail reads as a datasheet, so each fact carries a fixed two-digit index. */
const FACT_INDEX = ["01", "02", "03", "04"];

export const LogisticsHero = ({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  facts,
}: LogisticsHeroProps) => (
  <section className="relative isolate overflow-hidden bg-[#020409] lg:flex lg:min-h-[94vh]">
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
      }}
    />
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 70% at 82% 30%, rgba(43,99,187,0.3) 0%, rgba(43,99,187,0) 100%)",
      }}
    />

    <div className="relative mx-auto grid w-full max-w-480 content-start grid-cols-1 gap-10 px-6 pt-16 pb-16 sm:pt-20 lg:pl-31.5 lg:pt-29 xl:grid-cols-[minmax(0,1fr)_21.25rem] xl:grid-rows-[1fr] xl:gap-16">
      <div>
        <MonoLabel className="block tracking-[0.22em] text-[#89b4f5]">{eyebrow}</MonoLabel>
        <HeroText
          headline={headline}
          subheadline={subheadline}
          accentLineCount={HEADLINE_ACCENT_LINE_COUNT}
          className="mt-7 max-w-none"
          headlineClassName="lg:text-[3.5rem] 2xl:text-[4rem] min-[1600px]:text-[4.5rem]"
          subheadlineClassName="mt-7 max-w-170 text-[19px] leading-[1.65] text-white/62 lg:text-[19px]"
        />
        <div className="mt-20 flex flex-wrap items-center gap-6">
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center gap-2.5 rounded-md bg-primary px-7.5 py-4.25 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-[#3f77cf]"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="border-b border-white/30 pb-0.5 text-sm font-semibold text-white hover:border-white/60"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="relative xl:h-full">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-white/25 to-transparent xl:block"
        />
        <Stagger
          as="dl"
          className="flex h-full flex-col border-t border-white/12 pt-6 xl:border-t-0 xl:pt-0"
        >
          {facts.map((fact, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-center gap-2.5 border-t border-white/10 py-5 first:border-t-0 xl:flex-1 xl:bg-gradient-to-r xl:from-white/4 xl:to-transparent xl:pl-8"
            >
              <span
                aria-hidden
                className="absolute top-1/2 left-0 hidden h-10 w-0.5 -translate-y-1/2 bg-[#89b4f5] xl:block"
              />
              <MonoLabel aria-hidden className="text-[#89b4f5]/60">
                {FACT_INDEX[i]}
              </MonoLabel>
              <dt className="text-[13px] leading-snug text-white/45">
                <Pending>{fact.label}</Pending>
              </dt>
              <dd className="m-0 text-[26px] leading-none font-semibold tracking-[-0.02em] text-white">
                <Pending>{fact.value}</Pending>
              </dd>
            </div>
          ))}
        </Stagger>
      </div>
    </div>
  </section>
);
