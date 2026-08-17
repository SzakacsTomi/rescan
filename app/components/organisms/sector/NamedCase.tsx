import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Pending } from "@/app/components/atoms/Pending";
import { Reveal } from "@/app/components/atoms/Reveal";

type NamedCaseProps = {
  label: string;
  headline: string;
  body: string;
  bulletIntro?: string;
  bulletPoints?: string[];
  metric: string;
  metricLabel: string;
  /** The site photograph the brief asks for, still owed by the client. */
  image: string;
  quote?: string;
  quoteAuthor?: string;
};

export const NamedCase = ({ label, headline, body, bulletIntro, bulletPoints, metric, metricLabel, image, quote, quoteAuthor }: NamedCaseProps) => {
  return (
    <section className="py-[120px] px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <MonoLabel className="text-primary">{label}</MonoLabel>
        <div className="mt-9 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-16 lg:gap-[72px] items-start">
          <div>
            <Reveal className="flex items-baseline gap-[18px]">
              <span className="text-[64px] sm:text-[80px] lg:text-[104px] font-bold tracking-[-0.05em] leading-[0.9]">
                {metric}
              </span>
              <p className="max-w-40 text-sm leading-[1.5] text-foreground/50">{metricLabel}</p>
            </Reveal>
            <Reveal>
              <h2 className="mt-10 text-[24px] sm:text-[28px] lg:text-[32px] font-bold tracking-[-0.03em] leading-[1.2]">
                {headline}
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-6 text-[17px] leading-[1.75] text-foreground/65 whitespace-pre-line">{body}</p>
            </Reveal>
            {bulletIntro && bulletPoints && bulletPoints.length > 0 && (
              <div className="mt-7">
                <Reveal>
                  <p className="mb-3 text-[17px] text-foreground/65 leading-relaxed">{bulletIntro}</p>
                </Reveal>
                <div className="flex flex-col">
                  {bulletPoints.map((point, i) => (
                    <Reveal
                      key={point}
                      className="flex items-baseline gap-4 py-3.5 border-t border-border text-base text-foreground/70 leading-relaxed"
                    >
                      <MonoLabel aria-hidden className="text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </MonoLabel>
                      {point}
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-[10px] bg-muted border border-border min-h-[300px] flex items-center justify-center">
              <Pending>{image}</Pending>
            </div>
            {quote && (
              <blockquote className="border-l-2 border-primary pl-6">
                <p className="text-[18px] leading-[1.7] text-foreground/80">&ldquo;{quote}&rdquo;</p>
                {quoteAuthor && (
                  <footer className="mt-3.5">
                    <MonoLabel>{quoteAuthor}</MonoLabel>
                  </footer>
                )}
              </blockquote>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
