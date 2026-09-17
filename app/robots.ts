import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * Answer engines and the crawlers that feed them, named explicitly. `User-agent: *` already
 * permits every one of these, so the list changes nothing a crawler does — it makes the
 * decision legible instead of accidental. RESCAN sells to project teams who increasingly
 * ask an assistant before they ask a supplier, so being quotable is worth more here than
 * withholding the copy: these are the agents allowed to read it and ground an answer in it.
 *
 * `Google-Extended` and `Applebot-Extended` are the two that govern training and grounding
 * rather than crawling, and are the ones to remove first if the client ever decides their
 * copy should not train a model.
 */
const ANSWER_ENGINE_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'DuckAssistBot',
  'Amazonbot',
  'CCBot',
];

/**
 * A deployment that is not the production domain — a preview build, a local run, anything
 * without `NEXT_PUBLIC_SITE_URL` — is closed to crawlers entirely, so a staging copy of the
 * site never competes with the real one in the index while the domain is still moving.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  // `/api/og` is the one endpoint under `/api` that is meant to be fetched: it is the image
  // every social card and `primaryImageOfPage` points at. The longer, more specific Allow
  // wins over the Disallow above it, which is what keeps the rest of `/api` out.
  const allow = ['/', '/api/og'];
  const disallow = '/api/';

  return {
    rules: [
      { userAgent: '*', allow, disallow },
      { userAgent: ANSWER_ENGINE_AGENTS, allow, disallow },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
