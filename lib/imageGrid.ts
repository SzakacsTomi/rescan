const SINGLE_ROW_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

/**
 * The grid a folder of this size gets: how many cells each of the three widths carries, and
 * the columns they fall into.
 *
 * Three photographs and under are a single row that never reshapes — two of them split the
 * band evenly rather than one dominating, because a folder of two is a pair and not a lead
 * with a footnote. From four up the grid is two rows that gain a column as the viewport
 * widens, ending on the four-over-three-and-a-tile the design asks for.
 *
 * Every shape fills its rows completely. A grid that ends on one photograph beside two empty
 * cells reads as a bug rather than as a layout, which is why the middle bracket stays on four
 * cells instead of growing into a second row it cannot fill.
 */
export const gridShape = (count: number) => {
  if (count <= 3) {
    return { cols: SINGLE_ROW_COLS[count], cells: [count, count, count] as const };
  }
  if (count < 8) return { cols: "grid-cols-2 md:grid-cols-4", cells: [4, 4, 4] as const };

  return { cols: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4", cells: [4, 6, 8] as const };
};

/**
 * Every number the closing tile can stand for across the three widths, given a folder of
 * `imageCount` photographs standing in for `total` buildings.
 *
 * The caller needs the whole set up front: the label is a translation resolved on the
 * server, the grid drops a different number of photographs at each breakpoint, and the
 * reader changes breakpoint without the server being asked again.
 */
export const overflowCounts = (imageCount: number, total: number): number[] => [
  ...new Set(
    gridShape(imageCount)
      .cells.filter((visible) => imageCount > visible)
      .map((visible) => total - (visible - 1)),
  ),
];
