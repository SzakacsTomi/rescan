"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const MOTION_TAG = {
  div: motion.div,
  li: motion.li,
  dl: motion.dl,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: keyof typeof MOTION_TAG;
};

const REVEAL_ANIMATION = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
} as const;

/** The scroll-triggered fade-and-rise every section headline and repeating row uses in
 *  the design (its `data-reveal="1"` markers). `Stagger` is the sibling for lists whose
 *  rows should arrive one after another rather than together. */
export const Reveal = ({ children, className, as = "div" }: RevealProps) => {
  const Tag = MOTION_TAG[as];

  return (
    <Tag className={className} {...REVEAL_ANIMATION}>
      {children}
    </Tag>
  );
};
