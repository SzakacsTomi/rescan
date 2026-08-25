/**
 * Every indexable route, in one list. The sitemap, the canonical and hreflang tags, the
 * breadcrumb trail and the Open Graph image all read from here, so a new page becomes
 * discoverable by adding a row rather than by remembering five separate files.
 *
 * `key` is the sub-key under the `metadata.pages` namespace in both message catalogues —
 * the title, description, keywords and breadcrumb label live there, not here, because
 * they are user-visible text.
 */
export type SeoRouteKey =
  | 'home'
  | 'retail'
  | 'logistics'
  | 'projects'
  | 'whyRescan'
  | 'about'
  | 'contact';

/** schema.org type for the page node. Narrower than WebPage where a narrower one exists,
 *  because Google reads the distinction on contact and about pages. */
export type SeoPageType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';

export type SeoRoute = {
  key: SeoRouteKey;
  /** Locale-independent pathname, exactly as `i18n/navigation`'s `Link` takes it. */
  path: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  pageType: SeoPageType;
  /** Home carries the brand in its own title; every other page gets it from the title
   *  template in the locale layout and must not repeat it. */
  absoluteTitle?: boolean;
  /** The two sector pages describe an offering, so they also emit a schema.org Service
   *  whose name and type come from `metadata.pages.<key>.service*`. */
  hasServiceSchema?: boolean;
};

export const seoRoutes: readonly SeoRoute[] = [
  {
    key: 'home',
    path: '/',
    changeFrequency: 'monthly',
    priority: 1,
    pageType: 'WebPage',
    absoluteTitle: true,
  },
  {
    key: 'retail',
    path: '/retail-property-portfolios',
    changeFrequency: 'monthly',
    priority: 0.9,
    pageType: 'WebPage',
    hasServiceSchema: true,
  },
  {
    key: 'logistics',
    path: '/logistics-warehouses',
    changeFrequency: 'monthly',
    priority: 0.9,
    pageType: 'WebPage',
    hasServiceSchema: true,
  },
  {
    key: 'projects',
    path: '/projects',
    changeFrequency: 'monthly',
    priority: 0.8,
    pageType: 'CollectionPage',
  },
  {
    key: 'whyRescan',
    path: '/why-rescan',
    changeFrequency: 'yearly',
    priority: 0.7,
    pageType: 'WebPage',
  },
  {
    key: 'about',
    path: '/about',
    changeFrequency: 'yearly',
    priority: 0.5,
    pageType: 'AboutPage',
  },
  {
    key: 'contact',
    path: '/contact',
    changeFrequency: 'yearly',
    priority: 0.6,
    pageType: 'ContactPage',
  },
];

const routesByKey = new Map(seoRoutes.map((route) => [route.key, route]));

export const getSeoRoute = (key: SeoRouteKey): SeoRoute => {
  const route = routesByKey.get(key);
  if (!route) throw new Error(`Unknown SEO route: ${key}`);
  return route;
};
