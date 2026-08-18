import type { ReactNode } from "react";

import { Reveal } from "@/app/components/atoms/Reveal";

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
    <section className="bg-muted px-6 py-24 sm:px-8 lg:px-10 lg:py-30">
      <div className="mx-auto max-w-350">
        <Reveal>
          <h2 className="max-w-190 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-[38px]">
            {headline}
          </h2>
          {body && (
            <p className="mt-5 max-w-170 text-[17px] leading-[1.7] text-foreground/60">{body}</p>
          )}
        </Reveal>
        <div className="mt-14 lg:mt-18">{children}</div>
        {footnote && (
          <Reveal>
            <p className="mt-11 max-w-160 text-[17px] leading-[1.7] text-foreground/60">
              {footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
