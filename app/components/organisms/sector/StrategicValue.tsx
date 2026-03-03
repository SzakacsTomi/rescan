import { ValueCard } from "@/app/components/molecules/ValueCard";

type ValueItem = {
  title: string;
  description: string;
};

type StrategicValueProps = {
  headline: string;
  values: ValueItem[];
};

export const StrategicValue = ({ headline, values }: StrategicValueProps) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12">{headline}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4">
            {values.map((value) => (
              <ValueCard key={value.title} title={value.title} description={value.description} />
            ))}
          </div>
          <div className="rounded-xl bg-muted border border-border min-h-64 h-full flex items-center justify-center">
            <p className="text-xs text-foreground/30 font-semibold tracking-widest uppercase">
              Visual / Diagram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
