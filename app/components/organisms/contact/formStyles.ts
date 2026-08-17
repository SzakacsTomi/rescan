import { cn } from '@/lib/utils';

/**
 * The focus ring is the full-strength colour, not a tint: `ring-primary/30` on white measures
 * ~1.4:1, below the 3:1 floor WCAG 2.2 sets for focus appearance.
 */
const baseInputClass =
  'w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors text-sm';

export const inputClass = cn(
  baseInputClass,
  'border-border focus-visible:ring-primary focus-visible:border-primary',
);
export const errorInputClass = cn(
  baseInputClass,
  'border-destructive focus-visible:ring-destructive focus-visible:border-destructive',
);

export const labelClass = 'block text-sm font-medium mb-1.5';
