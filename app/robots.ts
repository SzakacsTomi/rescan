import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * A deployment that is not the production domain — a preview build, a local run, anything
 * without `NEXT_PUBLIC_SITE_URL` — is closed to crawlers entirely, so a staging copy of the
 * site never competes with the real one in the index while the domain is still moving.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
