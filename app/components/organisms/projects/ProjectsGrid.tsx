'use client';

import { ProjectCard } from '@/app/components/molecules/ProjectCard';
import type { ProjectConfig } from '@/config/projects';

type ProjectTranslation = {
  title: string;
  description: string;
};

type ProjectsGridProps = {
  projects: ProjectConfig[];
  translations: Record<string, ProjectTranslation>;
  onSelect: (id: string) => void;
};

export const ProjectsGrid = ({ projects, translations, onSelect }: ProjectsGridProps) => {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            title={translations[project.id]?.title ?? ''}
            description={translations[project.id]?.description ?? ''}
            index={index}
            onClick={() => onSelect(project.id)}
          />
        ))}
      </div>
    </section>
  );
};
