import { Pending, isPending } from "@/app/components/atoms/Pending";

/**
 * The four reasons-to-trust from the Why RESCAN brief. Each pillar carries a proof slot,
 * because the brief is explicit that these must not become generic capability statements —
 * an unproven pillar shows its claim and an empty evidence line, not a stronger claim.
 */

type Pillar = {
  title: string;
  lead: string;
  body: string;
  proof: string;
};

type PillarsProps = {
  headline: string;
  proofLabel: string;
  pillars: Pillar[];
};

export const Pillars = ({ headline, proofLabel, pillars }: PillarsProps) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14">{headline}</h2>

        <div className="flex flex-col gap-12">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-6 md:gap-10 border-t border-border pt-10"
            >
              <div>
                <h3 className="text-xl font-bold tracking-tight">{pillar.title}</h3>
                <p className="text-sm text-foreground/60 mt-2 leading-snug">{pillar.lead}</p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-foreground/70 leading-relaxed whitespace-pre-line">
                  {pillar.body}
                </p>
                {!isPending(pillar.proof) && (
                  <p className="text-sm">
                    <span className="font-semibold text-foreground/50 uppercase tracking-wider text-xs mr-2">
                      {proofLabel}
                    </span>
                    {pillar.proof}
                  </p>
                )}
                <Pending>{pillar.proof}</Pending>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
