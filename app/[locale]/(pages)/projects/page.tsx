import { getTranslations } from 'next-intl/server';
import { ProjectsTemplate } from '@/app/components/templates/ProjectsTemplate';
import { projects } from '@/config/projects';

export default async function ProjectsPage() {
  const t = await getTranslations('projectsPage');

  const projectTranslations = Object.fromEntries(
    projects.map((p) => [
      p.id,
      {
        title: t(`${p.id}.title`),
        description: t(`${p.id}.description`),
        detail: {
          client: t(`${p.id}.detail.client`),
          location: t(`${p.id}.detail.location`),
          sector: t(`${p.id}.detail.sector`),
          scope: t(`${p.id}.detail.scope`),
          body: t(`${p.id}.detail.body`),
        },
      },
    ]),
  );

  return (
    <ProjectsTemplate
      translations={{
        hero: {
          headline: t('hero.headline'),
          subheadline: t('hero.subheadline'),
        },
        backToProjects: t('backToProjects'),
        projects: projectTranslations,
      }}
    />
  );
}
