import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";

type AboutHeroProps = {
  eyebrow: string;
  headline: string;
  /** Second sentence of the title, carried at a lighter weight on its own line. */
  headlineAccent: string;
  subheadline: string;
};

/** The draft-paper ground under the cover sheet — a fine ruling like a survey sheet, plus a
 *  soft brand glow set opposite the copy so the open half of the sheet still carries weight. */
const PAPER_RULING =
  "linear-gradient(rgba(20,30,61,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(20,30,61,0.035) 1px, transparent 1px)";
const PAPER_RULING_SIZE = "32px 32px";
const SHEET_GLOW =
  "radial-gradient(ellipse 55% 50% at 85% 18%, rgba(43,99,187,0.14) 0%, rgba(43,99,187,0) 100%)";

export const AboutHero = ({
  eyebrow,
  headline,
  headlineAccent,
  subheadline,
}: AboutHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: PAPER_RULING, backgroundSize: PAPER_RULING_SIZE }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: SHEET_GLOW }} />

      <div className="relative mx-auto w-full max-w-shell px-6 pt-20 pb-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-28 lg:pb-28 lg:pl-31.5">
        <div className="max-w-page">
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-11 bg-primary/50" />
            <MonoLabel className="text-primary">{eyebrow}</MonoLabel>
          </div>
          <Reveal>
            {/* Each sentence is its own line, so the h1 carries no measure — a `max-w` here
                would wrap the lines the copy already breaks. */}
            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-headline sm:text-5xl lg:leading-hero-tight lg:text-display-2xs">
              {headline}
              <span className="block text-foreground/35">{headlineAccent}</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-7 max-w-[62ch] text-lead leading-prose text-pretty text-foreground/68">
              {subheadline}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
