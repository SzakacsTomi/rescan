import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import en from '@/messages/en.json';

/**
 * One manifest for the whole site rather than one per locale: the file convention has no
 * locale segment, so it carries the default-locale copy. Everything a reader actually
 * consumes is translated through the page's own metadata.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: en.metadata.title,
    short_name: siteConfig.brandName,
    description: en.metadata.description,
    lang: routing.defaultLocale,
    start_url: `/${routing.defaultLocale}`,
    scope: '/',
    display: 'standalone',
    theme_color: siteConfig.themeColor,
    background_color: siteConfig.backgroundColor,
    categories: ['business', 'productivity'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
    ],
  };
}
