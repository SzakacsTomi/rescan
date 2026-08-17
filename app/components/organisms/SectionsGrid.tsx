"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { SectionCard } from "@/app/components/molecules/SectionCard";
import { sectionsConfig } from "@/config/sections";

export const SECTIONS_ID = "sections";

const CHAIN_STEP_COUNT = 4;

export const SectionsGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = useTranslations("homePage");

  return (
    <section id={SECTIONS_ID} className="w-full" aria-label="Sectors">
      <div className="px-6 pt-24 pb-12 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {t("sectorSplit.headline")}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        {sectionsConfig.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            isHovered={hoveredId === section.id}
            anyHovered={hoveredId !== null}
            onHoverStart={() => setHoveredId(section.id)}
            onHoverEnd={() => setHoveredId(null)}
            title={t(`sectors.${section.id}.title`)}
            lead={t(`sectors.${section.id}.lead`)}
            description={t(`sectors.${section.id}.description`)}
            chainSteps={Array.from({ length: CHAIN_STEP_COUNT }, (_, i) =>
              t(`sectors.${section.id}.step${i}`),
            )}
            ctaLabel={t(`sectors.${section.id}.cta`)}
          />
        ))}
      </div>
    </section>
  );
};
