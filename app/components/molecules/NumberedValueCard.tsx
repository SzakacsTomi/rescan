import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';
import { cn } from '@/lib/utils';

export type ValueCardTone = 'tinted' | 'plain';

type NumberedValueCardProps = {
  index: number;
  title: string;
  description: string;
  /** Follows its section: a card on the tinted band hovers to white, a card on white
   *  hovers to the tint. The two also carry slightly different type and padding — the
   *  design sizes the three-up Logistics card up from the four-up Retail one. */
  tone?: ValueCardTone;
};

const TONE_STYLE: Record<ValueCardTone, { card: string; title: string; description: string }> = {
  tinted: {
    card: 'bg-muted px-6.5 pt-8 pb-10 hover:bg-background',
    title: 'text-lead-lg',
    description: 'text-sm',
  },
  plain: {
    card: 'bg-background px-7 pt-8.5 pb-11 hover:bg-muted/50',
    title: 'text-subhead',
    description: 'text-note',
  },
};

/** The redesign's numbered "value" grid — a positional index above the title, not a
 *  translated label, so it is `aria-hidden` like every other index `MonoLabel` renders. */
export const NumberedValueCard = ({
  index,
  title,
  description,
  tone = 'tinted',
}: NumberedValueCardProps) => {
  const style = TONE_STYLE[tone];

  return (
    <Reveal className={cn('flex flex-col gap-4 transition-colors lg:min-h-55', style.card)}>
      <MonoLabel aria-hidden className="text-primary">
        {String(index + 1).padStart(2, '0')}
      </MonoLabel>
      <h3 className={cn('leading-card font-semibold tracking-snug', style.title)}>
        {title}
      </h3>
      <p className={cn('mt-auto leading-copy text-foreground/60', style.description)}>
        {description}
      </p>
    </Reveal>
  );
};
