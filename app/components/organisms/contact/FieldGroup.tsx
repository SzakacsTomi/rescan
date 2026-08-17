import type { ReactNode } from 'react';

type FieldGroupProps = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
};

/**
 * One numbered group of the enquiry. Two non-obvious details: `min-w-0` because a `<fieldset>`
 * has an intrinsic `min-width: min-content` that would push two-column rows and textareas out
 * of the grid, and `scroll-mt-28` so a rail anchor does not park the legend under the fixed nav.
 */
export const FieldGroup = ({ id, index, label, children }: FieldGroupProps) => (
  <fieldset id={id} className="m-0 min-w-0 scroll-mt-28 border-0 p-0">
    <legend className="block w-full p-0">
      <span className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="font-mono text-[11px] leading-none tracking-[0.18em] tabular-nums text-primary"
        >
          {index}
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-foreground">{label}</span>
        {/* Runs to the end of the row, the way a drawing schedule announces a line. */}
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </span>
    </legend>
    <div className="mt-6 flex flex-col gap-5">{children}</div>
  </fieldset>
);
