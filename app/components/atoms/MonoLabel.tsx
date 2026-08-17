import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type MonoLabelProps = {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'p' | 'dt' | 'dd' | 'h2';
  /** For a purely positional index, which duplicates the row it sits beside. */
  'aria-hidden'?: boolean;
};

/**
 * The single definition of the mono typographic rule. Mono is reserved for content that is an
 * index, a coordinate or a fixed field name — never a sentence, and never anything the client
 * wrote. Nothing else in the codebase should reach for `font-mono` by hand.
 */
export const MonoLabel = ({
  children,
  className,
  as: Tag = 'span',
  'aria-hidden': ariaHidden,
}: MonoLabelProps) => (
  <Tag
    aria-hidden={ariaHidden}
    className={cn(
      'font-mono text-[10px] leading-none tracking-[0.18em] uppercase text-muted-foreground',
      className,
    )}
  >
    {children}
  </Tag>
);
