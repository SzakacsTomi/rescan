import { ArrowRight } from "lucide-react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Stagger } from "@/app/components/atoms/Stagger";
import { CountUp } from "@/app/components/molecules/CountUp";
import { Link } from "@/i18n/navigation";

type ProofRow = {
  slot: string;
  figure: string;
  statement: string;
};

type ProofLedgerProps = {
  headline: string;
  cta: { label: string; href: string };
  rows: ProofRow[];
};

const LEDGER_GLOW =
  "radial-gradient(ellipse 50% 80% at 88% 50%, rgba(43,99,187,0.22) 0%, rgba(43,99,187,0) 100%)";

/**
 * The Why RESCAN "Proof over claims." ledger. Figures run through `CountUp` so a supplied
 * number counts up from zero in place, while every unfilled slot keeps its amber Todo badge.
 */
export const ProofLedger = ({ headline, cta, rows }: ProofLedgerProps) => {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div aria-hidden className="absolute inset-0" style={{ background: LEDGER_GLOW }} />
      <div className="relative mx-auto max-w-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-h1-lg">
            {headline}
          </h2>
          <Link
            href={cta.href}
            className="group inline-flex items-center gap-2 text-note font-semibold text-accent-sky transition-all hover:gap-3"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Stagger as="dl" className="mt-14 flex flex-col">
          {rows.map((row) => (
            <div
              key={row.slot}
              className="grid grid-cols-1 items-baseline gap-4 border-t border-white/14 py-7 last:border-b lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10"
            >
              <MonoLabel as="dt" className="text-white/40">
                {row.slot}
              </MonoLabel>
              <dd className="m-0">
                <CountUp
                  value={row.figure}
                  className="text-base font-semibold text-white"
                  pendingClassName="px-2.5 py-2 text-base leading-caption border-amber-500/80 bg-amber-500/12 text-amber-300"
                />
              </dd>
              <dd className="m-0 text-note text-white/60">
                <Pending className="px-2 py-1.5 text-caption border-amber-500/55 bg-amber-500/8 text-amber-300">
                  {row.statement}
                </Pending>
              </dd>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
};