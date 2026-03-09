import { ScrollArrow } from '@/app/components/atoms/ScrollArrow';
import { Link } from '@/i18n/navigation';

export const ABOUT_MISSION_ID = 'about-mission';

type AboutHeroProps = {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const AboutHero = ({ headline, subheadline, primaryCta, secondaryCta }: AboutHeroProps) => {
  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-24"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6 whitespace-pre-line">
          {headline}
        </h1>
        <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-10">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-white/25 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ScrollArrow targetId={ABOUT_MISSION_ID} className="text-white hover:text-white/65" />
      </div>
    </section>
  );
};
