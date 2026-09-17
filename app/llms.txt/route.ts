import { seoRoutes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { canonicalUrl } from '@/lib/seo';
import en from '@/messages/en.json';

/**
 * `/llms.txt` — the site in the form an assistant can read in one fetch, rather than by
 * crawling six pages and a JSON-LD graph. Every line comes from the same catalogue and the
 * same route registry the `<title>` tags and the sitemap come from, so it cannot drift from
 * what the pages actually say; the only thing this file adds is the ordering.
 *
 * Default-locale copy, like `app/manifest.ts` and for the same reason: the file convention
 * has no locale segment. The Swedish pages are listed at the end so an assistant answering
 * in Swedish knows they exist.
 *
 * The disqualification is included on purpose. It is in the briefs to improve lead quality,
 * and an assistant that recommends RESCAN for a house extension costs the client the same
 * wasted call that a bad search result does.
 */
const DEFAULT_LOCALE = routing.defaultLocale;

export const dynamic = 'force-static';

export function GET() {
  if (!siteConfig.indexable) {
    return new Response('Not found', { status: 404 });
  }

  const pages = seoRoutes.map((route) => {
    const copy = en.metadata.pages[route.key];
    return `- [${copy.title}](${canonicalUrl(DEFAULT_LOCALE, route.path)}): ${copy.description}`;
  });

  const { bestFit } = en.contactPage;

  const body = [
    `# ${siteConfig.brandName}`,
    '',
    `> ${en.metadata.description}`,
    '',
    en.metadata.pages.about.description,
    '',
    '## Pages',
    '',
    ...pages,
    '',
    '## Best fit',
    '',
    `- ${bestFit.item0}`,
    `- ${bestFit.item1}`,
    `- ${bestFit.item2}`,
    '',
    `${bestFit.disqualifier0} ${bestFit.disqualifier1}`,
    '',
    '## Languages',
    '',
    ...routing.locales.map((locale) => `- ${locale}: ${canonicalUrl(locale, '/')}`),
    '',
    '## Contact',
    '',
    `- ${siteConfig.email}`,
    `- ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}, Sweden`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
