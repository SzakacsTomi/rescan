type NamedCaseProps = {
  label: string;
  headline: string;
  body: string;
  metric: string;
  metricLabel: string;
  quote?: string;
  quoteAuthor?: string;
};

export const NamedCase = ({ label, headline, body, metric, metricLabel, quote, quoteAuthor }: NamedCaseProps) => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">{label}</p>
          <div className="mb-8">
            <span className="text-6xl sm:text-7xl font-bold tracking-tight">{metric}</span>
            <p className="text-sm text-foreground/50 mt-2">{metricLabel}</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{headline}</h2>
          <p className="text-foreground/65 leading-relaxed">{body}</p>
          {quote && (
            <blockquote className="mt-8 border-l-2 border-primary pl-6">
              <p className="text-lg italic text-foreground/80 leading-relaxed">&ldquo;{quote}&rdquo;</p>
              {quoteAuthor && (
                <footer className="mt-3 text-sm font-semibold text-foreground/50 tracking-wide">
                  — {quoteAuthor}
                </footer>
              )}
            </blockquote>
          )}
        </div>
        <div className="rounded-xl bg-muted border border-border min-h-72 h-full flex items-center justify-center">
          <p className="text-xs text-foreground/30 font-semibold tracking-widest uppercase">
            Client image
          </p>
        </div>
      </div>
    </section>
  );
};
