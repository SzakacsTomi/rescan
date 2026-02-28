'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations('common');
  const alternateLocale = locale === 'en' ? 'sv' : 'en';

  return (
    <Link
      href="/"
      locale={alternateLocale}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md bg-black/60 border border-white/15 text-white hover:bg-black/40 transition-colors"
    >
      {t('switchLanguage')}
    </Link>
  );
};
