import { getTranslations } from 'next-intl/server';

import type { ProjectCardCopy } from '@/app/components/molecules/ProjectCard';
import type { ProjectDetailCopy } from '@/app/components/organisms/projects/ProjectDetail';
import { ProjectsTemplate } from '@/app/components/templates/ProjectsTemplate';
import { projects } from '@/config/projects';

const KEY_PROOF_COUNT = 4;

export default async function ProjectsPage() {
  const t = await getTranslations('projectsPage');

  const detailLabels = {
    client: t('detailLabels.client'),
    location: t('detailLabels.location'),
    sector: t('detailLabels.sector'),
    scope: t('detailLabels.scope'),
  };

  const caseStudyLabels = {
    situation: t('caseStudy.situation'),
    informationGap: t('caseStudy.informationGap'),
    cost: t('caseStudy.cost'),
    established: t('caseStudy.established'),
    changed: t('caseStudy.changed'),
    keyProof: t('caseStudy.keyProof'),
  };

  const cards: Record<string, ProjectCardCopy> = {};
  const details: Record<string, ProjectDetailCopy> = {};

  for (const project of projects) {
    const { id, sector } = project;

    if (sector) {
      cards[id] = {
        title: t(`${id}.title`),
        description: t(`${id}.problem`),
        sectorLabel: t(`sectorLabels.${sector}`),
        scale: t(`${id}.scale`),
        problem: t(`${id}.problem`),
        outcome: t(`${id}.outcome`),
        ctaLabel: t('caseStudy.viewProject'),
      };
      details[id] = {
        title: t(`${id}.title`),
        caseStudy: {
          labels: caseStudyLabels,
          copy: {
            situation: t(`${id}.caseStudy.situation`),
            informationGap: t(`${id}.caseStudy.informationGap`),
            cost: t(`${id}.caseStudy.cost`),
            established: t(`${id}.caseStudy.established`),
            changed: t(`${id}.caseStudy.changed`),
            keyProof: Array.from({ length: KEY_PROOF_COUNT }, (_, i) =>
              t(`${id}.caseStudy.proof${i}`),
            ),
          },
        },
      };
      continue;
    }

    cards[id] = {
      title: t(`${id}.title`),
      description: t(`${id}.description`),
    };
    details[id] = {
      title: t(`${id}.title`),
      detail: {
        client: t(`${id}.detail.client`),
        location: t(`${id}.detail.location`),
        sector: t(`${id}.detail.sector`),
        scope: t(`${id}.detail.scope`),
        body: t(`${id}.detail.body`),
        labels: detailLabels,
      },
    };
  }

  return (
    <ProjectsTemplate
      translations={{
        hero: {
          headline: t('hero.headline'),
          subheadline: t('hero.subheadline'),
          cta: t('hero.cta'),
        },
        finalCta: {
          headline: t('finalCta.headline'),
          subheadline: t('finalCta.subheadline'),
          cta: t('finalCta.cta'),
        },
        backToProjects: t('backToProjects'),
        cards,
        details,
      }}
    />
  );
}
