/**
 * Gates every public route behind the full-page ComingSoonTemplate while the
 * repositioning is unfinished — see AGENTS.md and proxy.ts. Flip to `false` once the
 * `[[TODO]]` placeholders `yarn todos` reports are resolved.
 */
export const SITE_GATE_ENABLED = true;

/** The route the gate redirects everything to — app/[locale]/coming-soon/page.tsx. */
export const COMING_SOON_PATH = "/coming-soon";

/** Set by proxy.ts once a visitor supplies SITE_PREVIEW_SECRET via the query param
 *  below, so the team can keep browsing and testing every real page while the gate is
 *  live for everyone else. */
export const PREVIEW_BYPASS_COOKIE = "rescan_preview";

/** Query param proxy.ts checks against process.env.SITE_PREVIEW_SECRET, e.g.
 *  https://rescan.se/?preview=<secret>. */
export const PREVIEW_QUERY_PARAM = "preview";
