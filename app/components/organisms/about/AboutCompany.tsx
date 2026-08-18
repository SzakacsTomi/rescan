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
          <h2 className="max-w-24ch text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[38px]">
            {headline}
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-[62ch] text-[19px] font-medium leading-[1.7] text-foreground/85">
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
                <span className="text-[17px] font-medium leading-[1.6] text-foreground/80">
                  {step}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-11 max-w-[62ch] text-[17px] leading-[1.8] text-foreground/68">
            {positioning}
          </p>
        </Reveal>
      </div>
    </section>
  );
};