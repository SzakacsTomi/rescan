"use client";

import { useCallback, useEffect, useState } from "react";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { ProjectIndexCard } from "@/app/components/molecules/ProjectIndexCard";
import {
  ProjectDetail,
  type ProjectDetailCopy,
} from "@/app/components/organisms/projects/ProjectDetail";
import type { ProjectConfig } from "@/config/projects";

export type ProjectIndexItem = {
  project: ProjectConfig;
  title: string;
  description: string;
  eyebrow?: string;
  /** Set on the two case studies; everything else opens the detail overlay instead. */
  href?: string;
};

type ProjectIndexProps = {
  eyebrow: string;
  headline: string;
  body: string;
  items: ProjectIndexItem[];
  details: Record<string, ProjectDetailCopy>;
  backLabel: string;
};

export const PROJECT_INDEX_ID = "index";

export const ProjectIndex = ({
  eyebrow,
  headline,
  body,
  items,
  details,
  backLabel,
}: ProjectIndexProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    window.scrollTo({ top: 0 });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [selectedId]);

  const selected = selectedId ? items.find((item) => item.project.id === selectedId) : undefined;

  return (
    <section
      id={PROJECT_INDEX_ID}
      className="scroll-mt-16 bg-secondary px-6 py-24 sm:px-8 lg:px-10 lg:py-30"
    >
      <div className="mx-auto max-w-310">
        <Reveal>
          <MonoLabel className="text-foreground/40">{eyebrow}</MonoLabel>
          <h2 className="mt-6 max-w-225 text-[30px] font-bold leading-[1.15] tracking-[-0.03em] lg:text-[38px]">
            {headline}
          </h2>
          <p className="mt-4 max-w-160 text-base leading-[1.65] text-foreground/55">{body}</p>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ProjectIndexCard
              key={item.project.id}
              project={item.project}
              title={item.title}
              description={item.description}
              eyebrow={item.eyebrow}
              href={item.href}
              onSelect={() => handleSelect(item.project.id)}
            />
          ))}
        </Reveal>
      </div>

      <ProjectDetail
        project={selected?.project ?? null}
        translations={selectedId ? (details[selectedId] ?? null) : null}
        backLabel={backLabel}
        onClose={handleClose}
      />
    </section>
  );
};
