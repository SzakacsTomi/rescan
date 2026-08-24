import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Wipe } from "@/app/components/atoms/Wipe";

type WhyItMattersProps = {
  eyebrow: string;
  headline: string;
  body: string;
};

/**
 * The design's two-column statement directly under the case grid. It reuses the grid's
 * left-to-right wipe rather than `Reveal`'s rise, so the page's opening band and its
 * first argument read as one continuous pass across the screen.
 */
export const WhyItMatters = ({ eyebrow, headline, body }: WhyItMattersProps) => {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto grid max-w-page gap-10 lg:grid-cols-[minmax(0,1fr)_26.25rem] lg:gap-20">
        <div>
          <MonoLabel className="text-foreground/40">{eyebrow}</MonoLabel>
          <Wipe as="h2" delay={0.1} className="mt-4 text-h3 font-extrabold leading-heading tracking-tight text-balance lg:text-h1">
            {headline}
          </Wipe>
        </div>
        <Wipe delay={0.3} className="pt-1 lg:pt-9.5">
          <p className="text-body leading-copy text-pretty text-foreground/62 lg:text-lead">{body}</p>
        </Wipe>
      </div>
    </section>
  );
};
