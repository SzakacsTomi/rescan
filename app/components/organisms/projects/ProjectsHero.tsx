import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ProjectsHeroProps = {
  headline: string;
  subheadline: string;
  cta: string;
};

export const ProjectsHero = ({ headline, subheadline, cta }: ProjectsHeroProps) => {
  return (
    <section className="px-6 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
          {headline}
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">{subheadline}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-white/90 transition-colors"
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
