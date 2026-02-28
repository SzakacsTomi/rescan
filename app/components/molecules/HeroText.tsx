type HeroTextProps = {
  headline: string;
  subheadline: string;
};

export const HeroText = ({ headline, subheadline }: HeroTextProps) => {
  return (
    <div className="text-center px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
        {headline}
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
        {subheadline}
      </p>
    </div>
  );
};
