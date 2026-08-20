import type { ReactNode } from "react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { cn } from "@/lib/utils";

export const CORE_RISK_ID = "core-risk";

type CoreRiskProps = {
  /** Not every page that reuses this organism has one — `/why-rescan` doesn't. */
  eyebrow?: string;
  headline: string;
  body: string;
  /** Optional supporting visual, e.g. `ProofGrid`. Without one the copy runs full
   *  width rather than leaving an empty column beside it. */
  aside?: ReactNode;
};

export const CoreRisk = ({ eyebrow, headline, body, aside }: CoreRiskProps) => {
  return (
    <section id={CORE_RISK_ID} className="px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className={cn("mx-auto max-w-measure", aside && "max-w-page")}>
        <div className={cn("grid grid-cols-1 gap-16", aside && "lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20 lg:items-start")}>
          <div>
            {eyebrow && <MonoLabel>{eyebrow}</MonoLabel>}
            <Reveal>
              <h2 className={cn("text-h2 leading-tight font-bold tracking-tight text-balance sm:text-h1 lg:text-h1-lg", eyebrow && "mt-6")}>
                {headline}
              </h2>
            </Reveal>
            <Reveal>
              <p
                className={cn(
                  "mt-8 text-lead leading-loose text-pretty text-foreground/65 whitespace-pre-line",
                  aside && "max-w-165",
                )}
              >
                {body}
              </p>
            </Reveal>
          </div>
          {aside && <Reveal>{aside}</Reveal>}
        </div>
      </div>
    </section>
  );
};
