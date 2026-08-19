import { Check, X } from "lucide-react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { cn } from "@/lib/utils";

type FitGroup = {
  title: string;
  items: string[];
};

type FitNotFitProps = {
  headline: string;
  bestFit: FitGroup;
  notFit: FitGroup;
};

const SECTION_BG = "#020409";
const FIT_ACCENT_CLASS = "text-[#7ee2b8]";

export const FitNotFit = ({ headline, bestFit, notFit }: FitNotFitProps) => {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-28" style={{ background: SECTION_BG }}>
      <div className="mx-auto max-w-310">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {headline}
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <MonoLabel className={cn("border-b border-white/20 pb-5", FIT_ACCENT_CLASS)}>
              {bestFit.title}
            </MonoLabel>
            <ul className="flex flex-col pt-4">
              {bestFit.items.map((item) => (
                <Reveal
                  as="li"
                  key={item}
                  className="flex gap-4 border-b border-white/8 py-5 text-[17px] leading-snug text-white/82"
                >
                  <Check
                    className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", FIT_ACCENT_CLASS)}
                    strokeWidth={2.5}
                  />
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <MonoLabel className="border-b border-white/20 pb-5 text-white/45">
              {notFit.title}
            </MonoLabel>
            <ul className="flex flex-col pt-4">
              {notFit.items.map((item) => (
                <Reveal
                  as="li"
                  key={item}
                  className="flex gap-4 border-b border-white/8 py-5 text-[17px] leading-snug text-white/40"
                >
                  <X className="mt-0.5 h-4.5 w-4.5 shrink-0 text-white/35" strokeWidth={2.5} />
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
