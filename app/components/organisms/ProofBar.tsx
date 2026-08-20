import { ArrowRight } from "lucide-react";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { isPending } from "@/app/components/atoms/Pending";
import { CountUp } from "@/app/components/molecules/CountUp";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { Link } from "@/i18n/navigation";

/**
 * Shared by the Home "Proven on real properties." section, the sector pages, and the
 * Why RESCAN "Proof over claims." bar — all four ask for the same thing: a labelled
 * slot with a large figure, and no technical vanity metrics.
 *
 * Figures are strings, not numbers: the briefs write them as "42+ locations" and
 * "38,000 m²", and until the client supplies them they are `[[TODO: …]]` markers —
 * shown unconditionally via `Pending`, matching the design, rather than hidden. Once a
 * real figure lands, its number counts up from zero as the band scrolls into view.
 */

type ProofItem = {
  slot: string;
  figure: string;
  statement?: string;
};

type ProofBarProps = {
  headline: string;
  items: ProofItem[];
  cta?: {
    label: string;
    href: string;
  };
};


export const ProofBar = ({ headline, items, cta }: ProofBarProps) => {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-28" style={{ background: DEEP_BLUE_GRADIENT }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{headline}</h2>
          {cta && !isPending(cta.label) && (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 font-semibold text-accent-sky transition-all hover:gap-3.5"
            >
              {cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </Reveal>

        <dl className="mt-14 grid grid-cols-1 gap-y-12 gap-x-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {items.map((item, i) => (
            <Reveal key={i} className="flex flex-col gap-3.5 lg:pl-8 lg:first:pl-0">
              <MonoLabel as="dt" className="text-white/40">{item.slot}</MonoLabel>
              <dd className="flex flex-col gap-2.5">
                <CountUp value={item.figure} className="text-3xl font-bold tracking-tight text-white sm:text-4xl" />
                {item.statement && (
                  <span className="text-caption leading-relaxed text-white/55">
                    <CountUp value={item.statement} />
                  </span>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
};
