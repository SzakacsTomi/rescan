"use client";

import { showPreferences } from "vanilla-cookieconsent";

import { analyticsConfigured } from "@/lib/analytics";

type CookiePreferencesButtonProps = {
  label: string;
  className?: string;
};

/**
 * Reopens the consent choice. Withdrawing consent has to be as easy as giving it, and the
 * banner is gone once answered — so the footer carries the way back in.
 *
 * Renders nothing when no analytics tag is configured, matching `CookieBanner`: with no
 * banner there is no preference to change.
 */
export const CookiePreferencesButton = ({ label, className }: CookiePreferencesButtonProps) => {
  if (!analyticsConfigured) return null;

  return (
    <button type="button" onClick={() => showPreferences()} className={className}>
      {label}
    </button>
  );
};
