import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Stagger } from "@/app/components/atoms/Stagger";
import { cn } from "@/lib/utils";

type SequenceStep = {
  title: string;
  question: string;
};

type CaseStudySequenceProps = {
  eyebrow: string;
  headline: string;
  body: string;
  steps: SequenceStep[];
};

export const SEQUENCE_ID = "sequence";

/** The last two steps are the ones that carry the commercial argument, so the design
 *  brings them forward: RESCAN outlined in the accent, the outcome filled with it. */
const ACCENTED_FROM = 3;

/** Half the 31px marker, so the connector rule runs through the centre of the row. */
const CONNECTOR_OFFSET = "top-3.75";

export const CaseStudySequence = ({
  eyebrow,
  headline,
  body,
  steps,
}: CaseStudySequenceProps) => {
  const lastIndex = steps.length - 1;

  return (
    <section
      id={SEQUENCE_ID}
      className="scroll-mt-16 px-6 py-24 sm:px-8 lg:px-10 lg:py-30"
    >
      <div className="mx-auto max-w-350">
        <Reveal>
          <MonoLabel className="text-foreground/40">{eyebrow}</MonoLabel>
          <h2 className="mt-6 max-w-225 text-[32px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[38px] lg:text-[44px]">
            {headline}
          </h2>
          <p className="mt-5 max-w-190 text-[17px] leading-[1.7] text-foreground/60 lg:text-[19px]">
            {body}
          </p>
        </Reveal>

        <div className="relative mt-14 lg:mt-22">
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-[15px] hidden h-px bg-foreground/18 lg:block",
              CONNECTOR_OFFSET,
            )}
          />
          <Stagger
            as="ul"
            className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-2"
          >
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex max-w-52.5 flex-col items-start gap-5"
              >
                <MonoLabel
                  className={cn(
                    "flex size-7.75 items-center justify-center rounded-full border text-[11px] tracking-normal",
                    i === lastIndex
                      ? "border-primary bg-primary text-white"
                      : i >= ACCENTED_FROM
                        ? "border-primary bg-primary/8 text-primary"
                        : "border-foreground/28 bg-background text-foreground/50",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </MonoLabel>
                <div>
                  <h3
                    className={cn(
                      "text-[17px] font-semibold tracking-[-0.02em]",
                      i >= ACCENTED_FROM ? "text-foreground" : "text-foreground/80",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-[1.6]",
                      i >= ACCENTED_FROM ? "text-foreground/62" : "text-foreground/55",
                    )}
                  >
                    {step.question}
                  </p>
                </div>
              </li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};
