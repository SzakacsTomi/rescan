"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

const REVEAL_ANIMATION = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
} as const;

/** The scroll-triggered fade-and-rise every section headline and repeating row uses in
 *  the design (its `data-reveal="1"` markers) — matches the treatment `ProjectCard`
 *  already established for cards entering the viewport. */
export const Reveal = ({ children, className, as = "div" }: RevealProps) => {
  if (as === "li") {
    return (
      <motion.li className={className} {...REVEAL_ANIMATION}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div className={className} {...REVEAL_ANIMATION}>
      {children}
    </motion.div>
  );
};
