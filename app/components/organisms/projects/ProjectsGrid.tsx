'use client';

import { isPending, placeholdersVisible } from '@/app/components/atoms/Pending';
import { ProjectCard, type ProjectCardCopy } from '@/app/components/molecules/ProjectCard';
import type { ProjectConfig } from '@/config/projects';

type ProjectsGridProps = {
  projects: ProjectConfig[];
  copy: Record<string, ProjectCardCopy>;
  onSelect: (id: string) => void;
};

export const ProjectsGrid = ({ projects, copy, onSelect }: ProjectsGridProps) => {
  // A case study whose copy has not arrived would render as a blank tile — but on
  // preview it is exactly what the client needs to see.
  const visible = placeholdersVisible
    ? projects
    : projects.filter((project) => !isPending(copy[project.id]?.title ?? ''));

  return (
    <section className="px-6 lg:pl-[126px] py-16 sm:py-24">
      <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            copy={copy[project.id]}
            onClick={() => onSelect(project.id)}
          />
        ))}
      </div>
    </section>
  );
};
