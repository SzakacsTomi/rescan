import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {
  COMING_SOON_PATH,
  PREVIEW_BYPASS_COOKIE,
  PREVIEW_QUERY_PARAM,
  SITE_GATE_ENABLED,
} from './config/comingSoon';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const BYPASS_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const hasBypass = (request: NextRequest): boolean => {
  if (request.cookies.get(PREVIEW_BYPASS_COOKIE)?.value === '1') return true;

  const secret = process.env.SITE_PREVIEW_SECRET;
  return Boolean(secret) && request.nextUrl.searchParams.get(PREVIEW_QUERY_PARAM) === secret;
};

const isComingSoonPath = (pathname: string): boolean =>
  routing.locales.some((locale) => pathname === `/${locale}${COMING_SOON_PATH}`);

/**
 * Gates every public route behind ComingSoonTemplate while SITE_GATE_ENABLED is on (see
 * config/comingSoon.ts). Runs after next-intl so the redirect target always carries a
 * resolved locale prefix — a bare, unprefixed request is left to next-intl's own redirect
 * and re-enters this function once it comes back locale-prefixed.
 *
 * A request that already resolves to /coming-soon, or that carries the preview bypass
 * (?preview=<SITE_PREVIEW_SECRET>, remembered via a cookie), is left untouched so the
 * real site stays fully reachable and testable.
 */
export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  if (!SITE_GATE_ENABLED || response.status >= 300) {
    return response;
  }

  if (hasBypass(request)) {
    if (request.cookies.get(PREVIEW_BYPASS_COOKIE)?.value !== '1') {
      response.cookies.set(PREVIEW_BYPASS_COOKIE, '1', {
        maxAge: BYPASS_MAX_AGE_SECONDS,
        httpOnly: true,
        sameSite: 'lax',
      });
    }
    return response;
  }

  const { pathname } = request.nextUrl;
  if (isComingSoonPath(pathname)) {
    return response;
  }

  const locale = pathname.split('/')[1];
  const redirectResponse = NextResponse.redirect(new URL(`/${locale}${COMING_SOON_PATH}`, request.url));
  // Preserve whatever next-intl attached (e.g. its locale-preference cookie) rather than
  // dropping it by returning a bare redirect.
  response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
  return redirectResponse;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
