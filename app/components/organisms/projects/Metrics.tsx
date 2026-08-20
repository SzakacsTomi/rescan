import { Reveal } from "@/app/components/atoms/Reveal";
import { CountUp } from "@/app/components/molecules/CountUp";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";

type MetricItem = {
  value: string;
  label: string;
};

type MetricsProps = {
  headline: string;
  items: MetricItem[];
};

/** Same dark band the Home/Why RESCAN proof bar and every full-width CTA sit on, so the
 *  scale figures read as proof rather than a stray row of numbers under the section above. */
export const Metrics = ({ headline, items }: MetricsProps) => {
  return (
    <section
      className="px-6 py-24 sm:px-8 lg:px-10 lg:py-28"
      style={{ background: DEEP_BLUE_GRADIENT }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-140 text-title-lg font-bold leading-heading tracking-tight text-balance text-white sm:text-4xl">
            {headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-y-12 gap-x-10 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {items.map((item) => (
            <Reveal key={item.label} className="flex flex-col gap-3 lg:pl-10 lg:first:pl-0">
              <CountUp
                value={item.value}
                className="text-4xl font-bold tracking-numeral text-white sm:text-5xl lg:text-display-2xs"
              />
              <span className="text-sm leading-caption text-balance text-white/55">{item.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
