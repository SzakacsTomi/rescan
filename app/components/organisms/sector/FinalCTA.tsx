import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

type FinalCTAProps = {
  headline: string;
  subheadline?: string;
  cta: string;
  ctaHref: string;
};

export const FinalCTA = ({ headline, subheadline, cta, ctaHref }: FinalCTAProps) => {
  return (
    <section
      className="py-32 px-6"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
          {headline}
        </h2>
        {subheadline && (
          <p className="text-lg text-white/65 leading-relaxed mb-10">{subheadline}</p>
        )}
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 transition-colors"
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
