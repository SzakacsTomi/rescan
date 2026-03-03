type CoreRiskProps = {
  headline: string;
  body: string;
};

export const CoreRisk = ({ headline, body }: CoreRiskProps) => {
  return (
    <section id="core-risk" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-8">
          {headline}
        </h2>
        <p className="text-lg text-foreground/65 leading-relaxed">{body}</p>
      </div>
    </section>
  );
};
