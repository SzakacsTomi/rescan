import type { ReactNode } from 'react';

import { MonoLabel } from '@/app/components/atoms/MonoLabel';

type MetaItem = {
  label: string;
  value: string;
  href?: string;
};

type SplitMediaHeroProps = {
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
 * Two things this deliberately does not do. It adds **no top padding** — the `(pages)` layout
 * wrapper already clears the fixed navbar, and stacking a second offset on top of it is what
 * left the old contact hero with 200px of dead space. And it caps its own height, so the
 * vertically centred text reads as composition against the media's mass rather than as a
 * headline floating in an empty field.
 */
export const SplitMediaHero = ({ headline, subheadline, meta, media }: SplitMediaHeroProps) => (
  <section className="relative isolate bg-background lg:h-[clamp(34rem,calc(100svh-4rem),46rem)]">
    <div className="mx-auto max-w-5xl px-6 lg:h-full">
      <div className="flex flex-col justify-center gap-8 pt-12 pb-10 sm:pt-16 sm:pb-12 lg:h-full lg:max-w-[28rem] lg:gap-10 lg:py-0 xl:max-w-[30rem]">
        <div>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl xl:text-[3.375rem]">
            {headline}
          </h1>
          {/* `pre-line` keeps the copy's own sentence break; `pretty` stops the sentence
              either side of it from ending on a stranded word. */}
          {subheadline && (
            <p className="mt-6 max-w-[38ch] text-base leading-relaxed whitespace-pre-line text-pretty text-foreground/70 sm:text-lg">
              {subheadline}
            </p>
          )}
        </div>

        {meta && meta.length > 0 && (
          <dl className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {meta.map((item) => (
              <div key={item.label} className="py-4 sm:px-5 sm:py-5 sm:first:pl-0 sm:last:pr-0">
                <MonoLabel as="dt">{item.label}</MonoLabel>
                {/* Balanced, not ragged: these cells are narrow enough that the default wrap
                    leaves the last word alone on its own line. */}
                <dd>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-2 inline-block rounded-sm text-sm font-medium text-balance text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="mt-2 block text-sm font-medium text-balance text-foreground">
                      {item.value}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>

    {/* One instance, two behaviours — rendering the media twice would load it twice. The 53%
        seam gives the lighter half slightly more width, since dark reads heavier at equal area. */}
    <div className="relative h-60 w-full sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[53%] lg:h-auto lg:w-auto">
      {media}
    </div>
  </section>
);
