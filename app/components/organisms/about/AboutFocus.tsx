import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';

export type AboutFocusItem = {
  label: string;
  value: string;
  coordinates?: string;
};

type AboutFocusProps = {
  items: AboutFocusItem[];
};

export const AboutFocus = ({ items }: AboutFocusProps) => {
  return (
    <section className="bg-[#020409] px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-310 grid-cols-1 gap-px bg-white/12 md:grid-cols-3">
        {items.map((item) => (
          <Reveal
            key={item.label}
            className="flex flex-col justify-between gap-6 bg-[#020409] px-6 py-5 lg:px-10 lg:py-2 lg:first:pl-0 lg:last:pr-0"
          >
            <MonoLabel className="text-white/40">{item.label}</MonoLabel>
            <p className="text-[22px] font-semibold leading-[1.35] tracking-[-0.02em] text-white">
              {item.value}
            </p>
            {item.coordinates && (
              <MonoLabel className="text-[12px] tracking-[0.1em] text-white/45 normal-case">
                {item.coordinates}
              </MonoLabel>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
};