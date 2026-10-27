"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * Every animated element is an `m.*`, which carries no animation code of its own; this is
 * where that code arrives from. `strict` makes a stray `motion.*` throw in development,
 * because one full `motion` import would pull the whole engine back into the first load.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={loadFeatures} strict>
    {children}
  </LazyMotion>
);
