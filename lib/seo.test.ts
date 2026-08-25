import { describe, expect, it } from 'vitest';

import { seoRoutes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { buildAlternates, canonicalUrl, localePath, ogImagePath, parseKeywords } from '@/lib/seo';
import en from '@/messages/en.json';
import sv from '@/messages/sv.json';

const LOCALES = ['en', 'sv'] as const;

describe('canonical URLs', () => {
  it('prefixes the default locale rather than leaving the home page unprefixed', () => {
    expect(localePath('en', '/')).toBe('/en');
    expect(localePath('sv', '/contact')).toBe('/sv/contact');
  });

  it('builds absolute URLs from the configured origin', () => {
    expect(canonicalUrl('sv', '/projects')).toBe(`${siteConfig.url}/sv/projects`);
  });
});

describe('hreflang', () => {
  it('declares every locale plus an x-default pointing at a real URL', () => {
    const alternates = buildAlternates({
      locale: 'sv',
      path: '/about',
      locales: LOCALES,
      defaultLocale: 'en',
    });

    expect(alternates.canonical).toBe(`${siteConfig.url}/sv/about`);
    expect(alternates.languages).toEqual({
      en: `${siteConfig.url}/en/about`,
      sv: `${siteConfig.url}/sv/about`,
      'x-default': `${siteConfig.url}/en/about`,
    });
  });
});

describe('keywords', () => {
  it('splits the catalogue string and drops empty entries', () => {
    expect(parseKeywords('one, two ,, three ')).toEqual(['one', 'two', 'three']);
  });
});

describe('the route registry', () => {
  it.each(seoRoutes)('$key has title, description, keywords and breadcrumb in both catalogues', (route) => {
    for (const catalogue of [en, sv]) {
      const page = (catalogue.metadata.pages as Record<string, Record<string, string>>)[route.key];
      expect(page).toBeDefined();
      for (const field of ['title', 'description', 'keywords', 'breadcrumb', 'ogAlt']) {
        expect(page[field]?.length ?? 0).toBeGreaterThan(0);
      }
      if (route.hasServiceSchema) {
        for (const field of ['serviceName', 'serviceType', 'serviceAudience']) {
          expect(page[field]?.length ?? 0).toBeGreaterThan(0);
        }
      }
    }
  });

  it('gives every route a distinct path and a card the OG endpoint accepts', () => {
    const paths = seoRoutes.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(ogImagePath('contact', 'sv')).toBe('/api/og?page=contact&locale=sv');
  });
});
