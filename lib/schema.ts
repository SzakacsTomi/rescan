import { siteConfig } from '@/config/site';
import type { SeoPageType } from '@/config/routes';
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
};

export const webPageNode = ({
  pageType,
  url,
  name,
  description,
  locale,
  imageUrl,
}: WebPageInput): SchemaNode => ({
  '@type': pageType,
  '@id': `${url}#webpage`,
  url,
  name,
  description,
  inLanguage: locale,
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

export const itemListNode = (url: string, names: string[]): SchemaNode => ({
  '@type': 'ItemList',
  '@id': `${url}#projects`,
  numberOfItems: names.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: names.map((name, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
  })),
});

export const graph = (nodes: SchemaNode[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
