import { Reveal } from "@/app/components/atoms/Reveal";
import {
  NumberedValueCard,
  type ValueCardTone,
} from "@/app/components/molecules/NumberedValueCard";
import { cn } from "@/lib/utils";

type ValueItem = {
  title: string;
  description: string;
};

type StrategicValueProps = {
  headline: string;
  body?: string;
  values: ValueItem[];
  /** Which way round the grid sits: tinted band with white-hovering cards (Retail), or
   *  white section with tinted-hovering cards (Logistics). */
  tone?: ValueCardTone;
};

/** Column count follows the brief's value count — four for Retail, three for Logistics.
 *  Three only ever splits at `lg`: a two-column row of three cards would leave one cell
 *  empty, and an empty cell in a hairline grid reads as a grey block, not as whitespace. */
const GRID_COLUMNS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export const StrategicValue = ({
  headline,
  body,
  values,
  tone = "tinted",
}: StrategicValueProps) => {
  return (
    <section
      className={cn("px-6 py-24 sm:px-8 lg:px-10 lg:py-30", tone === "tinted" && "bg-muted")}
    >
      <div className="mx-auto max-w-page">
        <Reveal>
          <h2 className="max-w-180 text-title-lg leading-tight font-bold tracking-tight text-balance sm:text-h2 lg:text-h1">
            {headline}
          </h2>
        </Reveal>
        {body && (
          <Reveal>
            <p className="mt-5 max-w-170 text-body leading-prose text-pretty text-foreground/60">{body}</p>
          </Reveal>
        )}
        <div className={cn("mt-14 grid grid-cols-1 gap-px bg-border", GRID_COLUMNS[values.length])}>
          {values.map((value, i) => (
            <NumberedValueCard
              key={value.title}
              index={i}
              title={value.title}
              description={value.description}
              tone={tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
