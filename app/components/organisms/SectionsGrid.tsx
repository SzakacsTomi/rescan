'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionCard } from '@/app/components/molecules/SectionCard';
import { sectionsConfig } from '@/config/sections';

export const SectionsGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = useTranslations('sections');

  return (
    <section
      id="sections"
      className="flex flex-col lg:flex-row w-full"
      aria-label="Project categories"
    >
      {sectionsConfig.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          isHovered={hoveredId === section.id}
          anyHovered={hoveredId !== null}
          onHoverStart={() => setHoveredId(section.id)}
          onHoverEnd={() => setHoveredId(null)}
          title={t(`${section.id}.title` as 'branding.title' | 'digital.title' | 'print.title')}
          description={t(`${section.id}.description` as 'branding.description' | 'digital.description' | 'print.description')}
        />
      ))}
    </section>
  );
};
