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
    <section id={CORE_RISK_ID} className="py-[120px] px-6">
      <div className={cn("mx-auto max-w-3xl", aside && "max-w-5xl")}>
        <div className={cn("grid grid-cols-1 gap-16", aside && "lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20 lg:items-start")}>
          <div>
            {eyebrow && <MonoLabel>{eyebrow}</MonoLabel>}
            <Reveal>
              <h2 className={cn("text-[32px] leading-[1.12] font-bold tracking-[-0.03em] sm:text-[38px] lg:text-[44px]", eyebrow && "mt-6")}>
                {headline}
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-8 max-w-[660px] text-[19px] leading-[1.75] text-foreground/65 whitespace-pre-line">
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
