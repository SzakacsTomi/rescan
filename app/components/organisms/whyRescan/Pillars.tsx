import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Stagger } from "@/app/components/atoms/Stagger";

export const PILLARS_ID = "pillars";

/**
 * The four reasons-to-trust from the Why RESCAN brief, drawn as a hairline card grid.
 * Each pillar carries a proof slot, because the brief is explicit that these must not
 * become generic capability statements — an unproven pillar shows its claim and an
 * empty evidence line, not a stronger claim.
 */

type Pillar = {
  title: string;
  lead: string;
  body: string;
  proof: string;
};

type PillarsProps = {
  headline: string;
  monoLabel: string;
  proofLabel: string;
  pillars: Pillar[];
};

export const Pillars = ({ headline, monoLabel, proofLabel, pillars }: PillarsProps) => {
  return (
    <section id={PILLARS_ID} className="scroll-mt-16 px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto max-w-310">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[23ch] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[38px]">
            {headline}
          </h2>
          <MonoLabel className="text-foreground/40">{monoLabel}</MonoLabel>
        </Reveal>

        <Stagger
          as="div"
          className="mt-14 grid grid-cols-1 gap-px bg-border md:grid-cols-2"
        >
          {pillars.map((pillar, i) => (
            <article key={pillar.title} className="flex flex-col gap-4.5 bg-background py-10 px-9">
              <div className="flex items-baseline gap-4">
                <MonoLabel className="text-primary" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </MonoLabel>
                <h3 className="text-2xl font-bold leading-[1.1] tracking-[-0.03em] lg:text-[28px]">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-[19px] font-semibold leading-[1.4] tracking-[-0.02em]">
                {pillar.lead}
              </p>
              <p className="text-base leading-[1.7] whitespace-pre-line text-foreground/65">
                {pillar.body}
              </p>
              <div className="mt-auto flex flex-col gap-3 bg-secondary p-5">
                <MonoLabel className="text-foreground/50">{proofLabel}</MonoLabel>
                <Pending>{pillar.proof}</Pending>
              </div>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
