import { MediaPlaceholder } from "@/app/components/atoms/MediaPlaceholder";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { Reveal } from "@/app/components/atoms/Reveal";
import { HERO_IMAGE_STRIPE } from "@/config/gradients";

export type AboutHeroFact = {
  label: string;
  value: string;
};

type AboutHeroProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  facts: AboutHeroFact[];
  /** Pending content for the full-width strip under the hero — no image exists yet. */
  image: string;
};

/** The draft-paper ground under the cover sheet — a fine ruling like a survey sheet, plus a
 *  soft brand glow behind the title block. Both sit below the content, which is `relative`. */
const PAPER_RULING =
  "linear-gradient(rgba(20,30,61,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(20,30,61,0.035) 1px, transparent 1px)";
const PAPER_RULING_SIZE = "32px 32px";
const TITLE_BLOCK_GLOW =
  "radial-gradient(ellipse 55% 50% at 85% 18%, rgba(43,99,187,0.14) 0%, rgba(43,99,187,0) 100%)";

export const AboutHero = ({ eyebrow, headline, subheadline, facts, image }: AboutHeroProps) => {
  return (
    <section className="relative flex flex-col overflow-hidden bg-paper lg:min-h-[calc(100svh-4rem)]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: PAPER_RULING, backgroundSize: PAPER_RULING_SIZE }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: TITLE_BLOCK_GLOW }} />

      <div className="relative w-full max-w-shell mx-auto px-6 pt-16 sm:pt-20 lg:flex-1 lg:flex lg:flex-col lg:pl-31.5">
        <div className="grid max-w-page grid-cols-1 items-end gap-12 pb-16 lg:flex-1 lg:items-center lg:grid-cols-[minmax(0,1fr)340px] lg:gap-20">
          <div>
            <div className="flex items-center gap-3.5">
              <span aria-hidden className="h-px w-11 bg-primary/50" />
              <MonoLabel className="text-primary">{eyebrow}</MonoLabel>
            </div>
            <Reveal>
              <h1 className="mt-7 max-w-[22ch] text-4xl font-bold leading-tight tracking-headline text-balance sm:text-5xl lg:leading-hero-tight lg:text-display">
                {headline}
              </h1>
            </Reveal>
            <Reveal>
              <p className="mt-7 max-w-[56ch] text-lead leading-prose text-pretty text-foreground/68">
                {subheadline}
              </p>
            </Reveal>
          </div>

          <dl className="border border-foreground/12 bg-background">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-b border-foreground/12 px-5 py-4 last:border-b-0"
              >
                <dt>
                  <MonoLabel className="text-foreground/45">{fact.label}</MonoLabel>
                </dt>
                <dd className="text-right text-note font-medium">
                  <Pending>{fact.value}</Pending>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <MediaPlaceholder stripe={HERO_IMAGE_STRIPE} className="h-85 border-t border-foreground/12">
          <Pending>{image}</Pending>
        </MediaPlaceholder>
      </div>
    </section>
  );
};
