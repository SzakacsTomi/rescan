import { Reveal } from "@/app/components/atoms/Reveal";
import { NumberedValueCard } from "@/app/components/molecules/NumberedValueCard";
import { ValueCard } from "@/app/components/molecules/ValueCard";

type ValueItem = {
  title: string;
  description: string;
};

type StrategicValueProps = {
  headline: string;
  body?: string;
  values: ValueItem[];
  /** `"grid"` is the redesign's numbered-card treatment, on a tinted section
   *  background. Omit for the original stacked-card list. */
  layout?: "grid";
};

export const StrategicValue = ({ headline, body, values, layout }: StrategicValueProps) => {
  if (layout === "grid") {
    return (
      <section className="bg-muted py-[120px] px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="max-w-[720px] text-[28px] leading-tight font-bold tracking-[-0.03em] sm:text-[32px] lg:text-[38px]">
              {headline}
            </h2>
          </Reveal>
          {body && (
            <Reveal>
              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.7] text-foreground/60">{body}</p>
            </Reveal>
          )}
          <div className="grid grid-cols-1 gap-px bg-border mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <NumberedValueCard
                key={value.title}
                index={i}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{headline}</h2>
        {body && (
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mt-4">{body}</p>
        )}
        <div className="mt-12 flex flex-col gap-4">
          {values.map((value) => (
            <ValueCard key={value.title} title={value.title} description={value.description} />
          ))}
        </div>
      </div>
    </section>
  );
};
