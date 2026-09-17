import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { routing } from "./i18n/routing";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** Routes dropped when the site narrowed onto retail and logistics. Redirected rather than
 *  deleted so existing links and anything already indexed keep resolving. */
const RETIRED_ROUTES = [
  { from: "/commercial-portfolios", to: "/retail-property-portfolios" },
  { from: "/retail-chains", to: "/retail-property-portfolios" },
  { from: "/industrial-manufacturing", to: "/logistics-warehouses" },
  { from: "/model-production", to: "/" },
  { from: "/why-rescan", to: "/" },
];

/** Paths that were never routes here but that people and old links reach for anyway. The
 *  home page is the one worth catching: `/home` is what a hand-typed URL or a stale menu
 *  entry guesses at, and landing it on the 404 costs a visitor who was asking for the
 *  front page by name. */
const ALIAS_ROUTES = [{ from: "/home", to: "/" }];

/** The site root in a locale is `/en`, not `/en/`: Next redirects a trailing slash away
 *  again under the default `trailingSlash: false`, so composing the path naively sent
 *  every `to: "/"` redirect through two hops instead of one. */
const localeDestination = (locale: string, path: string) =>
  path === "/" ? `/${locale}` : `/${locale}${path}`;

const withLocaleVariants = (routes: ReadonlyArray<{ from: string; to: string }>) =>
  routes.flatMap(({ from, to }) => [
    { source: from, destination: to, permanent: true },
    ...routing.locales.map((locale) => ({
      source: `/${locale}${from}`,
      destination: localeDestination(locale, to),
      permanent: true,
    })),
  ]);

const nextConfig: NextConfig = {
  images: {
    /** 75 is Next's default and what every other image on the site uses. The case-band
     *  lattice asks for 90: its frames crop a landscape photograph into a near-square
     *  cell, so the optimiser is already upscaling, and 75 on top of that shows. The
     *  named-case photograph asks for 100 — it is served untransformed from Cloudinary
     *  so this is the only re-encode it gets, and the slot is small enough to afford it. */
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/daecns4am/**",
      },
    ],
  },
  async redirects() {
    return withLocaleVariants([...RETIRED_ROUTES, ...ALIAS_ROUTES]);
  },
};

export default withNextIntl(nextConfig);
