import { cn } from '@/lib/utils';

const baseInputClass =
  'w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-colors text-sm';

export const inputClass = cn(baseInputClass, 'border-border focus:ring-primary/30 focus:border-primary');
export const errorInputClass = cn(
  baseInputClass,
  'border-destructive focus:ring-destructive/30 focus:border-destructive',
);

export const labelClass = 'block text-sm font-medium mb-1.5';
