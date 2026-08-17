'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ProjectCardCopy } from '@/app/components/molecules/ProjectCard';
import {
  ProjectDetail,
  type ProjectDetailCopy,
} from '@/app/components/organisms/projects/ProjectDetail';
import { ProjectsGrid } from '@/app/components/organisms/projects/ProjectsGrid';
import { ProjectsHero } from '@/app/components/organisms/projects/ProjectsHero';
import { FinalCTA } from '@/app/components/organisms/sector/FinalCTA';
import { projects } from '@/config/projects';

type ProjectsTemplateProps = {
  translations: {
    hero: { headline: string; subheadline: string; cta: string };
    finalCta: { headline: string; subheadline: string; cta: string };
    backToProjects: string;
    cards: Record<string, ProjectCardCopy>;
    details: Record<string, ProjectDetailCopy>;
  };
};

export const ProjectsTemplate = ({ translations }: ProjectsTemplateProps) => {
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
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, [selectedId]);

  const selectedProject = selectedId ? projects.find((p) => p.id === selectedId) ?? null : null;
  const selectedDetail = selectedId ? translations.details[selectedId] ?? null : null;

  return (
    <div className="min-h-screen bg-slate-950">
      <ProjectsHero
        headline={translations.hero.headline}
        subheadline={translations.hero.subheadline}
        cta={translations.hero.cta}
      />
      <ProjectsGrid projects={projects} copy={translations.cards} onSelect={handleSelect} />
      <FinalCTA
        headline={translations.finalCta.headline}
        subheadline={translations.finalCta.subheadline}
        cta={translations.finalCta.cta}
        ctaHref="/contact"
      />
      <ProjectDetail
        project={selectedProject}
        translations={selectedDetail}
        backLabel={translations.backToProjects}
        onClose={handleClose}
      />
    </div>
  );
};
