import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';

type NumberedValueCardProps = {
  index: number;
  title: string;
  description: string;
};

/** The redesign's 4-column "value" grid — a positional index above the title, not a
 *  translated label, so it is `aria-hidden` like every other index `MonoLabel` renders. */
export const NumberedValueCard = ({ index, title, description }: NumberedValueCardProps) => (
  <Reveal className="flex min-h-[220px] flex-col gap-4 bg-muted pt-8 pr-[26px] pb-10 pl-[26px] transition-colors hover:bg-background">
    <MonoLabel aria-hidden className="text-primary">
      {String(index + 1).padStart(2, '0')}
    </MonoLabel>
    <h3 className="text-[21px] leading-[1.25] font-semibold tracking-[-0.02em]">{title}</h3>
    <p className="mt-auto text-sm leading-[1.65] text-foreground/60">{description}</p>
  </Reveal>
);
