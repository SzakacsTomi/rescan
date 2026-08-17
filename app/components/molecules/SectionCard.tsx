"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRef, useState } from "react";
import { ConsequenceChain } from "@/app/components/molecules/ConsequenceChain";
import type { SectionConfig } from "@/app/types/section";

type SectionCardProps = {
  section: SectionConfig;
  isHovered: boolean;
  anyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  title: string;
  /** The one-line promise the Home brief leads each sector block with. */
  lead: string;
  description: string;
  chainSteps: string[];
  ctaLabel: string;
};

export const SectionCard = ({
  section,
  isHovered,
  anyHovered,
  onHoverStart,
  onHoverEnd,
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
  const flexValue = isHoverDevice ? (isHovered ? 2 : anyHovered ? 0.75 : 1) : 1;

  return (
    <motion.div
      ref={ref}
      animate={{ flex: flexValue }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={isHoverDevice ? onHoverStart : undefined}
      onHoverEnd={isHoverDevice ? onHoverEnd : undefined}
      // The expanded state carries the brief's lead, body, chain and CTA. At 50vh that
      // content overflowed the card on a phone and collided with the collapsed layer.
      className="relative overflow-hidden min-h-[85vh] lg:min-h-screen"
      style={{ background: section.gradient }}
    >
      <Link href={section.href} className="absolute inset-0 z-10" aria-label={title} />

      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-8 left-8 right-8"
        aria-hidden
      >
        {/* Collapsed state repeats the expanded state's title, so it is hidden from the
            accessibility tree rather than emitting a second heading for the same card. */}
        <p className="text-2xl font-bold text-white">{title}</p>
        <p className="text-white/70 text-base mt-1">{lead}</p>
      </motion.div>

      <motion.div
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
        transition={{ duration: 0.3, delay: isActive ? 0.1 : 0 }}
        className="absolute inset-0 flex flex-col justify-end gap-5 overflow-y-auto p-8 bg-linear-to-t from-black/80 via-black/40 to-transparent"
        // Not interactive until revealed — otherwise its text is selectable and
        // focusable while sitting invisibly on top of the collapsed layer.
        style={{ pointerEvents: isActive ? undefined : "none" }}
        aria-hidden={!isActive}
      >
        <div>
          <h3 className="text-3xl font-bold text-white">{title}</h3>
          <p className="text-white/85 text-lg font-medium mt-2 max-w-md">{lead}</p>
        </div>

        <p className="text-white/70 text-sm leading-relaxed max-w-md whitespace-pre-line">
          {description}
        </p>

        <ConsequenceChain
          steps={chainSteps}
          variant="compact"
          className="max-w-md text-white/55"
        />

        <span className="inline-flex items-center gap-2 text-white font-semibold text-sm">
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </span>
      </motion.div>
    </motion.div>
  );
};
