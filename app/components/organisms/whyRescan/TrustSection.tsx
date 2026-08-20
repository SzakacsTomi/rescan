import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Stagger } from "@/app/components/atoms/Stagger";
import { cn } from "@/lib/utils";

type TrustSectionProps = {
  id: string;
  index: number;
  headline: string;
  body: string;
  proofLabel: string;
  /** One or more evidence lines — some sections carry a single proof, others several. */
  proofs: string[];
  tone?: "background" | "secondary";
};

/**
 * One reason-to-trust from the Why RESCAN brief, drawn as its own full-width section —
 * the brief's final page structure stacks Repeatability, Coverage, Downstream Usefulness
 * and Quality Control individually rather than as a shared grid.
 */
export const TrustSection = ({
  id,
  index,
  headline,
  body,
  proofLabel,
  proofs,
  tone = "background",
}: TrustSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 px-6 py-24 sm:px-8 lg:px-10 lg:py-30",
        tone === "secondary" && "bg-secondary",
      )}
    >
      <div className="mx-auto grid max-w-page grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
        <div>
          <Reveal className="flex items-baseline gap-4">
            <MonoLabel className="text-primary" aria-hidden>
              {String(index).padStart(2, "0")}
            </MonoLabel>
            <h2 className="max-w-[20ch] text-h2 font-bold leading-heading tracking-tight text-balance sm:text-h1">
              {headline}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 max-w-[60ch] text-lead leading-loose whitespace-pre-line text-pretty text-foreground/68">
              {body}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className={cn("px-7 pt-7 pb-2", tone === "secondary" ? "bg-background" : "bg-secondary")}>
            <MonoLabel className="text-foreground/45">{proofLabel}</MonoLabel>
            <Stagger as="ul" className="mt-5 flex flex-col">
              {proofs.map((proof, i) => (
                <li
                  key={proof}
                  className={cn(
                    "border-t border-foreground/10 py-3.5 text-note",
                    i === proofs.length - 1 && "pb-5",
                  )}
                >
                  <Pending className="px-2.5 py-2 text-sm leading-caption">{proof}</Pending>
                </li>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
