'use client';

import { useState, useCallback, useEffect } from 'react';
import { ProjectsHero } from '@/app/components/organisms/projects/ProjectsHero';
import { ProjectsGrid } from '@/app/components/organisms/projects/ProjectsGrid';
import { ProjectDetail } from '@/app/components/organisms/projects/ProjectDetail';
import { projects } from '@/config/projects';

type ProjectTranslation = {
  title: string;
  description: string;
  detail: {
    client: string;
    location: string;
    sector: string;
    scope: string;
    body: string;
  };
};

type ProjectsTemplateProps = {
  translations: {
    hero: { headline: string; subheadline: string };
    backToProjects: string;
    projects: Record<string, ProjectTranslation>;
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
  const selectedTranslation = selectedId ? translations.projects[selectedId] ?? null : null;

  return (
    <div className="min-h-screen bg-slate-950">
      <ProjectsHero
        headline={translations.hero.headline}
        subheadline={translations.hero.subheadline}
      />
      <ProjectsGrid
        projects={projects}
        translations={translations.projects}
        onSelect={handleSelect}
      />
      <ProjectDetail
        project={selectedProject}
        translations={
          selectedTranslation
            ? { title: selectedTranslation.title, detail: selectedTranslation.detail }
            : null
        }
        backLabel={translations.backToProjects}
        onClose={handleClose}
      />
    </div>
  );
};
