import { ArrowRight } from 'lucide-react';
import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { Reveal } from '@/app/components/atoms/Reveal';
import { DEEP_BLUE_GRADIENT } from '@/config/gradients';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

type FinalCTAProps = {
  headline: string;
  subheadline?: string;
  cta: string;
  ctaHref: string;
  /** Overrides the shared headline treatment when a page's design specifies different
   *  metrics — the About Us design sets 52px/1.15/−0.03em against the shared 56px. */
  headlineClassName?: string;
  /** Same escape hatch for the body — the Projects design measures its column at 640px. */
  subheadlineClassName?: string;
  /** The Why RESCAN design opens with a mono question label above the headline. */
  eyebrow?: string;
};

export const FinalCTA = ({
  headline,
  subheadline,
  cta,
  ctaHref,
  headlineClassName,
  subheadlineClassName,
  eyebrow,
}: FinalCTAProps) => {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-10 lg:py-35" style={{ background: DEEP_BLUE_GRADIENT }}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />
      <Reveal className="relative mx-auto max-w-250">
        {eyebrow && (
          <MonoLabel className="tracking-[0.22em] text-[#89b4f5]">{eyebrow}</MonoLabel>
        )}
        <h2
          className={cn(
            'text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[56px]',
            eyebrow && 'mt-7',
            headlineClassName,
          )}
        >
          {headline}
        </h2>
        {subheadline && (
          <p
            className={cn(
              'mt-6 max-w-2xl text-lg leading-relaxed text-white/65',
              subheadlineClassName,
            )}
          >
            {subheadline}
          </p>
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
