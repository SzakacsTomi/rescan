import { SKELETON_ON_DARK, SkeletonImage } from "@/app/components/atoms/SkeletonImage";
import { cn } from "@/lib/utils";

/**
 * The frame count each breakpoint can carry, largest last. A frame is drawn from the
 * first breakpoint whose cap clears its index, so widening the viewport adds frames
 * instead of shrinking the ones already there.
 *
 * Each cap is the exact number of frames that fills whole rows at that breakpoint's row
 * length — 3, 4, 6 and 8 frame-widths, the lead frame taking two of them — so the
 * lattice never ends on a row that is mostly empty.
 */
const FRAME_CAPS = [
  { cap: 5, className: "" },
  { cap: 7, className: "hidden sm:block" },
  { cap: 11, className: "hidden lg:block" },
  { cap: 15, className: "hidden xl:block" },
] as const;

const MAX_FRAMES = FRAME_CAPS[FRAME_CAPS.length - 1].cap;

const frameVisibility = (index: number) =>
  FRAME_CAPS.find(({ cap }) => index < cap)?.className ?? "hidden";

/** A frame is a third, a quarter, a sixth or an eighth of the row, less the hairline it
 *  gives back to its neighbour. `grow` hands that hairline — and whatever a short last
 *  row leaves over — back to the frames on the row, so any number of images tiles flush.
 *  The subtraction is what keeps a row of exact fractions from rounding itself onto two
 *  rows at an awkward viewport width. */
const FRAME_BASIS =
  "basis-[calc(100%/3-1px)] sm:basis-[calc(100%/4-1px)] lg:basis-[calc(100%/6-1px)] xl:basis-[calc(100%/8-1px)]";

/** The first frame runs two frame-widths wide. It is the whole composition when a slot
 *  holds one image, the larger half of a diptych when it holds two, and the thing that
 *  keeps a wall of thumbnails from reading as a uniform grid when it holds fifteen. It
 *  takes a double share of the leftover width too, so a two-image band stays the 2:1 the
 *  basis asks for instead of drifting towards even halves on a row with room to spare. */
const LEAD_FRAME_BASIS =
  "grow-2 basis-[calc(200%/3-1px)] sm:basis-[calc(200%/4-1px)] lg:basis-[calc(200%/6-1px)] xl:basis-[calc(200%/8-1px)]";

/** A frame's source has to cover the cell, and from three images up the cell is far
 *  taller than a slice of a landscape photograph is: `object-cover` scales the source by
 *  its aspect ratio before cropping, so a 240px-wide cell wants a ~420px-wide source and
 *  a width-in-`vw` hint quietly asks for half of that. Hence pixel widths, which are also
 *  the truth of the layout — widening the viewport adds frames rather than growing them.
 *  Below three images a frame really is a fraction of the full-bleed band and scales with
 *  it, so those two stay in `vw`. */
const frameSizes = (count: number, isLead: boolean) => {
  if (count === 1) return "100vw";
  if (count === 2) return isLead ? "67vw" : "34vw";
  return isLead ? "(min-width: 2000px) 30vw, 640px" : "(min-width: 2000px) 22vw, 420px";
};

/** Above Next's default, because every frame is already being upscaled to cover its cell
 *  and the softening the two do together is visible. Allowlisted in `next.config.ts`. */
const FRAME_QUALITY = 90;

/** Frames land in sequence rather than together, so the lattice assembles itself behind
 *  the scan line instead of flashing in whole. */
const FRAME_SETTLE_STEP_MS = 45;

type ImageLatticeProps = {
  /** Decorative throughout — the frames carry no alt text and the caller hides the
   *  lattice from assistive technology. */
  images: string[];
  /** Held blank until the caller says the lattice is on screen, so the frames settle in
   *  with the section rather than having already happened by the time it is reached. */
  isActive?: boolean;
  /** Set on the one lattice that opens the page: its lead frame is the LCP image. */
  priority?: boolean;
  className?: string;
};

/**
 * A set of photographs tiled to fill their container — a lead frame twice the width of
 * the rest, then as many square-ish frames as the viewport can carry, separated by a
 * hairline rather than by gaps.
 *
 * The composition follows the count with no branching: one image fills the container,
 * two split it two-to-one, and more of them wrap into rows that share the height evenly.
 * That matters because the counts come from a Cloudinary folder and change whenever the
 * client adds a photograph.
 */
export const ImageLattice = ({
  images,
  isActive = true,
  priority,
  className,
}: ImageLatticeProps) => {
  const frames = images.slice(0, MAX_FRAMES);

  return (
    <div className={cn("absolute inset-0 flex flex-wrap content-stretch", className)}>
      {frames.map((src, index) => (
        <div
          key={src}
          className={cn(
            "group/frame relative grow overflow-hidden",
            index === 0 ? LEAD_FRAME_BASIS : FRAME_BASIS,
            frames.length > 1 && "border-r border-b border-white/12",
            isActive ? "animate-frame-settle" : "opacity-0",
            frameVisibility(index),
          )}
          style={{ animationDelay: `${index * FRAME_SETTLE_STEP_MS}ms` }}
        >
          <SkeletonImage
            src={src}
            alt=""
            priority={priority && index === 0}
            quality={FRAME_QUALITY}
            sizes={frameSizes(frames.length, index === 0)}
            skeletonClassName={SKELETON_ON_DARK}
            className="object-cover transition-transform duration-700 ease-out group-hover/frame:scale-105"
          />
        </div>
      ))}
    </div>
  );
};
