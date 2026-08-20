import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";

export type AboutPresenceItem = {
  label: string;
  value: string;
  coordinates?: string;
};

type AboutPresenceProps = {
  items: AboutPresenceItem[];
};

export const AboutPresence = ({ items }: AboutPresenceProps) => {
  return (
    <section className="bg-ink px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-px bg-white/12 md:grid-cols-2">
        {items.map((item) => (
          <Reveal
            key={item.label}
            className="flex flex-col justify-between gap-6 bg-ink px-6 py-5 lg:px-10 lg:py-2 lg:first:pl-0 lg:last:pr-0"
          >
            <MonoLabel className="text-white/40">{item.label}</MonoLabel>
            <p className="text-subhead font-semibold leading-snug tracking-snug text-white">
              {item.value}
            </p>
            {item.coordinates && (
              <MonoLabel className="text-micro tracking-widest text-white/45 normal-case">
                {item.coordinates}
              </MonoLabel>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
};
