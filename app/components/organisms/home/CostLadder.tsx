import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { cn } from "@/lib/utils";

type LadderItem = {
  label: string;
  tag: string;
};

type CostLadderProps = {
  eyebrow: string;
  headline: string;
  items: LadderItem[];
};

/** Visual escalation weight per rung — the ladder reads left-to-right as the problem
 *  gets bigger, so each step is more indented, larger and bolder than the last. */
const RUNG_STYLE = [
  { indent: "ml-0", size: "text-lg sm:text-xl", weight: "font-medium", color: "text-foreground/45" },
  { indent: "ml-6 sm:ml-12", size: "text-xl sm:text-2xl", weight: "font-semibold", color: "text-foreground/60" },
  { indent: "ml-12 sm:ml-24", size: "text-2xl sm:text-3xl", weight: "font-semibold", color: "text-foreground/75" },
  { indent: "ml-16 sm:ml-36", size: "text-3xl sm:text-4xl", weight: "font-bold", color: "text-foreground" },
] as const;

export const CostLadder = ({ eyebrow, headline, items }: CostLadderProps) => {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <MonoLabel className="text-foreground/40">{eyebrow}</MonoLabel>
          <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-h1-lg">
            {headline}
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col lg:mt-18">
          {items.map((item, i) => {
            const rung = RUNG_STYLE[i];
            const isLast = i === items.length - 1;
            return (
              <Reveal
                key={item.label}
                className={cn(
                  "flex items-baseline gap-5 border-t border-border py-6",
                  rung.indent,
                )}
              >
                <MonoLabel className={isLast ? "text-primary" : "text-foreground/35"}>
                  {String(i + 1).padStart(2, "0")}
                </MonoLabel>
                <span className={cn("tracking-tight", rung.size, rung.weight, rung.color)}>
                  {item.label}
                </span>
                <span className={cn("h-px flex-1", isLast ? "bg-primary" : "bg-border")} />
                <MonoLabel className={isLast ? "text-primary" : "text-foreground/35"}>
                  {item.tag}
                </MonoLabel>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
