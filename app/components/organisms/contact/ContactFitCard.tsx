import { MonoLabel } from '@/app/components/atoms/MonoLabel';

type ContactFitCardProps = {
  headline: string;
  items: string[];
  /** The two halves of the disqualification, one per line — see the note below. */
  disqualifiers: string[];
};

/** Letters, not `01…`, so the rows do not read as a sixth step under the rail's `01–05`. */
const FIRST_FIT_INDEX = 'A'.charCodeAt(0);

/**
 * The brief asks for this to stay visible near the form — in the rail it scrolls with it for
 * the whole page, which a slab at the bottom does not.
 *
 * Three levels, because a panel set at one size and one weight reads as a block of filler
 * whatever it says: a sans heading, the qualifying rows at full strength with a mono index,
 * and the disqualification demoted onto its own lighter ground. The heading is the client's
 * own words, so it is not a `MonoLabel` — mono here is only ever the index.
 *
 * A schedule, not a checklist: no ticks, no green, no red. Colour-coding the disqualification
 * as an error makes a deliberate filter look apologetic.
 *
 * The disqualification arrives as two strings because it is two statements, and in a column
 * this narrow a wrap heuristic breaks it mid-sentence. One statement per line is also how the
 * briefs set it.
 */
export const ContactFitCard = ({ headline, items, disqualifiers }: ContactFitCardProps) => (
  <div className="mt-6 overflow-hidden rounded-lg border border-border bg-secondary">
    <div className="px-6 pt-4 pb-3">
      <h2 className="border-b border-foreground/10 pb-3.5 text-base font-semibold tracking-tight text-balance text-foreground">
        {headline}
      </h2>

      <ul className="divide-y divide-foreground/10">
        {items.map((item, index) => (
          <li key={item} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 py-3">
            <MonoLabel aria-hidden className="mt-1 text-primary">
              {String.fromCharCode(FIRST_FIT_INDEX + index)}
            </MonoLabel>
            <span className="text-sm leading-note text-pretty text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="border-t border-border bg-background px-6 py-4">
      {disqualifiers.map((line) => (
        <p key={line} className="text-xs leading-body text-pretty text-muted-foreground">
          {line}
        </p>
      ))}
    </div>
  </div>
);
