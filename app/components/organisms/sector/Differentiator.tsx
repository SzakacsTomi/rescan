import { Reveal } from "@/app/components/atoms/Reveal";

type DifferentiatorProps = {
  headline: string;
  subheadline: string;
};

export const Differentiator = ({ headline, subheadline }: DifferentiatorProps) => {
  return (
    <section
      className="py-[132px] px-10"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 52%, #0f3460 100%)' }}
    >
      <div className="max-w-[1000px] mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.035em] leading-[1.1]">
            {headline}
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-7 max-w-[760px] mx-auto text-[18px] leading-[1.75] text-white/62">
            {subheadline}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
