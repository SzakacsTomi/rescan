import { Reveal } from "@/app/components/atoms/Reveal";
import { CountUp } from "@/app/components/molecules/CountUp";

type MetricItem = {
  value: string;
  label: string;
};

type MetricsProps = {
  items: MetricItem[];
};

export const Metrics = ({ items }: MetricsProps) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((item) => (
          <Reveal key={item.label} className="flex flex-col gap-3">
            <CountUp
              value={item.value}
              className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.04em] leading-none"
            />
            <span className="text-sm text-foreground/50 leading-[1.4]">{item.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
