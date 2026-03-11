import { PainPointCard } from "@/app/components/molecules/PainPointCard";
import type { LucideIcon } from "lucide-react";

type FrictionPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type OperationalFrictionProps = {
  headline: string;
  body?: string;
  points: FrictionPoint[];
};

export const OperationalFriction = ({ headline, body, points }: OperationalFrictionProps) => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-center">
          {headline}
        </h2>
        {body && (
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto text-center mb-12 whitespace-pre-line">
            {body}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point) => (
            <PainPointCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
