import { Reveal } from '@/app/components/atoms/Reveal';

type AboutFocusProps = {
  headline: string;
  /** The thesis: documenting existing conditions before the next decision. */
  body: string;
  /** The deliberately narrow focus — the two sectors. */
  narrow: string;
};

export const AboutFocus = ({ headline, body, narrow }: AboutFocusProps) => {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto max-w-page">
        <Reveal>
          <h2 className="max-w-[24ch] text-h2 font-bold leading-heading tracking-tight text-balance sm:text-h1">
            {headline}
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[62ch] text-lead font-medium leading-prose text-pretty text-foreground/85">
            {body}
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-5 max-w-[62ch] text-lead leading-prose text-pretty text-foreground/68">
            {narrow}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
