import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ValuePoint = {
  title: string;
  description: string;
};

type InformationValueProps = {
  headline: string;
  points: ValuePoint[];
  cta: {
    label: string;
    href: string;
  };
};

export const InformationValue = ({ headline, points, cta }: InformationValueProps) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight max-w-3xl mb-14">
          {headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {points.map((point) => (
            <div key={point.title} className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg leading-snug">{point.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <Link
          href={cta.href}
          className="mt-14 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
        >
          {cta.label}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
