'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { PILL_SPRING_TRANSITION } from '@/lib/motion';
import { cn } from '@/lib/utils';

type LanguageSwitcherProps = {
  variant?: 'light' | 'dark';
};

export const LanguageSwitcher = ({ variant = 'light' }: LanguageSwitcherProps) => {
  const locale = useLocale();
  const t = useTranslations('common');
  const pathname = usePathname();
  const isDark = variant === 'dark';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border p-1',
        isDark ? 'border-white/15 bg-black/60 backdrop-blur-md' : 'border-border/60 bg-secondary/60',
      )}
    >
      {routing.locales.map((optionLocale) => {
        const isActive = optionLocale === locale;

        return (
          <Link
            key={optionLocale}
            href={pathname}
            locale={optionLocale}
            aria-current={isActive ? 'true' : undefined}
            aria-label={isActive ? undefined : t('switchLanguage')}
            className={cn(
              'relative rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors',
              isActive
                ? 'text-primary-foreground'
                : isDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-foreground/55 hover:text-foreground',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={PILL_SPRING_TRANSITION}
              />
            )}
            <span className="relative">{optionLocale}</span>
          </Link>
        );
      })}
    </div>
  );
};
