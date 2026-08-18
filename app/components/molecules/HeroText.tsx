import { cn } from "@/lib/utils";

type HeroTextProps = {
  headline: string;
  subheadline: string;
  /** How many of the headline's trailing lines get the accent treatment. */
  accentLineCount?: number;
  /** Overrides the column width. The headline's line breaks are authored, so a hero whose
   *  lines are written long has to be allowed to run wider than the default. */
  className?: string;
  headlineClassName?: string;
  subheadlineClassName?: string;
};

const LINE_REVEAL_STAGGER_SECONDS = 0.12;

export const HeroText = ({
  headline,
  subheadline,
  accentLineCount = 0,
  className,
  headlineClassName,
  subheadlineClassName,
}: HeroTextProps) => {
  const lines = headline.split("\n");
  const accentFromIndex = lines.length - accentLineCount;

  return (
    <div className={cn("max-w-2xl", className)}>
      <h1
        className={cn(
          "text-4xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05]",
          headlineClassName,
        )}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span
              className={cn(
                "animate-hero-rise block opacity-100",
                i >= accentFromIndex ? "text-[#89b4f5]" : "text-white",
              )}
              style={{ animationDelay: `${i * LINE_REVEAL_STAGGER_SECONDS}s` }}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>
      <p
        className={cn(
          "mt-8 text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl",
          subheadlineClassName,
        )}
      >
        {subheadline}
      </p>
    </div>
  );
};
