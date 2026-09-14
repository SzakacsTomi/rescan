"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

/** A light pass across the tint rather than a pulse — the same scan the hero and the case
 *  bands perform, so a frame that is still waiting reads as part of the site rather than
 *  as a generic spinner. */
const SKELETON_SWEEP =
  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)";

/** A wash of the text colour rather than `muted`: the slots that hold a photograph are
 *  themselves muted-on-white, and a skeleton painted in the same token as the box around
 *  it is a skeleton nobody can see. A dark band overrides it with `skeletonClassName`. */
const SKELETON_TINT = "bg-foreground/10";

/** The tint for a frame over a dark ground — a case band's gradient, the carousel's `ink`
 *  strip, a project card. Light-on-dark rather than the default dark-on-light, and one
 *  definition because five surfaces need exactly the same one. */
export const SKELETON_ON_DARK = "bg-white/8";

const SWEEP_PERIOD_MS = 1700;
const SWEEP_EASE = "cubic-bezier(0.4, 0, 0.6, 1)";

/** A wall of frames sweeping in unison reads as one strobing pattern rather than as tiles
 *  each waiting on their own file, so each starts part-way through its own pass — the same
 *  thing `SWEEP_STAGGER_S` does for the case bands. Seeding the offset from the source
 *  keeps it stable across re-renders and identical on the server, which an index would
 *  also give but a random number would not. */
const sweepOffsetMs = (src: string) => {
  let hash = 0;
  for (let i = 0; i < src.length; i += 1) hash = (hash * 31 + src.charCodeAt(i)) >>> 0;

  return -(hash % SWEEP_PERIOD_MS);
};

type SkeletonImageProps = Omit<
  ImageProps,
  "fill" | "onLoad" | "onError" | "placeholder" | "blurDataURL" | "src"
> & {
  /** A remote URL rather than a static import: every photograph here comes from
   *  Cloudinary, and the sweep offset is seeded from the string. */
  src: string;
  /** The tint held under the sweep, replacing the light-surface default; a frame that
   *  sits on a dark band passes its own. */
  skeletonClassName?: string;
};

/**
 * A `fill` image that paints a sweeping skeleton until its own file has decoded, then
 * fades the photograph in over it.
 *
 * This is the wait for an image that is on its way, which is not what `MediaPlaceholder`
 * covers — that one stands in for an image never bound in the first place.
 *
 * The skeleton is positioned absolutely, like the `fill` image beside it, so it needs no
 * wrapper of its own: a container that can already carry `fill` is by definition relative.
 */
export const SkeletonImage = ({
  alt,
  src,
  className,
  skeletonClassName,
  ...imageProps
}: SkeletonImageProps) => {
  const [isSettled, setIsSettled] = useState(false);
  const settle = () => setIsSettled(true);

  /** A cached image can finish decoding before React attaches `onLoad`, and the event then
   *  never fires — on a second visit the skeleton would sit over a photograph that has
   *  been there all along. The ref runs once the element exists and catches that. */
  const settleIfCached = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setIsSettled(true);
  }, []);

  return (
    <>
      {!isSettled && (
        <div
          aria-hidden
          className={cn("absolute inset-0 overflow-hidden", SKELETON_TINT, skeletonClassName)}
        >
          {/* Without the sweep running, its gradient is just a bright patch parked on the
              left of the frame, so a reduced-motion reader gets the flat tint alone. */}
          <div
            className="absolute inset-y-0 left-0 hidden w-1/2 motion-safe:block"
            style={{
              background: SKELETON_SWEEP,
              animation: `skeleton-sweep ${SWEEP_PERIOD_MS}ms ${SWEEP_EASE} infinite`,
              animationDelay: `${sweepOffsetMs(src)}ms`,
            }}
          />
        </div>
      )}
      <Image
        {...imageProps}
        alt={alt}
        src={src}
        fill
        ref={settleIfCached}
        onLoad={settle}
        /** A source that will never arrive drops the skeleton too — a frame shimmering
         *  for good is a worse failure than an empty one. */
        onError={settle}
        className={cn(
          "transition-opacity duration-500",
          isSettled ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </>
  );
};
