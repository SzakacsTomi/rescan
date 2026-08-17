'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations('common');
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-black/60 p-1 backdrop-blur-md">
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
              isActive ? 'text-primary-foreground' : 'text-white/60 hover:text-white'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative">{optionLocale}</span>
          </Link>
        );
      })}
    </div>
  );
};
