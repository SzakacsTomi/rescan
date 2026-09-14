"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRef, useState } from "react";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { SKELETON_ON_DARK, SkeletonImage } from "@/app/components/atoms/SkeletonImage";
import { PHOTO_CEILING_SCRIM, PHOTO_FLOOR_SCRIM } from "@/config/gradients";
import { cn } from "@/lib/utils";
import type { SectionConfig } from "@/app/types/section";

type SectionCardProps = {
  section: SectionConfig;
  isHovered: boolean;
  anyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  index: string;
  /** Delivery URL for `section.image`, resolved on the server — the Cloudinary cloud name
   *  is not in the client bundle. */
  imageSrc: string;
  imageAlt: string;
  title: string;
  /** The one-line promise the Home brief leads each sector block with. */
  lead: string;
  description: string;
  chainSteps: string[];
  ctaLabel: string;
};

const GRID_SIZE_PX = 64;
/** Design's own collapse height for the description + step chips — generous enough
 *  that a wrapped Swedish translation still fits without clipping. */
const DETAIL_MAX_HEIGHT_PX = 420;

/** The card's own gradient goes back over the photograph as a tint only — it carries the
 *  pair's colour split (navy against charcoal), while the building stays the thing you
 *  look at. The active card lifts most of it, the same way a case band brightens under the
 *  pointer. Contrast for the copy comes from the floor scrim, never from this. */
const PHOTO_TINT = "opacity-55 transition-opacity duration-600";
const PHOTO_TINT_ACTIVE = "opacity-30";

/** The measured grid stays over the photograph but has to give most of itself back: at full
 *  strength it read as a mesh laid on a building rather than as the card's surface. */
const GRID_OPACITY_OVER_PHOTO = 0.45;

export const SectionCard = ({
  section,
  isHovered,
  anyHovered,
  onHoverStart,
  onHoverEnd,
  index,
  imageSrc,
  imageAlt,
  title,
  lead,
  description,
  chainSteps,
  ctaLabel,
}: SectionCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.6 });

  // SSR has no matchMedia, and assuming a hover device there keeps the collapsed detail
  // hidden until either signal arrives rather than flashing it open.
  const [isHoverDevice] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(hover: hover)").matches;
  });

  const isActive = isHoverDevice ? isHovered : isInView;
  const flexValue = isHoverDevice ? (isHovered ? 1.55 : anyHovered ? 0.85 : 1) : 1;

  return (
    <motion.div
      ref={ref}
      animate={{ flex: flexValue }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={isHoverDevice ? onHoverStart : undefined}
      onHoverEnd={isHoverDevice ? onHoverEnd : undefined}
      className="relative min-h-[85vh] overflow-hidden lg:min-h-screen"
      style={{ background: section.gradient }}
    >
      <SkeletonImage
        src={imageSrc}
        alt={imageAlt}
        sizes="(min-width: 1024px) 62vw, 100vw"
        skeletonClassName={SKELETON_ON_DARK}
        className="object-cover"
        style={{ objectPosition: section.image.objectPosition }}
      />
      <div
        aria-hidden
        className={cn("absolute inset-0", PHOTO_TINT, isActive && PHOTO_TINT_ACTIVE)}
        style={{ background: section.gradient }}
      />

      <Link href={section.href} className="absolute inset-0 z-10" aria-label={title} />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: `${GRID_SIZE_PX}px ${GRID_SIZE_PX}px`,
          opacity: GRID_OPACITY_OVER_PHOTO,
        }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: PHOTO_CEILING_SCRIM }} />
      <div aria-hidden className="absolute inset-0" style={{ background: PHOTO_FLOOR_SCRIM }} />

      <div className="relative flex h-full flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <MonoLabel className="text-white/50">{index}</MonoLabel>
          <span
            aria-hidden
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-opacity",
              isActive ? "opacity-100" : "opacity-40",
            )}
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        <div>
          <h3 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {title}
          </h3>
          <p className="mt-3 max-w-115 text-lg font-medium text-balance text-white/80">{lead}</p>

          <div
            className="overflow-hidden transition-[max-height,opacity] duration-500"
            style={{
              maxHeight: isActive ? `${DETAIL_MAX_HEIGHT_PX}px` : "0px",
              opacity: isActive ? 1 : 0,
            }}
          >
            <p className="mt-5 max-w-130 text-sm leading-relaxed text-pretty text-white/60">
              {description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {chainSteps.map((step, i) => {
                const isLast = i === chainSteps.length - 1;
                return (
                  <MonoLabel
                    key={step}
                    as="span"
                    className={cn(
                      "rounded-md border px-2.5 py-1.5",
                      isLast ? "border-white/55 text-white" : "border-white/18 text-white/50",
                    )}
                  >
                    {step}
                  </MonoLabel>
                );
              })}
            </div>
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
