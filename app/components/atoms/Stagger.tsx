"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const MOTION_TAG = {
  div: motion.div,
  ul: motion.ul,
  li: motion.li,
  dl: motion.dl,
  article: motion.article,
} as const;

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: keyof typeof MOTION_TAG;
  /** Seconds between each child's reveal — the design's list rows swim in one after another. */
  step?: number;
};

/**
 * The staggered sibling of `Reveal`: each child rises in turn as the group enters the
 * viewport, instead of the whole block fading together. Children keep their own tag —
 * a `li` child is promoted to `motion.li` so list semantics survive the animation.
 */
export const Stagger = ({ children, className, as = "div", step = 0.1 }: StaggerProps) => {
  const Group = MOTION_TAG[as];

  return (
    <Group
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const Tag = MOTION_TAG[child.type as keyof typeof MOTION_TAG] ?? MOTION_TAG.div;
        const { children: childChildren, ...rest } = child.props as {
          className?: string;
          children?: ReactNode;
        };
        return (
          <Tag {...rest} variants={ITEM_VARIANTS} key={child.key}>
            {childChildren}
          </Tag>
        );
      })}
    </Group>
  );
};