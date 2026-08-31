import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { getMessages, getTranslations } from 'next-intl/server';
import { AppShell } from '@/app/components/AppShell';
import { siteConfig, siteViewport } from '@/config/site';
import { ogLocale } from '@/lib/seo';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = siteViewport;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    // Every relative URL below this point — canonicals, hreflang, Open Graph images —
    // resolves against this, which is why the domain lives in one env var.
    metadataBase: new URL(siteConfig.url),
    // Pages author a brand-free title and inherit the suffix; Home overrides with an
    // absolute one because its own title already names the company.
    title: {
      default: t('title'),
      template: `%s — ${siteConfig.brandName}`,
    },
    description: t('description'),
    applicationName: siteConfig.brandName,
    authors: [{ name: siteConfig.brandName, url: `${siteConfig.url}/` }],
    creator: siteConfig.brandName,
    publisher: siteConfig.brandName,
    category: 'business',
    referrer: 'origin-when-cross-origin',
    robots: siteConfig.indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: 'website',
      siteName: siteConfig.brandName,
      title: t('title'),
      description: t('description'),
      locale: ogLocale(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    verification: {
      ...(siteConfig.verification.google ? { google: siteConfig.verification.google } : {}),
      ...(siteConfig.verification.bing ? { other: { 'msvalidate.01': siteConfig.verification.bing } } : {}),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <AppShell locale={locale} messages={messages}>
      {children}
    </AppShell>
  );
}
