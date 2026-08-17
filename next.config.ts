import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { routing } from "./i18n/routing";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** Routes renamed when the site narrowed onto retail and logistics. Kept so existing
 *  links and anything already indexed keep resolving. */
const RENAMED_ROUTES = [
  { from: "/commercial-portfolios", to: "/retail-chains" },
  { from: "/industrial-manufacturing", to: "/logistics-warehouses" },
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
    return RENAMED_ROUTES.flatMap(({ from, to }) => [
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
