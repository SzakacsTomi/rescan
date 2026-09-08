/**
 * The gate follows SITE_PREVIEW_SECRET, so there is one switch instead of two: a
 * deployment that sets a secret is closed behind ComingSoonTemplate and only
 * `?preview=<secret>` gets through, a deployment that sets none is the finished, fully
 * public site. Launching is removing the variable — see proxy.ts.
 */
export const previewSecret = (): string | undefined => process.env.SITE_PREVIEW_SECRET || undefined;

export const isSiteGateEnabled = (): boolean => Boolean(previewSecret());

/** The route the gate redirects everything to — app/[locale]/coming-soon/page.tsx. */
export const COMING_SOON_PATH = "/coming-soon";

/** Set by proxy.ts once a visitor supplies the secret via the query param below, so the
 *  team can keep browsing and testing every real page while the gate is live for
 *  everyone else. Holds a digest of the secret, never a fixed flag: the cookie travels
 *  from the visitor, so any value that does not have to be derived from the secret is a
 *  bypass anyone can forge. */
export const PREVIEW_BYPASS_COOKIE = "rescan_preview";

/** Query param proxy.ts checks against the secret, e.g.
 *  https://rescan.se/?preview=<secret>. */
export const PREVIEW_QUERY_PARAM = "preview";
