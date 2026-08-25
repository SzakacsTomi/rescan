/**
 * The origin the site is served from. Deliberately read from the environment and never
 * hardcoded: the production domain is not final, and canonicals, hreflang, the sitemap,
 * robots.txt, the web manifest, every absolute Open Graph URL and every JSON-LD `@id`
 * are derived from this one value. Moving the site to its real domain is a single
 * `NEXT_PUBLIC_SITE_URL` change plus a redeploy — nothing in the source names a host.
 */
const FALLBACK_ORIGIN = 'http://localhost:3000';

const normalizeOrigin = (value: string): string => {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, '');
};

const resolveOrigin = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalizeOrigin(explicit);

  // Vercel exposes the stable production hostname to every deployment, so a preview build
  // still emits canonicals that point at production rather than at its own throwaway URL.
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return normalizeOrigin(vercel);

  return FALLBACK_ORIGIN;
};

const origin = resolveOrigin();

/**
 * Whether crawlers may index this deployment. A preview build or a local run resolves to
 * a non-production origin and must not compete with the real domain in the index — the
 * whole site goes `noindex` and robots.txt disallows everything until a real
 * `NEXT_PUBLIC_SITE_URL` is present and the deployment is the production one.
 */
const resolveIndexable = (): boolean => {
  if (!process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return false;
  }
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (vercelEnv && vercelEnv !== 'production') return false;
  return !origin.startsWith('http://');
};

export const siteConfig = {
  name: 'Rescan',
  /** The brand as the client sets it in copy — all caps. Used wherever a machine reads
   *  the name (schema.org, Open Graph, the manifest), so it matches the on-page brand. */
  brandName: 'RESCAN',
  url: origin,
  indexable: resolveIndexable(),
  email: 'info@rescan.se',
  foundingYear: '2017',
  /** The office, split into the fields schema.org's PostalAddress wants. The prose form
   *  in `contactPage.map.address` is the same office written for a reader; this is the
   *  machine-readable one, which the catalogues have no place to hold. */
  address: {
    streetAddress: 'Rådjursvägen 1',
    postalCode: '352 45',
    addressLocality: 'Växjö',
    addressRegion: 'Kronoberg',
    addressCountry: 'SE',
  },
  geo: { latitude: 56.8777, longitude: 14.7894 },
  /** ISO 639-1, in the order the company works in them. */
  languages: ['sv', 'en'],
  logoPath: '/assets/logo.png',
  /**
   * Verified profiles, emitted as schema.org `sameAs`. Empty on purpose: the hrefs in
   * `config/footer.ts` are placeholders pointing at the networks' front pages, not at
   * RESCAN accounts, and asserting them as the company's profiles would be a false
   * claim to Google. Fill this in once the real profile URLs exist.
   */
  socialProfiles: [] as readonly string[],
  /** Matches the first stop of DEEP_BLUE_GRADIENT, which is what a phone's browser chrome
   *  sits against at the top of every page. */
  themeColor: '#1a1a2e',
  backgroundColor: '#e9ebf2',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  },
} as const;
