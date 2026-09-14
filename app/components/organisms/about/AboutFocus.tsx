import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';

type AboutFocusProps = {
  recordLabel: string;
  /** The only figures on this page, so they get the section's one accented block. */
  record: string;
  /** What the client gets to keep once the site work is done. */
  aim: string;
};

/**
 * The proof half of the About page. The positioning it used to open with now runs in the hero,
 * so this section carries only what the hero does not say: the record, and what it buys.
 */
export const AboutFocus = ({ recordLabel, record, aim }: AboutFocusProps) => {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto grid max-w-page items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-11 bg-primary/50" />
            <MonoLabel className="text-primary">{recordLabel}</MonoLabel>
          </div>
          <p className="mt-6 max-w-[34ch] text-title-sm leading-title tracking-title text-pretty text-foreground/85">
            {record}
          </p>
        </Reveal>

        <Reveal>
          <p className="max-w-[56ch] text-lead leading-prose text-pretty text-foreground/68">
            {aim}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
