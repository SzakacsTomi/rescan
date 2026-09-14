import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { CountUp } from "@/app/components/molecules/CountUp";
import { FootprintScale } from "@/app/components/molecules/FootprintScale";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { parseFigureNumber } from "@/lib/figures";

/**
 * The evidence band for Logistics, where both proofs are areas. `ProofBar` sets a figure
 * as one long line, which turned "96,000 m² operational logistics facility" into a
 * sentence in display type; here the figure keeps the number, the facility it describes
 * drops to a line under it, and the area is drawn to scale beneath both — the two proofs
 * share one scale, so the second reads as three times the first rather than as another
 * large round number.
 */

type ScaleProofItem = {
  slot: string;
  figure: string;
  /** What the figure is — the qualifier that used to trail the number in the same line. */
  context?: string;
  statement?: string;
  /** Separate buildings behind the figure, drawn as that many plates. */
  sites: number;
};

type ScaleProofProps = {
  headline: string;
  items: ScaleProofItem[];
};

export const ScaleProof = ({ headline, items }: ScaleProofProps) => {
  // A figure with no number in it — a `[[TODO: …]]` marker, or a worded value — has no
  // footprint to draw, and must not set the scale the others are measured against.
  const proofs = items.map((item) => ({ ...item, area: parseFigureNumber(item.figure) }));
  const largest = Math.max(...proofs.map((proof) => proof.area ?? 0));

  return (
    <section
      className="px-6 py-24 sm:px-8 lg:px-10 lg:py-28"
      style={{ background: DEEP_BLUE_GRADIENT }}
    >
      <div className="mx-auto max-w-page">
        <Reveal>
          <h2 className="max-w-measure text-h2 leading-tight font-bold tracking-tight text-balance text-white sm:text-h1 lg:text-h1-lg">
            {headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-y-14 lg:grid-cols-2 lg:divide-x lg:divide-white/10">
          {proofs.map((item, i) => (
            <Reveal
              key={i}
              className="flex flex-col lg:pl-16 lg:first:pr-16 lg:first:pl-0"
            >
              <MonoLabel className="text-accent-sky">{item.slot}</MonoLabel>

              <CountUp
                value={item.figure}
                className="mt-6 block text-h1 font-bold tracking-tight text-white sm:text-display-2xs"
                pendingClassName="mt-6"
              />

              {item.context && (
                <p className="mt-4 text-lead leading-snug text-white/70">{item.context}</p>
              )}

              {item.area !== null && largest > 0 && (
                <FootprintScale className="mt-9" share={item.area / largest} sites={item.sites} />
              )}

              {item.statement && (
                <p className="mt-9 border-t border-white/10 pt-7 text-caption leading-relaxed text-white/55">
                  {item.statement}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
