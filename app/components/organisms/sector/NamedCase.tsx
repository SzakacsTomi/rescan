type NamedCaseProps = {
  label: string;
  headline: string;
  body: string;
  bulletIntro?: string;
  bulletPoints?: string[];
  metric: string;
  metricLabel: string;
  quote?: string;
  quoteAuthor?: string;
};

export const NamedCase = ({ label, headline, body, bulletIntro, bulletPoints, metric, metricLabel, quote, quoteAuthor }: NamedCaseProps) => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">{label}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-8">
              <span className="text-6xl sm:text-7xl font-bold tracking-tight">{metric}</span>
              <p className="text-sm text-foreground/50 mt-2">{metricLabel}</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{headline}</h2>
            <p className="text-foreground/65 leading-relaxed whitespace-pre-line">{body}</p>
            {bulletIntro && bulletPoints && bulletPoints.length > 0 && (
              <div className="mt-6">
                <p className="text-foreground/65 leading-relaxed mb-3">{bulletIntro}</p>
                <ul className="space-y-1">
                  {bulletPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-foreground/65 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="rounded-xl bg-muted border border-border min-h-72 h-full flex items-center justify-center">
            <p className="text-xs text-foreground/30 font-semibold tracking-widest uppercase">
              Client image
            </p>
          </div>
        </div>
        {quote && (
          <blockquote className="mt-12 border-l-2 border-primary pl-6">
            <p className="text-lg italic text-foreground/80 leading-relaxed">&ldquo;{quote}&rdquo;</p>
            {quoteAuthor && (
              <footer className="mt-3 text-sm font-semibold text-foreground/50 tracking-wide">
                — {quoteAuthor}
              </footer>
            )}
          </blockquote>
        )}
      </div>
    </section>
  );
};
