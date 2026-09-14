import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { PlanDrift } from "@/app/components/molecules/PlanDrift";
import { Reveal } from "@/app/components/atoms/Reveal";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { cn } from "@/lib/utils";

export const CORE_RISK_ID = "core-risk";

export type CoreRiskTone = "plain" | "inverted";

type CoreRiskProps = {
  eyebrow?: string;
  headline: string;
  body?: string;
  /** Retail states its risk by drawing it — the archived plan against the unit as it now
   *  stands — so the only text the diagram needs is its two-line legend. */
  planDrift?: {
    archiveLabel: string;
    actualLabel: string;
  };
  tone?: CoreRiskTone;
};

export const CoreRisk = ({
  eyebrow,
  headline,
  body,
  planDrift,
  tone = "plain",
}: CoreRiskProps) => {
  const inverted = tone === "inverted";

  return (
    <section
      id={CORE_RISK_ID}
      className={cn("px-6 sm:px-8 lg:px-10", inverted ? "py-24 lg:py-28" : "py-24 lg:py-30")}
      style={inverted ? { background: DEEP_BLUE_GRADIENT } : undefined}
    >
      <div
        className={cn(
          "mx-auto",
          planDrift
            ? "grid max-w-page items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16"
            : "max-w-measure",
        )}
      >
        <div className="max-w-measure">
          {eyebrow && (
            <MonoLabel className={cn(inverted && "text-accent-sky")}>{eyebrow}</MonoLabel>
          )}
          <Reveal>
            <h2
              className={cn(
                "text-h2 leading-tight font-bold tracking-tight text-balance sm:text-h1 lg:text-h1-lg",
                eyebrow && "mt-6",
                inverted && "text-white",
              )}
            >
              {headline}
            </h2>
          </Reveal>
          {body && (
            <Reveal>
              <p
                className={cn(
                  "mt-8 text-lead leading-loose text-pretty",
                  inverted ? "text-white/60" : "text-foreground/65",
                )}
              >
                {body}
              </p>
            </Reveal>
          )}
        </div>
        {planDrift && (
          <PlanDrift archiveLabel={planDrift.archiveLabel} actualLabel={planDrift.actualLabel} />
        )}
      </div>
    </section>
  );
};
