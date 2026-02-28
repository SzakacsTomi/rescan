'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { SectionConfig } from '@/app/types/section';

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
  const flexValue = isHovered ? 2 : anyHovered ? 0.75 : 1;

  return (
    <motion.div
      animate={{ flex: flexValue }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="relative overflow-hidden min-h-[50vh] lg:min-h-screen"
      style={{ background: section.gradient }}
    >
      <Link
        href={section.href}
        className="absolute inset-0 z-10"
        aria-label={title}
      />

      {/* Default title – always visible */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-8 left-8"
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </motion.div>

      {/* Hover overlay with full content */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 16 }}
        transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
        className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      >
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-white/80 text-base max-w-xs leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
};
