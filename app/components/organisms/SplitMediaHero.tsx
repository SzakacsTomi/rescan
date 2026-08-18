import type { ReactNode } from 'react';

import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';
import { cn } from '@/lib/utils';

type MetaItem = {
  label: string;
  value: string;
  href?: string;
};

type SplitMediaHeroProps = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  /** Up to three hairline-divided facts under the subline. */
  meta?: MetaItem[];
  /** Fills the right half on `lg`, a full-bleed band below it. Sized by the hero, so pass
   *  something that stretches: `className="h-full w-full"`. */
  media: ReactNode;
};

/**
 * Text on the page's own left gutter, media bleeding off the right viewport edge.
 *
 * The copy is top-anchored to the same start as the other heroes: the 126px left spine
 * (the logo's right edge) and, on desktop, the 180px top line — the `(pages)` layout
 * wrapper clears the fixed navbar's 64px, so the extra padding here reaches that line.
 * The section caps its own height so the text reads as composition against the media's
 * mass rather than a headline floating in an empty field.
 */
export const SplitMediaHero = ({
  eyebrow,
  headline,
  subheadline,
  meta,
  media,
}: SplitMediaHeroProps) => (
  <section className="relative isolate bg-background lg:h-[clamp(34rem,calc(100svh-4rem),46rem)]">
    <div className="max-w-480 mx-auto lg:h-full">
      {/* The text column tracks the same 53% seam as the media, so the copy gets the whole left
          half up to it rather than a fixed narrow measure. `pl` keeps the site's 126px spine. */}
      <div className="px-6 lg:h-full lg:w-[53%] lg:pr-6 lg:pl-[126px]">
        <div className="flex flex-col justify-center gap-8 pt-16 pb-10 sm:pt-20 sm:pb-12 lg:h-full lg:max-w-[40rem] lg:justify-start lg:gap-10 lg:pt-29 lg:pb-0">
          <Reveal>
            {eyebrow && (
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-11 bg-primary/50" />
                <MonoLabel className="text-primary">{eyebrow}</MonoLabel>
              </div>
            )}
            {/* No `text-balance`: the headline's three lines come from the default greedy wrap,
                which is what puts the break after "to" and after "the". Balancing evens the
                line lengths instead and loses that break. */}
            <h1
              className={cn(
                'text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl xl:text-[3.375rem]',
                eyebrow && 'mt-6',
              )}
            >
              {headline}
            </h1>
            {/* `pre-line` keeps the copy's own sentence break; the measure is wide enough to
                hold the first sentence on one line, so the break lands where the copy puts it. */}
            {subheadline && (
              <p className="mt-6 max-w-[49ch] text-base leading-relaxed whitespace-pre-line text-pretty text-foreground/70 sm:text-lg">
                {subheadline}
              </p>
            )}
          </Reveal>

          {meta && meta.length > 0 && (
            <Reveal
              as="dl"
              className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            >
              {meta.map((item) => (
                <div key={item.label} className="py-4 sm:px-5 sm:py-5 sm:first:pl-0 sm:last:pr-0">
                  <MonoLabel as="dt">{item.label}</MonoLabel>
                  {/* No `text-balance`: at this column width each value fits on one line, and
                      balancing would split the longest one back into two. */}
                  <dd>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-2 inline-block rounded-sm text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="mt-2 block text-sm font-medium text-foreground">
                        {item.value}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </div>

    {/* One instance, two behaviours — rendering the media twice would load it twice. The 53%
        seam gives the lighter half slightly more width, since dark reads heavier at equal area. */}
    <div className="relative h-60 w-full sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[53%] lg:h-auto lg:w-auto">
      {media}
    </div>
  </section>
);
