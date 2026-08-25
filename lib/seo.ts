import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import type { SeoRouteKey } from '@/config/routes';

/** Open Graph and Twitter cards are cropped to this. Anything else gets letterboxed by
 *  the networks, which is why the generator and the tags agree on one size. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * Open Graph wants a `language_TERRITORY` tag, not the bare language code the routes and
 * the hreflang annotations use. English is written for a Swedish company's international
 * readers, so it is tagged en_GB rather than en_US.
 */
const OG_LOCALES: Record<string, string> = { en: 'en_GB', sv: 'sv_SE' };

export const ogLocale = (locale: string): string => OG_LOCALES[locale] ?? locale;

/**
 * The pathname a route is served from in a given locale. next-intl runs with the default
 * `localePrefix: 'always'`, so `/` is `/en` and there is no unprefixed variant to
 * canonicalise to.
 */
export const localePath = (locale: string, path: string): string =>
  path === '/' ? `/${locale}` : `/${locale}${path}`;

export const absoluteUrl = (path: string): string =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;

export const canonicalUrl = (locale: string, path: string): string =>
  absoluteUrl(localePath(locale, path));

/** The generated card for a page. Keyed by route rather than by free text so the endpoint
 *  cannot be used to render arbitrary words onto a RESCAN-branded image. */
export const ogImagePath = (key: SeoRouteKey, locale: string): string =>
  `/api/og?page=${key}&locale=${locale}`;

type AlternatesInput = {
  locale: string;
  path: string;
  locales: readonly string[];
  defaultLocale: string;
};

/**
 * Canonical plus a reciprocal hreflang set. `x-default` points at the default locale's
 * real URL rather than at `/`, which only ever answers with a redirect.
 */
export const buildAlternates = ({
  locale,
  path,
  locales,
  defaultLocale,
}: AlternatesInput): NonNullable<Metadata['alternates']> => ({
  canonical: canonicalUrl(locale, path),
  languages: {
    ...Object.fromEntries(locales.map((code) => [code, canonicalUrl(code, path)])),
    'x-default': canonicalUrl(defaultLocale, path),
  },
});

type PageMetadataInput = AlternatesInput & {
  key: SeoRouteKey;
  title: string;
  description: string;
  /** Comma-separated in the catalogue so translators edit one string, not an array. */
  keywords: string;
  ogAlt: string;
  absoluteTitle?: boolean;
};

export const buildPageMetadata = ({
  key,
  locale,
  path,
  locales,
  defaultLocale,
  title,
  description,
  keywords,
  ogAlt,
  absoluteTitle,
}: PageMetadataInput): Metadata => {
  const url = canonicalUrl(locale, path);
  const images = [
    {
      url: ogImagePath(key, locale),
      ...OG_IMAGE_SIZE,
      alt: ogAlt,
      type: 'image/png',
    },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: parseKeywords(keywords),
    alternates: buildAlternates({ locale, path, locales, defaultLocale }),
    openGraph: {
      type: 'website',
      url,
      siteName: siteConfig.brandName,
      title,
      description,
      locale: ogLocale(locale),
      alternateLocale: locales.filter((code) => code !== locale).map(ogLocale),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
};

export const parseKeywords = (keywords: string): string[] =>
  keywords
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
