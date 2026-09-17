import { siteConfig } from '@/config/site';
import type { SeoPageType } from '@/config/routes';
import { isPending } from '@/lib/pending';
import { absoluteUrl } from '@/lib/seo';

/**
 * schema.org nodes, emitted as one `@graph` per page so the organisation and the website
 * are declared once and every other node references them by `@id` instead of repeating
 * them. The `@id`s are absolute and therefore move with the domain, exactly like the
 * canonicals do — nothing here names a host.
 */
export type SchemaNode = Record<string, unknown>;

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;
const LOGO_ID = `${siteConfig.url}/#logo`;

export const organizationNode = (description: string, slogan: string): SchemaNode => ({
  // ProfessionalService is a LocalBusiness, which is an Organization: one node satisfies
  // the company, the office and the service provider without three near-duplicates.
  '@type': 'ProfessionalService',
  '@id': ORGANIZATION_ID,
  name: siteConfig.brandName,
  alternateName: siteConfig.name,
  url: `${siteConfig.url}/`,
  email: siteConfig.email,
  description,
  slogan,
  foundingDate: siteConfig.foundingYear,
  logo: {
    '@type': 'ImageObject',
    '@id': LOGO_ID,
    url: absoluteUrl(siteConfig.logoPath),
    contentUrl: absoluteUrl(siteConfig.logoPath),
    caption: siteConfig.brandName,
  },
  image: { '@id': LOGO_ID },
  address: {
    '@type': 'PostalAddress',
    ...siteConfig.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  areaServed: { '@type': 'Country', name: 'Sweden' },
  knowsLanguage: [...siteConfig.languages],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.email,
    areaServed: siteConfig.address.addressCountry,
    availableLanguage: ['Swedish', 'English'],
  },
  ...(siteConfig.socialProfiles.length > 0 ? { sameAs: [...siteConfig.socialProfiles] } : {}),
});

export const websiteNode = (locale: string, description: string): SchemaNode => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${siteConfig.url}/`,
  name: siteConfig.brandName,
  description,
  inLanguage: locale,
  publisher: { '@id': ORGANIZATION_ID },
});

type WebPageInput = {
  pageType: SeoPageType;
  url: string;
  name: string;
  description: string;
  locale: string;
  imageUrl: string;
  /** Authored, not derived — see `contentReviewed` on the registry row. */
  dateModified?: string;
};

export const webPageNode = ({
  pageType,
  url,
  name,
  description,
  locale,
  imageUrl,
  dateModified,
}: WebPageInput): SchemaNode => ({
  '@type': pageType,
  '@id': `${url}#webpage`,
  url,
  name,
  description,
  inLanguage: locale,
  ...(dateModified ? { dateModified } : {}),
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
  primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl },
  breadcrumb: { '@id': `${url}#breadcrumb` },
});

export const breadcrumbNode = (
  url: string,
  items: Array<{ name: string; url: string }>,
): SchemaNode => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

type ServiceInput = {
  url: string;
  name: string;
  serviceType: string;
  description: string;
  audience: string;
};

export const serviceNode = ({
  url,
  name,
  serviceType,
  description,
  audience,
}: ServiceInput): SchemaNode => ({
  '@type': 'Service',
  '@id': `${url}#service`,
  name,
  serviceType,
  description,
  provider: { '@id': ORGANIZATION_ID },
  areaServed: { '@type': 'Country', name: 'Sweden' },
  audience: { '@type': 'BusinessAudience', name: audience },
  mainEntityOfPage: { '@id': `${url}#webpage` },
});

export type ListEntry = {
  name: string;
  /** `@id` of a node elsewhere in the same graph, where the entry has one of its own. An
   *  entry without it is a bare name, which is all the project index can honestly claim. */
  ref?: string;
};

export const itemListNode = (id: string, entries: ListEntry[]): SchemaNode => ({
  '@type': 'ItemList',
  '@id': id,
  numberOfItems: entries.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: entries.map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: entry.name,
    ...(entry.ref ? { item: { '@id': entry.ref } } : {}),
  })),
});

export type CaseStudyFacts = {
  id: string;
  name: string;
  /** The write-up's opening line. Skipped while it is still a `[[TODO]]` marker. */
  description: string;
  sector: string;
  /** The figures the band prints, as the write-up quotes them: `96,000 m²` / `Facility
   *  captured`. Anything still pending is dropped rather than published as a bracket. */
  stats: Array<{ name: string; value: string }>;
};

/**
 * A written-up case study as its own node, so the figures that carry the site's argument
 * are readable without parsing prose. `additionalProperty` is where schema.org puts facts
 * it has no dedicated term for, which is exactly what a measured area or a delivery time
 * is here.
 */
export const caseStudyNode = (url: string, study: CaseStudyFacts): SchemaNode => {
  const stats = study.stats.filter(({ name, value }) => !isPending(name) && !isPending(value));

  return {
    '@type': 'CreativeWork',
    '@id': `${url}#case-${study.id}`,
    name: study.name,
    headline: study.name,
    ...(isPending(study.description) ? {} : { description: study.description }),
    about: { '@type': 'Thing', name: study.sector },
    creator: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': `${url}#webpage` },
    ...(stats.length > 0
      ? {
          additionalProperty: stats.map(({ name, value }) => ({
            '@type': 'PropertyValue',
            name,
            value,
          })),
        }
      : {}),
  };
};

export const graph = (nodes: SchemaNode[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
