"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRef, useState } from "react";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { cn } from "@/lib/utils";
import type { SectionConfig } from "@/app/types/section";

type SectionCardProps = {
  section: SectionConfig;
  isHovered: boolean;
  anyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  index: string;
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

export const SectionCard = ({
  section,
  isHovered,
  anyHovered,
  onHoverStart,
  onHoverEnd,
  index,
  title,
  lead,
  description,
  chainSteps,
  ctaLabel,
}: SectionCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.6 });

  // Lazy initializer - runs once on the client, avoids extra render.
  // Defaults to true on SSR (hover device assumed).
  const [isHoverDevice] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(hover: hover)").matches;
  });

  // On touch devices: activate when scrolled into view
  // On hover devices: activate on mouse hover
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
      <Link href={section.href} className="absolute inset-0 z-10" aria-label={title} />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: `${GRID_SIZE_PX}px ${GRID_SIZE_PX}px`,
        }}
      />

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
          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h3>
          <p className="mt-3 max-w-115 text-lg font-medium text-white/80">{lead}</p>

          <div
            className="overflow-hidden transition-[max-height,opacity] duration-500"
            style={{
              maxHeight: isActive ? `${DETAIL_MAX_HEIGHT_PX}px` : "0px",
              opacity: isActive ? 1 : 0,
            }}
          >
            <p className="mt-5 max-w-130 whitespace-pre-line text-sm leading-relaxed text-white/60">
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
