import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { cn } from "@/lib/utils";

/**
 * The step sequence every brief uses to turn an information gap into a cost:
 * `missing information → assumptions → redesign → lost time`.
 *
 * The Logistics brief is explicit that each step must NOT become a large card with
 * supporting copy — the whole chain has to read in seconds. Keep the labels short.
 */

type ConsequenceChainProps = {
  steps: string[];
};

/** Escalation weight per step — the track reads left-to-right as the consequence gets
 *  more expensive, so each column is brighter, larger and heavier than the last. The
 *  columns share one height: the steps are bottom-aligned, so the growing type alone
 *  draws the staircase. */
const STEP_STYLE = [
  { surface: "bg-background/45", index: "text-foreground/35", label: "text-note font-medium text-foreground/55", rule: "border-foreground/15" },
  { surface: "bg-background/55", index: "text-foreground/35", label: "text-base font-medium text-foreground/65", rule: "border-foreground/20" },
  { surface: "bg-background/65", index: "text-foreground/40", label: "text-body font-semibold text-foreground/75", rule: "border-foreground/30" },
  { surface: "bg-background/75", index: "text-foreground/45", label: "text-lead font-semibold text-foreground/85", rule: "border-foreground/45" },
  { surface: "bg-background/85", index: "text-primary/70", label: "text-lead-lg font-bold text-foreground", rule: "border-primary/60" },
  { surface: "bg-background", index: "text-primary", label: "text-2xl font-bold text-foreground", rule: "border-primary" },
] as const;

export const ConsequenceChain = ({ steps }: ConsequenceChainProps) => {
  return (
    <ol className="flex flex-col gap-0.5 lg:min-h-72 lg:flex-row lg:items-stretch">
      {steps.map((step, i) => {
        const style = STEP_STYLE[Math.min(i, STEP_STYLE.length - 1)];
        return (
          <Reveal
            as="li"
            key={step}
            className={cn(
              "flex flex-1 flex-col justify-end gap-4.5 border-l-3 px-5 pt-6 pb-7 transition-colors hover:bg-background lg:border-l-0 lg:border-t-3",
              style.surface,
              style.rule,
            )}
          >
            <MonoLabel aria-hidden className={style.index}>
              {String(i + 1).padStart(2, "0")}
            </MonoLabel>
            <span className={cn("leading-card tracking-snug", style.label)}>{step}</span>
          </Reveal>
        );
      })}
    </ol>
  );
};
