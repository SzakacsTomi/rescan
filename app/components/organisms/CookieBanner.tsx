"use client";

import { useEffect } from "react";

import { useLocale, useTranslations } from "next-intl";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

import { legalLinks } from "@/config/footer";
import {
  analyticsConfigured,
  loadGoogleAnalytics,
  setDefaultConsent,
  updateConsent,
} from "@/lib/analytics";

/** The category the Google Analytics tag hangs off. Nothing else is gated. */
const ANALYTICS = "analytics";

/** GA4 writes `_ga` and one `_ga_<stream>` per property, so one prefix covers both.
 *  cookieconsent erases them itself when the reader withdraws the category. */
const GA_COOKIES = [{ name: /^_ga/ }];

/**
 * The language the plugin currently holds its copy in. Module scope, not a ref: a locale
 * switch is a client-side navigation that remounts this component, and a per-instance ref
 * would come back `null` and conclude nothing had been configured yet — leaving the plugin
 * showing the previous language, since `run()` is a no-op once it has run.
 */
let configuredLocale: string | null = null;

/**
 * The consent gate for Google Analytics — see `lib/analytics.ts` for the tag itself.
 *
 * It renders nothing when no measurement ID is configured, which is the honest state for a
 * preview or a local run: with GA absent the only cookies the site sets are `NEXT_LOCALE`
 * (a preference the reader asked for) and Cloudflare's Turnstile cookies on /contact
 * (security), none of which need consent. A banner guarding nothing would cost the hero its
 * first screen for no legal gain.
 */
export const CookieBanner = () => {
  const t = useTranslations("cookieConsent");
  const tLegal = useTranslations("footer.legal");
  const locale = useLocale();

  useEffect(() => {
    if (!analyticsConfigured) return;
    // The plugin holds its copy as a plain object rather than reading it per render, so a
    // language switch is a teardown and a re-run. `reset(false)` keeps the consent cookie,
    // so the reader is not asked twice.
    if (configuredLocale === locale) return;
    if (configuredLocale !== null) CookieConsent.reset(false);
    configuredLocale = locale;

    setDefaultConsent();

    const syncAnalytics = () => {
      const granted = CookieConsent.acceptedCategory(ANALYTICS);
      updateConsent(granted);
      if (granted) loadGoogleAnalytics();
    };

    const policyLinks = legalLinks
      .map(
        (link) =>
          `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${tLegal(
            link.labelKey as "privacy" | "cookies",
          )}</a>`,
      )
      .join("");

    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: "box", position: "bottom right" },
        preferencesModal: { layout: "box" },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        [ANALYTICS]: { autoClear: { cookies: GA_COOKIES } },
      },
      onConsent: syncAnalytics,
      onChange: syncAnalytics,
      // Lenis intercepts the wheel globally and scrolls the document with it, which would
      // leave the preferences modal's own overflow unreachable.
      onModalReady: ({ modal }) => modal.setAttribute("data-lenis-prevent", ""),
      language: {
        default: locale,
        translations: {
          [locale]: {
            consentModal: {
              title: t("banner.title"),
              description: t("banner.description"),
              acceptAllBtn: t("banner.acceptAll"),
              acceptNecessaryBtn: t("banner.reject"),
              showPreferencesBtn: t("banner.managePreferences"),
              footer: policyLinks,
            },
            preferencesModal: {
              title: t("preferences.title"),
              acceptAllBtn: t("banner.acceptAll"),
              acceptNecessaryBtn: t("banner.reject"),
              savePreferencesBtn: t("preferences.save"),
              closeIconLabel: t("preferences.close"),
              sections: [
                {
                  title: t("preferences.necessary.title"),
                  description: t("preferences.necessary.description"),
                  linkedCategory: "necessary",
                },
                {
                  title: t("preferences.analytics.title"),
                  description: t("preferences.analytics.description"),
                  linkedCategory: ANALYTICS,
                },
                {
                  title: t("preferences.policies.title"),
                  // The preferences modal has no footer slot of its own, so the two policy
                  // documents ride in as a closing section rather than being duplicated
                  // into a cookie table the PDFs already carry.
                  description: `${t("preferences.policies.description")} ${policyLinks}`,
                },
              ],
            },
          },
        },
      },
    });
  }, [locale, t, tLegal]);

  return null;
};
