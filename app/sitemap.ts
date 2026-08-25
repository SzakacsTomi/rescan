import type { MetadataRoute } from 'next';

import { seoRoutes } from '@/config/routes';
import { routing } from '@/i18n/routing';
import { canonicalUrl } from '@/lib/seo';

/**
 * One entry per locale per route, each carrying the full reciprocal `hreflang` set so the
 * two language versions are declared as alternates rather than as competing duplicates.
 *
 * No `lastModified`: the pages are hand-authored marketing copy with no change history the
 * build can read, and a timestamp that moves on every deploy without the content moving
 * teaches crawlers to ignore the field. Omitting it is better than asserting it wrongly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (path: string) => ({
    ...Object.fromEntries(routing.locales.map((locale) => [locale, canonicalUrl(locale, path)])),
    'x-default': canonicalUrl(routing.defaultLocale, path),
  });

  return seoRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: canonicalUrl(locale, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languages(route.path) },
    })),
  );
}
