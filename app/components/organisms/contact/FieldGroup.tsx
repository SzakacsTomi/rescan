import type { ReactNode } from 'react';

import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';

type FieldGroupProps = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
};

/**
 * One numbered group of the enquiry, and the unit the page reveals on scroll — the same
 * fade-and-rise the sections on the other pages get.
 *
 * Two non-obvious details: `min-w-0` because a `<fieldset>` has an intrinsic
 * `min-width: min-content` that would push two-column rows and textareas out of the grid, and
 * `scroll-mt-28` so a rail anchor does not park the legend under the fixed nav — the id stays on
 * the fieldset rather than the reveal wrapper, so both the anchor and that offset keep working.
 */
export const FieldGroup = ({ id, index, label, children }: FieldGroupProps) => (
  <Reveal>
    <fieldset id={id} className="m-0 min-w-0 scroll-mt-28 border-0 p-0">
      <legend className="block w-full p-0">
        <span className="flex items-center gap-4">
          <MonoLabel aria-hidden className="text-mono-xs tabular-nums text-primary">
            {index}
          </MonoLabel>
          <span className="text-note font-semibold tracking-tight text-foreground">{label}</span>
          {/* Runs to the end of the row, the way a drawing schedule announces a line. */}
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </span>
      </legend>
      <div className="mt-6 flex flex-col gap-5">{children}</div>
    </fieldset>
  </Reveal>
);
