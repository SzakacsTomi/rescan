"use client";

import { SectionCard } from "@/app/components/molecules/SectionCard";
import { useTranslations } from "next-intl";
import { sectionsConfig } from "@/config/sections";
import { useState } from "react";

export const SECTIONS_ID = "sections";

export const SectionsGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = useTranslations("sections");

  return (
    <section id={SECTIONS_ID} className="flex flex-col lg:flex-row w-full" aria-label="Project categories">
      {sectionsConfig.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          isHovered={hoveredId === section.id}
          anyHovered={hoveredId !== null}
          onHoverStart={() => setHoveredId(section.id)}
          onHoverEnd={() => setHoveredId(null)}
          title={t(`${section.id}.title`)}
          description={t(`${section.id}.description`)}
        />
      ))}
    </section>
  );
};
