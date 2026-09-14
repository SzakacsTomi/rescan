import { isPending, pendingHint } from "@/lib/pending";
import { cn } from "@/lib/utils";

/** The badge's default amber is mixed for white paper. Pass this wherever a marker lands on
 *  one of the site's dark bands, so the same hint stays readable without a second palette. */
export const PENDING_ON_DARK = "border-amber-500/80 bg-amber-500/12 text-amber-300";

type PendingProps = {
  children: string;
  className?: string;
};

/**
 * Renders a `[[TODO: …]]` marker as a visible dashed-amber "Todo" hint, unconditionally —
 * matching the imported design, which always shows its placeholder badges rather than
 * hiding them. Real content passes through untouched, so this is safe to leave in place
 * once the value arrives.
 */
export const Pending = ({ children, className }: PendingProps) => {
  if (!isPending(children)) {
    return <>{children}</>;
  }

  const hint = pendingHint(children);
  if (hint === "") {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 rounded-md border border-dashed border-amber-500/70",
        "bg-amber-500/10 px-2 py-1 text-sm font-normal text-amber-700 dark:text-amber-300",
        className,
      )}
    >
      <span className="text-mono-2xs font-semibold uppercase tracking-wider opacity-70">
        Todo
      </span>
      {hint}
    </span>
  );
};
