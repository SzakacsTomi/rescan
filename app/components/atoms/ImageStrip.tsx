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
  /** Translated `+n more` labels keyed by the number of photographs the tile stands for.
   *  The grid drops a different number at each width, so it needs the set rather than one
   *  string; the caller has the catalogue, the grid has the shapes. */
  moreLabels?: Record<number, string>;
  /** Opens the client's full set. Without it the tile is still drawn but inert — the count
   *  is true either way. */
  onOverflowClick?: () => void;
  /** What that tile does, for assistive tech: `+12 more` alone says nothing about where it
   *  leads. */
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
 * other and with the headline over them. Seven and a count is a composition, and the count is
 * a way into the rest rather than a truncation — it opens the case study's own gallery.
 */
export const ImageStrip = ({
  images,
  moreLabels,
  onOverflowClick,
  overflowLabel,
  accent,
  isActive = true,
  priority,
  className,
}: ImageStripProps) => {
  const { cols, cells } = gridShape(images.length);
  /** Whichever cell closes the grid at a width it cannot fill, or none where the folder fits. */
  const tileAt = cells.map((visible) => (images.length > visible ? visible - 1 : -1));

  return (
    <div className={cn("absolute inset-0 grid auto-rows-fr gap-px bg-white/12", cols, className)}>
      {Array.from({ length: Math.max(...cells) }, (_, index) => {
        const isShown = cells.map((visible) => index < visible);
        const isTile = tileAt.map((tile) => tile === index);
        const carriesPhoto = isShown.some((shown, step) => shown && !isTile[step]);

        return (
          <div
            key={images[index]}
            className={cn(
              "group/frame relative overflow-hidden",
              displayClasses(isShown, "block"),
              isActive ? "animate-frame-settle" : "opacity-0",
            )}
            style={{ animationDelay: `${index * FRAME_SETTLE_STEP_MS}ms` }}
          >
            {carriesPhoto && (
              <SkeletonImage
                src={images[index]}
                alt=""
                priority={priority && index === 0}
                quality={FRAME_QUALITY}
                sizes={cellSizes(images.length)}
                skeletonClassName={SKELETON_ON_DARK}
                className="object-cover transition-transform duration-700 ease-out group-hover/frame:scale-105"
              />
            )}

            {isTile.some(Boolean) && (
              <button
                type="button"
                onClick={(event) => {
                  // The whole band is its own toggle; reaching the rest of the folder is not
                  // a request to collapse the study on the way there.
                  event.stopPropagation();
                  onOverflowClick?.();
                }}
                aria-label={overflowLabel}
                className={cn(
                  "group/more pointer-events-auto absolute inset-0 cursor-pointer items-center justify-center",
                  displayClasses(isTile, "flex"),
                )}
              >
                <span className="absolute inset-0 bg-[#090c14]/60 backdrop-blur-md transition-colors duration-500 group-hover/more:bg-[#090c14]/45" />
                {accent !== undefined && (
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-45 transition-opacity duration-500 group-hover/more:opacity-80"
                    style={{
                      background: `radial-gradient(120% 90% at 50% 55%, ${accent}40 0%, transparent 70%)`,
                    }}
                  />
                )}

                <span className="relative flex flex-col items-center gap-4">
                  {/* The photographs the band has no room for, drawn as the stack they are:
                      three plates in the band's own hairline, fanning apart under the
                      pointer. It is the one place on the page where the count has somewhere
                      to go, and it should look like it. */}
                  <span aria-hidden className="relative block h-10 w-14">
                    <span className="absolute inset-0 -translate-x-2 -rotate-6 rounded-sm border border-white/25 transition-transform duration-500 ease-out group-hover/more:-translate-x-3.5 group-hover/more:-rotate-12" />
                    <span className="absolute inset-0 translate-x-2 rotate-6 rounded-sm border border-white/25 transition-transform duration-500 ease-out group-hover/more:translate-x-3.5 group-hover/more:rotate-12" />
                    <span
                      className="absolute inset-0 rounded-sm border bg-white/12 transition-colors duration-500"
                      style={{ borderColor: accent ?? "rgba(255,255,255,0.5)" }}
                    />
                  </span>
                  <span className="text-note font-bold whitespace-nowrap text-white lg:text-title-sm">
                    {moreLabels?.[images.length - index]}
                  </span>
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
