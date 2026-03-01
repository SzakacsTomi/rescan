"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import type { SectionConfig } from "@/app/types/section";

type SectionCardProps = {
  section: SectionConfig;
  isHovered: boolean;
  anyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  title: string;
  description: string;
};

export const SectionCard = ({
  section,
  isHovered,
  anyHovered,
  onHoverStart,
  onHoverEnd,
  title,
  description,
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
      className="relative overflow-hidden min-h-[50vh] lg:min-h-screen"
      style={{ background: section.gradient }}
    >
      <Link href={section.href} className="absolute inset-0 z-10" aria-label={title} />

      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-8 left-8"
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </motion.div>

      <motion.div
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
        transition={{ duration: 0.3, delay: isActive ? 0.1 : 0 }}
        className="absolute inset-0 flex flex-col justify-end p-8 bg-linear-to-t from-black/70 via-black/20 to-transparent"
      >
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-white/80 text-base max-w-sm leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
};
