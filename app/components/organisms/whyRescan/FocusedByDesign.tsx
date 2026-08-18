import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { cn } from "@/lib/utils";

type FocusedByDesignProps = {
  headline: string;
  note: string;
  /** The numbered fit list — the brief's two segments plus their shared use-case. */
  items: string[];
  notFitLabel: string;
  notFitText: string;
};

export const FocusedByDesign = ({
  headline,
  note,
  items,
  notFitLabel,
  notFitText,
}: FocusedByDesignProps) => {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto grid max-w-310 grid-cols-1 items-start gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="text-[32px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[38px]">
              {headline}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-base leading-[1.7] text-foreground/60">{note}</p>
          </Reveal>
        </div>

        <div>
          <ul className="flex flex-col">
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                className={cn(
                  "flex items-baseline gap-5 border-t border-border py-6.5 text-xl font-semibold leading-[1.35] tracking-[-0.02em] lg:text-[22px]",
                  i === items.length - 1 && "border-b",
                )}
              >
                <MonoLabel className="text-primary" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </MonoLabel>
                {item}
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-11 flex flex-wrap items-center gap-8 bg-secondary px-7 py-6">
            <MonoLabel className="text-foreground/45">{notFitLabel}</MonoLabel>
            <p className="m-0 text-[17px] leading-[1.5] text-foreground/55">{notFitText}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};