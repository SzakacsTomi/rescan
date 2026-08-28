import { Reveal } from "@/app/components/atoms/Reveal";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";

type DifferentiatorProps = {
  headline: string;
  subheadline: string;
  /** Closing beat under the body, kept as its own paragraph because the brief writes it
   *  as two short lines rather than a continuation of the sentence above. */
  note?: string;
};

export const Differentiator = ({ headline, subheadline, note }: DifferentiatorProps) => {
  return (
    <section
      className="py-[132px] px-10"
      style={{ background: DEEP_BLUE_GRADIENT }}
    >
      <div className="max-w-cta mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-display-2xs font-bold text-white tracking-headline leading-headline text-balance">
            {headline}
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-7 max-w-[760px] mx-auto text-body-lg leading-loose text-pretty text-white/62">
            {subheadline}
          </p>
        </Reveal>
        {note && (
          <Reveal>
            <p className="mt-7 max-w-[760px] mx-auto text-body-lg leading-loose text-pretty whitespace-pre-line text-white/62">
              {note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
