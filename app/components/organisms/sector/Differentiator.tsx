type DifferentiatorProps = {
  headline: string;
  subheadline: string;
};

export const Differentiator = ({ headline, subheadline }: DifferentiatorProps) => {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
          {headline}
        </h2>
        <p className="text-lg text-white/65 leading-relaxed">{subheadline}</p>
      </div>
    </section>
  );
};
