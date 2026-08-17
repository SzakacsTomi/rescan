import { ArrowRight } from "lucide-react";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { Link } from "@/i18n/navigation";

type ValuePoint = {
  title: string;
  description: string;
};

type InformationValueProps = {
  eyebrow: string;
  headline: string;
  points: ValuePoint[];
  cta: {
    label: string;
    href: string;
  };
};

export const InformationValue = ({ eyebrow, headline, points, cta }: InformationValueProps) => {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <MonoLabel className="text-foreground/40">{eyebrow}</MonoLabel>
          <h2 className="mt-6 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {headline}
          </h2>
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3.5"
          >
            {cta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col">
          {points.map((point, i) => (
            <Reveal
              key={point.title}
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-6 border-t border-border py-8 transition-colors hover:bg-secondary/35 sm:grid-cols-[56px_minmax(0,1fr)]"
            >
              <MonoLabel className="text-primary">{String(i + 1).padStart(2, "0")}</MonoLabel>
              <div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{point.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-base">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
