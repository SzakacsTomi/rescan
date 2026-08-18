import { ArrowRight } from "lucide-react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
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

export const LogisticsHero = ({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  facts,
}: LogisticsHeroProps) => (
  <section className="relative isolate overflow-hidden bg-[#020409] lg:flex lg:min-h-[94vh] lg:items-start">
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

    <div className="relative mx-auto grid w-full max-w-480 grid-cols-1 gap-10 px-6 pt-16 pb-16 sm:pt-20 lg:pl-31.5 lg:pt-29 xl:grid-cols-[minmax(0,1fr)_21.25rem] xl:items-start xl:gap-16">
      <div>
        <MonoLabel className="block tracking-[0.22em] text-[#89b4f5]">{eyebrow}</MonoLabel>
        <HeroText
          headline={headline}
          subheadline={subheadline}
          accentLineCount={HEADLINE_ACCENT_LINE_COUNT}
          className="mt-7 max-w-none"
          headlineClassName="lg:text-[4.25rem] 2xl:text-[4rem] min-[1600px]:text-[4.5rem]"
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

      <dl className="flex flex-col gap-3.5 border-t border-white/15 pt-6 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6">
        {facts.map((fact, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <MonoLabel as="dt" className="text-white/35">
              <Pending className="font-sans tracking-normal normal-case">{fact.label}</Pending>
            </MonoLabel>
            <dd className="m-0 text-[15px] text-white/85">
              <Pending>{fact.value}</Pending>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
