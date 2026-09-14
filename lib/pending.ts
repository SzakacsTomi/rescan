/**
 * Content the client still owes us is written into `messages/*.json` as
 * `[[TODO: what we need]]` rather than invented. This is the vocabulary for reading those
 * markers, kept beside the renderer rather than inside it so a marker can never be detected
 * one way and drawn another — `scripts/list-placeholders.mjs` reports on the same shape.
 */
const TODO_PATTERN = /^\s*\[\[TODO:\s*([\s\S]*?)\]\]\s*$/;

/** True when a value carries no content yet — either an unfilled marker, or blank. */
export const isPending = (value: string) => value.trim() === "" || TODO_PATTERN.test(value);

export const pendingHint = (value: string) => value.match(TODO_PATTERN)?.[1]?.trim() ?? "";

export const placeholdersVisible = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";
