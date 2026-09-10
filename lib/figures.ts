/**
 * A proof figure is authored as a string ("96,000 m²", "~300 000 m²", "1.8M+"), because
 * the unit and the qualifier around the number are part of the copy. Anything that needs
 * the number itself — the count-up animation, the footprint scale — reads it from here,
 * so one catalogue value can never be counted one way and drawn another.
 *
 * English figures group with a comma, Swedish ones with a space, so both have to survive
 * the round trip through `Number()`.
 */
const GROUP_SEPARATOR = /[,\u00a0\u202f ]/;

export const FIGURE_NUMBER_PATTERN =
  /\d{1,3}(?:[,\u00a0\u202f ]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/;

/** The first number in a figure string, or `null` for a figure that carries none —
 *  a `[[TODO: …]]` marker, or a word-only value like "Editable project files". */
export const parseFigureNumber = (figure: string): number | null => {
  const match = figure.match(FIGURE_NUMBER_PATTERN);
  if (!match) return null;

  return Number(match[0].split(GROUP_SEPARATOR).join(""));
};
