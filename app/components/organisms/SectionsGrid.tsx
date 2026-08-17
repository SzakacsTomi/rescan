"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Reveal } from "@/app/components/atoms/Reveal";
import { SectionCard } from "@/app/components/molecules/SectionCard";
import { sectionsConfig } from "@/config/sections";

export const SECTIONS_ID = "sections";

const CHAIN_STEP_COUNT = 4;

export const SectionsGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = useTranslations("homePage");

  return (
    <section id={SECTIONS_ID} className="w-full" aria-label="Sectors">
      <Reveal className="flex flex-wrap items-end justify-between gap-6 px-6 pt-16 pb-8 sm:px-8 lg:px-10 lg:pt-24 lg:pb-10">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[44px]">
          {t("sectorSplit.headline")}
        </h2>
        <MonoLabel className="text-white/35">{t("sectorSplit.routeLabel")}</MonoLabel>
      </Reveal>

      <div className="flex flex-col lg:flex-row lg:gap-0.5">
        {sectionsConfig.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            isHovered={hoveredId === section.id}
            anyHovered={hoveredId !== null}
            onHoverStart={() => setHoveredId(section.id)}
            onHoverEnd={() => setHoveredId(null)}
            index={t(`sectors.${section.id}.index`)}
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
