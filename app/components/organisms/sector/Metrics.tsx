"use client";

import CountUp from "react-countup";

import { Reveal } from "@/app/components/atoms/Reveal";

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
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((item) => {
          const { end, suffix, decimals } = parseValue(item.value);
          return (
            <Reveal key={item.label} className="flex flex-col gap-3">
              <span className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.04em] leading-none">
                <CountUp
                  end={end}
                  suffix={suffix}
                  decimals={decimals}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </span>
              <span className="text-sm text-foreground/50 leading-[1.4]">{item.label}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
