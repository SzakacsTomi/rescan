"use client";

import CountUp from "react-countup";

type MetricItem = {
  value: string;
  label: string;
};

type MetricsProps = {
  items: MetricItem[];
};

function parseValue(raw: string): { end: number; suffix: string; decimals: number } {
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return { end: 0, suffix: raw, decimals: 0 };
  const end = parseFloat(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { end, suffix: match[2], decimals };
}

export const Metrics = ({ items }: MetricsProps) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((item) => {
          const { end, suffix, decimals } = parseValue(item.value);
          return (
            <div key={item.label} className="flex flex-col gap-2">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                <CountUp
                  end={end}
                  suffix={suffix}
                  decimals={decimals}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </span>
              <span className="text-sm text-foreground/50 leading-snug">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
