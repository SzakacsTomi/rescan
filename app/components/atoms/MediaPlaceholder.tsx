import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type MediaPlaceholderProps = {
  /** The `background-image` of the placeholder surface — passed in, never imported
   *  downward: atoms import nothing local. */
  stripe: string;
  className?: string;
  children?: ReactNode;
};

/** The unbound-media slot from the design's preview: a box painted with a diagonal stripe
 *  pattern that reads as "an image belongs here". The stripes live in `config/gradients.ts`
 *  so hero and portrait slots each keep their exact design variant. */
export const MediaPlaceholder = ({ stripe, className, children }: MediaPlaceholderProps) => {
  return (
    <div
      className={cn('flex items-center justify-center', className)}
      style={{ backgroundImage: stripe }}
    >
      {children}
    </div>
  );
};