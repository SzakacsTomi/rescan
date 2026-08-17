import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/app/components/atoms/Reveal';
import { Link } from '@/i18n/navigation';

type FinalCTAProps = {
  headline: string;
  subheadline?: string;
  cta: string;
  ctaHref: string;
};

const SECTION_GRADIENT = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 52%, #0f3460 100%)';

export const FinalCTA = ({ headline, subheadline, cta, ctaHref }: FinalCTAProps) => {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-10 lg:py-36" style={{ background: SECTION_GRADIENT }}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />
      <Reveal className="relative mx-auto max-w-[900px]">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[52px]">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{subheadline}</p>
        )}
        <Link
          href={ctaHref}
          className="group mt-11 inline-flex items-center gap-3 rounded-md bg-primary px-8 py-4.5 font-semibold text-primary-foreground tracking-wide transition-colors hover:bg-[#3f77cf]"
        >
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
};
