import { ArrowDown } from "lucide-react";
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

export const ConsequenceChain = ({ steps }: ConsequenceChainProps) => {
  return (
    <ol className="flex flex-col items-stretch gap-0">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-center">
          {i > 0 && (
            <ArrowDown aria-hidden className="my-2 h-4 w-4 shrink-0 text-foreground/30" />
          )}
          <span
            className={cn(
              "w-full rounded-lg border border-border px-5 py-3 text-center text-sm sm:text-base",
              // The last step is the one that costs money — it carries the emphasis.
              i === steps.length - 1
                ? "border-foreground/25 bg-muted/60 font-semibold"
                : "text-foreground/70",
            )}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
};
