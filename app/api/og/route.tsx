import { ImageResponse } from 'next/og';

import { seoRoutes, type SeoRouteKey } from '@/config/routes';
import { DEEP_BLUE_GRADIENT } from '@/config/gradients';
import { siteConfig } from '@/config/site';
import { OG_IMAGE_SIZE } from '@/lib/seo';
import { routing } from '@/i18n/routing';

/**
 * The social card for a page, drawn from the same catalogue the page's `<title>` comes
 * from. It takes a route key rather than free text on purpose: an endpoint that renders
 * whatever string a caller passes onto a RESCAN-branded image is a defacement vector,
 * and every card the site actually needs is one of these seven.
 */
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const isRouteKey = (value: string | null): value is SeoRouteKey =>
  seoRoutes.some((route) => route.key === value);

const isLocale = (value: string | null): value is (typeof routing.locales)[number] =>
  routing.locales.includes(value as (typeof routing.locales)[number]);

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const pageParam = params.get('page');
  const localeParam = params.get('locale');

  // A card is shared once and then re-fetched for years; an unknown key means an old link,
  // which should still render the brand rather than an error image.
  const page: SeoRouteKey = isRouteKey(pageParam) ? pageParam : 'home';
  const locale = isLocale(localeParam) ? localeParam : routing.defaultLocale;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const copy = messages.metadata.pages[page];
  const tagline: string = messages.footer.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: DEEP_BLUE_GRADIENT,
          padding: '80px',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#89b4f5',
            }}
          >
            {copy.breadcrumb}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 66,
              lineHeight: 1.1,
              fontWeight: 700,
              maxWidth: 960,
            }}
          >
            {copy.title}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 1, width: '100%', background: 'rgba(255,255,255,0.22)' }} />
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '0.12em' }}>
              {siteConfig.brandName}
            </div>
            <div
              style={{
                fontSize: 24,
                maxWidth: 620,
                textAlign: 'right',
                color: 'rgba(255,255,255,0.72)',
              }}
            >
              {tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      headers: {
        'Cache-Control': `public, max-age=${ONE_YEAR_SECONDS}, immutable`,
      },
    },
  );
}
