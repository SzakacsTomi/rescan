import { ArrowDown, ArrowRight } from "lucide-react";
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
  /** `compact` is the inline one-liner used on the Home sector blocks. */
  variant?: "steps" | "compact";
  className?: string;
};

export const ConsequenceChain = ({
  steps,
  variant = "steps",
  className,
}: ConsequenceChainProps) => {
  if (variant === "compact") {
    return (
      <p
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground/55",
          className,
        )}
      >
        {steps.map((step, i) => (
          <span key={step} className="inline-flex items-center gap-2">
            {i > 0 && <ArrowRight aria-hidden className="h-3.5 w-3.5 shrink-0 opacity-50" />}
            {step}
          </span>
        ))}
      </p>
    );
  }

  return (
    <ol className={cn("flex flex-col items-stretch gap-0", className)}>
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
