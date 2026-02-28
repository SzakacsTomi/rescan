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
      className="text-sm font-medium tracking-widest uppercase hover:opacity-60 transition-opacity"
    >
      {t('switchLanguage')}
    </Link>
  );
};
