import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';

type AboutFocusProps = {
  headline: string;
  /** Second sentence of the title, carried at a lighter weight on its own line. */
  headlineAccent: string;
  /** The positioning: who RESCAN is and what it delivers. */
  body: string;
  recordLabel: string;
  /** The only figures on this page, so they get the section's one accented block. */
  record: string;
  /** What the client gets to keep once the site work is done. */
  aim: string;
};

/**
 * Explicit row placement rather than auto-flow: the prose spans both rows on the right so the
 * headline and the track record stack tightly on the left, while the stacked order below `lg`
 * still reads positioning first and proof last.
 */
export const AboutFocus = ({
  headline,
  headlineAccent,
  body,
  recordLabel,
  record,
  aim,
}: AboutFocusProps) => {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto grid max-w-page items-start gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-11">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <h2 className="text-h2 font-bold leading-heading tracking-tight text-balance sm:text-h1">
            {headline}
            <span className="block text-foreground/35">{headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Reveal>
            <p className="max-w-[56ch] text-lead font-medium leading-prose text-pretty text-foreground/85">
              {body}
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[56ch] text-lead leading-prose text-pretty text-foreground/68">
              {aim}
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-start-1 lg:row-start-2">
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-11 bg-primary/50" />
            <MonoLabel className="text-primary">{recordLabel}</MonoLabel>
          </div>
          <p className="mt-6 max-w-[34ch] text-title-sm leading-title tracking-title text-pretty text-foreground/85">
            {record}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
