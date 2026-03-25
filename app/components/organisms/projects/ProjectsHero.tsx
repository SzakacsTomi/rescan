type ProjectsHeroProps = {
  headline: string;
  subheadline: string;
};

export const ProjectsHero = ({ headline, subheadline }: ProjectsHeroProps) => {
  return (
    <section className="px-6 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
          {headline}
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          {subheadline}
        </p>
      </div>
    </section>
  );
};
