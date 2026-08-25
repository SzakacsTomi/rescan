import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getSeoRoute, type SeoRouteKey } from '@/config/routes';
import {
  breadcrumbNode,
  graph,
  itemListNode,
  organizationNode,
  serviceNode,
  webPageNode,
  websiteNode,
  type SchemaNode,
} from '@/lib/schema';
import { absoluteUrl, buildPageMetadata, canonicalUrl, ogImagePath } from '@/lib/seo';
import { routing } from './routing';

/**
 * The bridge between the route registry and the message catalogues: `lib/seo` and
 * `lib/schema` stay free of next-intl and only ever see resolved strings, while pages
 * get one call each for their `<head>` and one for their structured data.
 */
export const resolvePageMetadata = async (
  locale: string,
  key: SeoRouteKey,
): Promise<Metadata> => {
  const route = getSeoRoute(key);
  const t = await getTranslations({ locale, namespace: `metadata.pages.${key}` });

  return buildPageMetadata({
    key,
    locale,
    path: route.path,
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    ogAlt: t('ogAlt'),
    absoluteTitle: route.absoluteTitle,
  });
};

type PageJsonLdOptions = {
  /** Names for the ItemList the Projects page adds under its page node. */
  listItems?: string[];
};

export const resolvePageJsonLd = async (
  locale: string,
  key: SeoRouteKey,
  { listItems }: PageJsonLdOptions = {},
) => {
  const route = getSeoRoute(key);
  const [t, tSite, tFooter] = await Promise.all([
    getTranslations({ locale, namespace: `metadata.pages.${key}` }),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'footer' }),
  ]);

  const url = canonicalUrl(locale, route.path);
  const homeUrl = canonicalUrl(locale, '/');
  const homeLabel = await getTranslations({ locale, namespace: 'metadata.pages.home' });

  const crumbs =
    key === 'home'
      ? [{ name: homeLabel('breadcrumb'), url: homeUrl }]
      : [
          { name: homeLabel('breadcrumb'), url: homeUrl },
          { name: t('breadcrumb'), url },
        ];

  const nodes: SchemaNode[] = [
    organizationNode(tSite('description'), tFooter('tagline')),
    websiteNode(locale, tSite('description')),
    webPageNode({
      pageType: route.pageType,
      url,
      name: t('title'),
      description: t('description'),
      locale,
      imageUrl: absoluteUrl(ogImagePath(key, locale)),
    }),
    breadcrumbNode(url, crumbs),
  ];

  if (route.hasServiceSchema) {
    nodes.push(
      serviceNode({
        url,
        name: t('serviceName'),
        serviceType: t('serviceType'),
        description: t('description'),
        audience: t('serviceAudience'),
      }),
    );
  }

  if (listItems?.length) {
    nodes.push(itemListNode(url, listItems));
  }

  return graph(nodes);
};
