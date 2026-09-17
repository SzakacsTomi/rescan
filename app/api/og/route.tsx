import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

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
 * and every card the site actually needs is one of the six in `seoRoutes`.
 *
 * The card is the home hero compressed to 1200×630 — same gradient, same grid and bloom,
 * same mono eyebrow over a display headline — so a link preview reads as the page it
 * opens rather than as a generic branded rectangle.
 */
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Satori resolves neither our stylesheet nor `oklch()`, so the one brand colour the card
 *  needs beyond the shared gradient is written out in sRGB. It is the exact conversion of
 *  `--color-accent-sky` in `app/globals.css` and has to be re-derived if that token moves. */
const ACCENT_SKY = '#89b4f5';

/** The hero's 88px grid, scaled by the card's width against the 1920px shell it is drawn
 *  on (88 × 1200/1920), so the lattice sits at the density the design draws rather than
 *  at twice it. */
const GRID_CELL_PX = 55;

/** The hero's 126px copy spine at the same scale (126 × 1200/1920 ≈ 79), rounded. */
const CARD_INSET_PX = 80;

/** Satori parses `ttf` fastest and caps the whole route bundle at 500KB, so these are
 *  latin + latin-ext subsets rather than the full families. Read once at module scope:
 *  none of them depends on the request. */
const [montserratRegular, montserratBold, plexMonoMedium] = await Promise.all([
  readFile(join(process.cwd(), 'assets/fonts/Montserrat-Regular.ttf')),
  readFile(join(process.cwd(), 'assets/fonts/Montserrat-Bold.ttf')),
  readFile(join(process.cwd(), 'assets/fonts/IBMPlexMono-Medium.ttf')),
]);

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
  const location = messages.homePage.hero.location;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          background: DEEP_BLUE_GRADIENT,
          color: '#ffffff',
          fontFamily: 'Montserrat',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: `${GRID_CELL_PX}px ${GRID_CELL_PX}px`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(ellipse 70% 60% at 18% 78%, rgba(43,99,187,0.35) 0%, rgba(43,99,187,0) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: `${CARD_INSET_PX}px`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 2, background: ACCENT_SKY }} />
              <div
                style={{
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 21,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ACCENT_SKY,
                }}
              >
                {copy.breadcrumb}
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                maxWidth: 880,
              }}
            >
              {copy.title}
            </div>

            <div
              style={{
                marginTop: 32,
                fontSize: 25,
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: 780,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {tagline}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 1, width: '100%', background: 'rgba(255,255,255,0.1)' }} />
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '0.12em' }}>
                {siteConfig.brandName}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 8,
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 17,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                <div>{location.city}</div>
                <div>{location.coordinates}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: 'Montserrat', data: montserratRegular, weight: 400, style: 'normal' },
        { name: 'Montserrat', data: montserratBold, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: plexMonoMedium, weight: 500, style: 'normal' },
      ],
      headers: {
        'Cache-Control': `public, max-age=${ONE_YEAR_SECONDS}, immutable`,
      },
    },
  );
}
