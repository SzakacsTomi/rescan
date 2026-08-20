"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import {
  PREVIEW_HEIGHT_PX,
  PREVIEW_WIDTH_PX,
  ProjectIndexPreview,
} from "@/app/components/molecules/ProjectIndexPreview";
import { ProjectIndexRow } from "@/app/components/molecules/ProjectIndexRow";
import {
  ProjectDetail,
  type ProjectDetailCopy,
} from "@/app/components/organisms/projects/ProjectDetail";
import type { ProjectConfig } from "@/config/projects";

export type ProjectIndexItem = {
  project: ProjectConfig;
  title: string;
  description: string;
  /** Both read off the project's own detail copy, so the ledger can column what the
   *  overlay used to keep to itself. Absent on the two case studies. */
  sectorLabel?: string;
  location?: string;
  eyebrow?: string;
  /** Set on the two case studies; everything else opens the detail overlay instead. */
  href?: string;
};

type ProjectIndexProps = {
  eyebrow: string;
  headline: string;
  body: string;
  columns: { ordinal: string; project: string; sector: string; location: string };
  items: ProjectIndexItem[];
  details: Record<string, ProjectDetailCopy>;
  backLabel: string;
};

export const PROJECT_INDEX_ID = "index";

const PREVIEW_SPRING = { stiffness: 260, damping: 30, mass: 0.35 };
const CURSOR_OFFSET_PX = 28;
const VIEWPORT_MARGIN_PX = 16;

export const ProjectIndex = ({
  eyebrow,
  headline,
  body,
  columns,
  items,
  details,
  backLabel,
}: ProjectIndexProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const indexScrollRef = useRef(0);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const previewX = useSpring(pointerX, PREVIEW_SPRING);
  const previewY = useSpring(pointerY, PREVIEW_SPRING);

  const movePreview = useCallback(
    (clientX: number, clientY: number, jump = false) => {
      const x = Math.min(
        clientX + CURSOR_OFFSET_PX,
        window.innerWidth - PREVIEW_WIDTH_PX - VIEWPORT_MARGIN_PX,
      );
      const y = Math.min(
        Math.max(clientY - PREVIEW_HEIGHT_PX / 2, VIEWPORT_MARGIN_PX),
        window.innerHeight - PREVIEW_HEIGHT_PX - VIEWPORT_MARGIN_PX,
      );

      pointerX.set(x);
      pointerY.set(y);
      // Entering the ledger from anywhere places the preview outright; only movement
      // within it should trail behind the pointer.
      if (jump) {
        previewX.jump(x);
        previewY.jump(y);
      }
    },
    [pointerX, pointerY, previewX, previewY],
  );

  const handleSelect = useCallback((id: string) => {
    setHoveredId(null);
    // Read before the overlay takes the page to its own top, so closing it returns the
    // reader to the row they opened rather than to the top of the page.
    indexScrollRef.current = window.scrollY;
    setSelectedId(id);
    window.scrollTo({ top: 0 });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, indexScrollRef.current);
    };
  }, [selectedId]);

  const selected = selectedId ? items.find((item) => item.project.id === selectedId) : undefined;
  const hovered = hoveredId ? items.find((item) => item.project.id === hoveredId) : undefined;

  return (
    <section
      id={PROJECT_INDEX_ID}
      className="scroll-mt-16 bg-secondary px-6 py-24 sm:px-8 lg:px-10 lg:py-30"
    >
      <div className="mx-auto max-w-page">
        <Reveal>
          <MonoLabel className="text-foreground/40">{eyebrow}</MonoLabel>
          <h2 className="mt-6 max-w-measure text-h3 font-bold leading-heading tracking-tight lg:text-h1">
            {headline}
          </h2>
          <p className="mt-4 max-w-160 text-base leading-copy text-foreground/55">{body}</p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="hidden pb-4 lg:grid lg:grid-cols-[3.5rem_minmax(0,1fr)_9rem_11rem_1.5rem] lg:gap-8 lg:px-4">
            <MonoLabel>{columns.ordinal}</MonoLabel>
            <MonoLabel>{columns.project}</MonoLabel>
            <MonoLabel>{columns.sector}</MonoLabel>
            <MonoLabel>{columns.location}</MonoLabel>
            <span />
          </div>

          <ul
            className="border-t border-border"
            onPointerMove={(event) => movePreview(event.clientX, event.clientY)}
            onPointerLeave={() => setHoveredId(null)}
          >
            {items.map((item, i) => (
              <li key={item.project.id}>
                <ProjectIndexRow
                  {...item}
                  ordinal={String(i + 1).padStart(2, "0")}
                  onSelect={() => handleSelect(item.project.id)}
                  onPoint={(event) => {
                    movePreview(event.clientX, event.clientY, hoveredId === null);
                    setHoveredId(item.project.id);
                  }}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <ProjectIndexPreview project={hovered?.project ?? null} x={previewX} y={previewY} />

      <ProjectDetail
        project={selected?.project ?? null}
        translations={selectedId ? (details[selectedId] ?? null) : null}
        backLabel={backLabel}
        onClose={handleClose}
      />
    </section>
  );
};
