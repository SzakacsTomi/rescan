import type { ReactNode } from "react";

/**
 * Section wrapper for the Logistics brief's "Assumptions get more expensive as the
 * project moves forward." step sequence. Deliberately thin — the brief says the whole
 * thing has to be understood in seconds, so the chain gets the space and the prose
 * around it stays to one line either side.
 */

type ConsequenceSectionProps = {
  headline: string;
  body?: string;
  footnote?: string;
  children: ReactNode;
};

export const ConsequenceSection = ({
  headline,
  body,
  footnote,
  children,
}: ConsequenceSectionProps) => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-6">
          {headline}
        </h2>
        {body && (
          <p className="text-muted-foreground text-base leading-relaxed text-center mb-12">
            {body}
          </p>
        )}
        {children}
        {footnote && (
          <p className="text-muted-foreground text-base leading-relaxed text-center mt-12">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
};
