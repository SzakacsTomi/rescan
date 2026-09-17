/**
 * Google Analytics 4, wired by hand rather than through `@next/third-parties`, because the
 * tag must not reach the page at all until the reader has accepted the analytics category.
 * `@next/third-parties`' `<GoogleAnalytics>` loads unconditionally, which would let Google
 * see every visitor's IP before consent — the exact thing the self-hosted banner exists to
 * avoid. `CookieBanner` owns the decision; this module owns the wiring.
 *
 * This is Consent Mode v2 in its *basic* form: the signals are declared denied up front and
 * `gtag.js` is only fetched once analytics is granted. Advanced mode (load the tag first,
 * let it send cookieless pings while denied) buys Google's behavioural modelling at the cost
 * of a pre-consent third-party request, which is the trade this site declined.
 */

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** No measurement ID means no analytics cookie, and therefore nothing for a banner to
 *  guard — `CookieBanner` renders nothing at all in that case. */
export const analyticsConfigured = Boolean(MEASUREMENT_ID);

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type ConsentSignal = "granted" | "denied";

/** The four Consent Mode v2 signals. The `ad_*` three are never granted: this site runs no
 *  advertising product, so asserting anything else would misdescribe what it does. */
const consentState = (analytics: ConsentSignal) =>
  ({
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: analytics,
  }) as const;

/**
 * `gtag.js` reads each queued entry as an `arguments` object and ignores an ordinary array,
 * so the arguments object itself has to be what gets pushed — which is why this is a
 * function expression and not an arrow.
 */
const gtag = function () {
  // eslint-disable-next-line prefer-rest-params -- the arguments object is the payload, not a convenience.
  (window.dataLayer ??= []).push(arguments);
} as (...args: unknown[]) => void;

/** Denies every signal before the tag exists, so the first thing `gtag.js` reads on load is
 *  a decision rather than its own permissive defaults. */
export const setDefaultConsent = () => {
  gtag("consent", "default", consentState("denied"));
};

export const updateConsent = (analyticsGranted: boolean) => {
  gtag("consent", "update", consentState(analyticsGranted ? "granted" : "denied"));
};

let scriptRequested = false;

/**
 * Appends `gtag.js` and configures the property. Idempotent: consent callbacks fire on every
 * page load and on every preference change, and the tag must be fetched once.
 *
 * Every link on this site is an App Router navigation, which changes the URL without
 * reloading the tag — GA4's enhanced measurement covers those through its own History API
 * listener (verified: one `page_view` per route, arriving a few seconds after the
 * navigation). Sending a `page_view` event on route change as well counts each one twice.
 */
export const loadGoogleAnalytics = () => {
  if (!MEASUREMENT_ID || scriptRequested) return;
  scriptRequested = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID);
};

