import { cn } from "@/lib/utils";

/**
 * Content the client still owes us is written into messages/*.json as
 * `[[TODO: what we need]]` rather than invented. This renders those markers as a
 * visible hint on preview deploys and as nothing at all in production, so a
 * placeholder can never reach a live page.
 */

const TODO_PATTERN = /^\s*\[\[TODO:\s*([\s\S]*?)\]\]\s*$/;

/**
 * True when a value carries no content yet — either an unfilled marker, or the empty
 * string a marker becomes once `stripPendingMessages` has scrubbed it outside preview.
 */
export const isPending = (value: string) => value.trim() === "" || TODO_PATTERN.test(value);

export const pendingHint = (value: string) => value.match(TODO_PATTERN)?.[1]?.trim() ?? "";

export const placeholdersVisible = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

type PendingProps = {
  children: string;
  className?: string;
};

export const Pending = ({ children, className }: PendingProps) => {
  if (!isPending(children)) {
    return <>{children}</>;
  }

  const hint = pendingHint(children);
  if (!placeholdersVisible || hint === "") {
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
      <span className="text-[0.625rem] font-semibold uppercase tracking-wider opacity-70">
        Todo
      </span>
      {hint}
    </span>
  );
};
