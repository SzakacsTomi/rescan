"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import Image from "next/image";

import { MediaPlaceholder } from "@/app/components/atoms/MediaPlaceholder";
import { PORTRAIT_STRIPE } from "@/config/gradients";
import type { ProjectConfig } from "@/config/projects";

export const PREVIEW_WIDTH_PX = 320;
export const PREVIEW_HEIGHT_PX = 240;

type ProjectIndexPreviewProps = {
  /** The row currently under the pointer, or `null` when the ledger is not hovered. */
  project: ProjectConfig | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
};

/**
 * The image the ledger gives up by listing projects as rows rather than cards. It rides the
 * pointer from `lg` up, which is the only width where the rows drop their own thumbnail —
 * below that each row carries its image and this stays hidden.
 */
export const ProjectIndexPreview = ({ project, x, y }: ProjectIndexPreviewProps) => (
  <motion.div
    aria-hidden
    style={{ x, y }}
    className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
  >
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute left-0 top-0 overflow-hidden shadow-[0_18px_50px_-20px_rgba(20,30,61,0.55)]"
          style={{
            width: PREVIEW_WIDTH_PX,
            height: PREVIEW_HEIGHT_PX,
            background: project.gradient,
          }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover"
              sizes={`${PREVIEW_WIDTH_PX}px`}
            />
          ) : (
            <MediaPlaceholder stripe={PORTRAIT_STRIPE} className="absolute inset-0" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
