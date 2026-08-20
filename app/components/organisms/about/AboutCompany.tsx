import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';

type AboutCompanyProps = {
  headline: string;
  /** The thesis the work steps expand. */
  lead: string;
  /** The three stages of the work, presented as numbered rows. */
  steps: string[];
  /** The closing positioning statement. */
  positioning: string;
};

export const AboutCompany = ({ headline, lead, steps, positioning }: AboutCompanyProps) => {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <h2 className="max-w-24ch text-h2 font-bold leading-heading tracking-tight sm:text-h1">
            {headline}
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[62ch] text-lead font-medium leading-prose text-foreground/85">
            {lead}
          </p>
        </Reveal>

        <ol className="mt-14 border-t border-foreground/12">
          {steps.map((step, i) => (
            <Reveal as="li" key={step}>
              <div className="flex items-baseline gap-6 border-b border-foreground/12 py-5">
                <MonoLabel aria-hidden className="text-primary">
                  {String(i + 1).padStart(2, '0')}
                </MonoLabel>
                <span className="text-body font-medium leading-body-lg text-foreground/80">
                  {step}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-11 max-w-[62ch] text-body leading-read text-foreground/68">
            {positioning}
          </p>
        </Reveal>
      </div>
    </section>
  );
};