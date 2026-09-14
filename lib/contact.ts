/**
 * The sector an enquiry is about. Three options despite the repositioning naming exactly two
 * segments: an enquiry that does not self-classify is still worth reading, and a select with
 * no way out gets a wrong answer.
 *
 * This lives here rather than beside the Zod schema because `config/` builds links against it
 * and must not reach up into `app/` to do so.
 */
export const SECTOR_OPTIONS = ["retail", "logistics", "other"] as const;

export type SectorOption = (typeof SECTOR_OPTIONS)[number];

/** Read by the contact page to preselect the sector field. */
export const CONTACT_SECTOR_PARAM = "sector";

/** The enquiry itself, so a link from a sector page or a case study lands on the form rather
 *  than at the top of the contact hero. */
export const CONTACT_FORM_ANCHOR = "enquiry";

/**
 * Narrows whatever arrived in the query string to a sector the form actually offers. Anything
 * else — a stale link, a hand-edited URL — resolves to `undefined` and the form opens blank,
 * so the param can never put a value in the field that the select does not contain.
 */
export const resolveSectorParam = (
  value: string | string[] | undefined,
): SectorOption | undefined =>
  typeof value === "string" && (SECTOR_OPTIONS as readonly string[]).includes(value)
    ? (value as SectorOption)
    : undefined;

/**
 * `/contact`, carrying the sector the reader came from so the form opens already answering its
 * own first question, and landing on the enquiry rather than at the top of the contact hero.
 *
 * The fragment alone is enough for that landing on both a fresh load and a client-side
 * navigation — Lenis reads the resulting scroll position rather than overriding it — so there
 * is deliberately no scroll-on-mount effect propping this up.
 */
export const contactHrefForSector = (sector: SectorOption) =>
  `/contact?${CONTACT_SECTOR_PARAM}=${sector}#${CONTACT_FORM_ANCHOR}`;
