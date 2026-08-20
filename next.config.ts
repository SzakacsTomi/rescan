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
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/daecns4am/**",
      },
    ],
  },
  async redirects() {
    return RETIRED_ROUTES.flatMap(({ from, to }) => [
      { source: from, destination: to, permanent: true },
      ...routing.locales.map((locale) => ({
        source: `/${locale}${from}`,
        destination: `/${locale}${to}`,
        permanent: true,
      })),
    ]);
  },
};

export default withNextIntl(nextConfig);
