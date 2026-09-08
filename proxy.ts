import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {
  COMING_SOON_PATH,
  PREVIEW_BYPASS_COOKIE,
  PREVIEW_QUERY_PARAM,
  previewSecret,
} from './config/comingSoon';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const BYPASS_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

/** Rotating SITE_PREVIEW_SECRET invalidates every cookie already handed out, because the
 *  value the visitor carries is derived from the secret rather than stored alongside it. */
const bypassToken = async (secret: string): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const isComingSoonPath = (pathname: string): boolean =>
  routing.locales.some((locale) => pathname === `/${locale}${COMING_SOON_PATH}`);

/**
 * Gates every public route behind ComingSoonTemplate whenever SITE_PREVIEW_SECRET is set;
 * with no secret configured there is no gate at all and the real site is public (see
 * config/comingSoon.ts). Runs after next-intl so the redirect target always carries a
 * resolved locale prefix — a bare, unprefixed request is left to next-intl's own redirect
 * and re-enters this function once it comes back locale-prefixed.
 *
 * A request that already resolves to /coming-soon, or that carries the preview bypass
 * (?preview=<SITE_PREVIEW_SECRET>, remembered via a cookie), is left untouched so the
 * real site stays fully reachable and testable.
 */
export default async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const secret = previewSecret();

  if (!secret || response.status >= 300) {
    return response;
  }

  const token = await bypassToken(secret);
  if (request.cookies.get(PREVIEW_BYPASS_COOKIE)?.value === token) {
    return response;
  }

  if (request.nextUrl.searchParams.get(PREVIEW_QUERY_PARAM) === secret) {
    response.cookies.set(PREVIEW_BYPASS_COOKIE, token, {
      maxAge: BYPASS_MAX_AGE_SECONDS,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      // A secure cookie is dropped over plain http, which is how the gate is exercised locally.
      secure: request.nextUrl.protocol === 'https:',
    });
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
