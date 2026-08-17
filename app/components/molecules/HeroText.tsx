import { cn } from "@/lib/utils";

type HeroTextProps = {
  headline: string;
  subheadline: string;
  /** How many of the headline's trailing lines get the accent treatment. */
  accentLineCount?: number;
};

const LINE_REVEAL_STAGGER_SECONDS = 0.12;

export const HeroText = ({ headline, subheadline, accentLineCount = 0 }: HeroTextProps) => {
  const lines = headline.split("\n");
  const accentFromIndex = lines.length - accentLineCount;

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05]">
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
      <p className="mt-8 text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl">
        {subheadline}
      </p>
    </div>
  );
};
