import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { SKELETON_ON_DARK, SkeletonImage } from "@/app/components/atoms/SkeletonImage";
import { cn } from "@/lib/utils";

/** The three widths the grid reshapes at, with every display utility written out in full:
 *  Tailwind reads class names out of the source, so a breakpoint prefix joined to a utility
 *  at runtime is a class that never gets generated. */
const STEPS = [
  { block: "block", flex: "flex", hidden: "hidden" },
  { block: "md:block", flex: "md:flex", hidden: "md:hidden" },
  { block: "xl:block", flex: "xl:flex", hidden: "xl:hidden" },
] as const;

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
const gridShape = (count: number) => {
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

/** Cell widths as the share of the viewport each one holds, the band being full-bleed. */
const cellSizes = (count: number) => {
  if (count === 1) return "100vw";
  if (count === 2) return "50vw";
  if (count === 3) return "34vw";
  if (count < 8) return "(min-width: 768px) 25vw, 50vw";

  return "(min-width: 1280px) 25vw, (min-width: 768px) 34vw, 50vw";
};

/** The smallest set of display utilities that expresses "on at these widths, off at those" —
 *  a cell the grid gains or loses only needs `hidden` reversed where its state changes. */
const displayClasses = (on: readonly boolean[], shown: "block" | "flex") =>
  on
    .map((isOn, step) =>
      step > 0 && isOn === on[step - 1] ? null : isOn ? STEPS[step][shown] : STEPS[step].hidden,
    )
    .filter(Boolean)
    .join(" ");

/** The portfolio the closing tile counts, drawn as the thing RESCAN hands the client: a
 *  plan grid. Masked to a soft oval so it reads as a field the number sits on rather than
 *  as a texture tiled to the cell edges. */
const PLAN_GRID =
  "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)";
const PLAN_GRID_STEP = "38px 38px";
const PLAN_GRID_MASK = "radial-gradient(75% 68% at 50% 50%, #000 0%, transparent 78%)";

/** Above Next's default, because every frame is already being upscaled to cover its cell
 *  and the softening the two do together is visible. Allowlisted in `next.config.ts`. */
const FRAME_QUALITY = 90;

/** Frames land in sequence rather than together, so the grid assembles itself behind the
 *  scan line instead of flashing in whole. */
const FRAME_SETTLE_STEP_MS = 45;

type ImageStripProps = {
  /** Decorative throughout — the frames carry no alt text, so only the overflow tile is
   *  reachable and it names itself. */
  images: string[];
  /** What the closing tile counts up to. The photographs are a sample of a portfolio, so
   *  this is the client's building count and not `images.length` — see `propertyCount` in
   *  `config/projects.ts`. Falls back to the folder, which is right for a folder that is
   *  the whole set. */
  overflowTotal?: number;
  /** Translated `+n` figures keyed by the number the tile stands for. The grid drops a
   *  different number at each width, so it needs the set rather than one string; the caller
   *  has the catalogue, the grid has the shapes. */
  moreLabels?: Record<number, string>;
  /** The fixed word under that figure — `+49` alone does not say what it counts. */
  overflowLabel?: string;
  /** The band's own accent, so the tile that stands for the rest of the folder glows in the
   *  colour its band already owns rather than in a grey shared by all four. */
  accent?: string;
  /** Held blank until the caller says the grid is on screen, so the frames settle in with
   *  the section rather than having already happened by the time it is reached. */
  isActive?: boolean;
  /** Set on the one grid that opens the page: its first frame is the LCP image. */
  priority?: boolean;
  className?: string;
};

/**
 * A client's photographs composed into the grid behind a case band — a hairline lattice that
 * is one frame at a single image, an even pair at two, and two rows of four at a full folder,
 * with the last cell standing in for everything the band has no room for.
 *
 * That last cell is the point of the component. These folders run to sixteen photographs and
 * tiling all of them turned the band into a contact sheet: every building competed with every
 * other and with the headline over them. Seven photographs and a figure is a composition —
 * and the figure is the scale of the programme, counted against the client's portfolio
 * rather than against the folder, so the band says fifty-six buildings and not fifteen files.
 */
export const ImageStrip = ({
  images,
  overflowTotal,
  moreLabels,
  overflowLabel,
  accent,
  isActive = true,
  priority,
  className,
}: ImageStripProps) => {
  const { cols, cells } = gridShape(images.length);
  const total = overflowTotal ?? images.length;
  /** Whichever cell closes the grid at a width it cannot fill, or none where the folder fits. */
  const tileAt = cells.map((visible) => (images.length > visible ? visible - 1 : -1));

  return (
    <div className={cn("absolute inset-0 grid auto-rows-fr gap-px bg-white/12", cols, className)}>
      {Array.from({ length: Math.max(...cells) }, (_, index) => {
        const isShown = cells.map((visible) => index < visible);
        const isTile = tileAt.map((tile) => tile === index);
        const carriesPhoto = isShown.some((shown, step) => shown && !isTile[step]);

        // `frame-settle` ends on a `transform`, which it holds: the cell would keep a
        // stacking context for good and trap the tile's z-index inside it, under the band's
        // scrims. The cell stays plain and its two contents settle in on their own.
        const settle = isActive ? "animate-frame-settle" : "opacity-0";
        const settleDelay = { animationDelay: `${index * FRAME_SETTLE_STEP_MS}ms` };

        return (
          <div
            key={images[index]}
            className={cn("group/frame relative overflow-hidden", displayClasses(isShown, "block"))}
          >
            {carriesPhoto && (
              <div className={cn("absolute inset-0", settle)} style={settleDelay}>
                <SkeletonImage
                  src={images[index]}
                  alt=""
                  priority={priority && index === 0}
                  quality={FRAME_QUALITY}
                  sizes={cellSizes(images.length)}
                  skeletonClassName={SKELETON_ON_DARK}
                  className="object-cover transition-transform duration-700 ease-out group-hover/frame:scale-105"
                />
              </div>
            )}

            {isTile.some(Boolean) && (
              <div
                className={cn(
                  // Above the band's scrims, which are ramped for the headline in the
                  // opposite corner and have no business dimming this figure.
                  "group/more absolute inset-0 z-10 flex-col items-center justify-center gap-3.5 px-4 text-center",
                  displayClasses(isTile, "flex"),
                  settle,
                )}
                style={settleDelay}
              >
                <span className="absolute inset-0 bg-[#090c14]/35 backdrop-blur-md transition-colors duration-500 group-hover/more:bg-[#090c14]/20" />
                {accent !== undefined && (
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-55 transition-opacity duration-500 group-hover/more:opacity-85"
                    style={{
                      background: `radial-gradient(120% 90% at 50% 55%, ${accent}45 0%, transparent 70%)`,
                    }}
                  />
                )}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-15 transition-opacity duration-500 group-hover/more:opacity-30"
                  style={{
                    backgroundImage: PLAN_GRID,
                    backgroundSize: PLAN_GRID_STEP,
                    maskImage: PLAN_GRID_MASK,
                    WebkitMaskImage: PLAN_GRID_MASK,
                  }}
                />

                <span className="relative text-h1 leading-numeral font-extrabold tracking-numeral tabular-nums text-white lg:text-display-2xs">
                  {moreLabels?.[total - index]}
                </span>
                <span
                  aria-hidden
                  className="relative h-px w-8 transition-[width] duration-500 ease-out group-hover/more:w-16"
                  style={{ background: accent ?? "rgba(255,255,255,0.6)" }}
                />
                <MonoLabel className="relative text-mono-xs tracking-mono-lg text-white/75">
                  {overflowLabel}
                </MonoLabel>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
