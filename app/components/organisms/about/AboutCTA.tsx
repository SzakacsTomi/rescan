import { ArrowRight } from 'lucide-react';
import { DEEP_BLUE_GRADIENT } from '@/config/gradients';
import { Link } from '@/i18n/navigation';

type AboutCTAProps = {
  headline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const AboutCTA = ({ headline, primaryCta, secondaryCta }: AboutCTAProps) => {
  return (
    <section
      className="py-32 px-6"
      style={{ background: DEEP_BLUE_GRADIENT }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-10">
          {headline}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-white/25 text-white font-semibold tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
};
