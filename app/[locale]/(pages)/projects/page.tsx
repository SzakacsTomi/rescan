import { getTranslations } from 'next-intl/server';

import type { ProjectDetailCopy } from '@/app/components/organisms/projects/ProjectDetail';
import { ProjectsTemplate } from '@/app/components/templates/ProjectsTemplate';
import { projects, type ProjectSector } from '@/config/projects';

const HERO_STAT_COUNT = 4;
const SEQUENCE_STEP_COUNT = 5;
const KEY_PROOF_COUNT = 4;

/** The one hero figure the repo can prove for itself; the rest are client-supplied. */
const PROJECT_COUNT_STAT_INDEX = 0;

/** The brief's first four questions. The fifth, "What Changed", is the promoted panel. */
const CASE_BODY_KEYS = ['situation', 'informationGap', 'cost', 'established'] as const;

/** Retail names step 02 an information gap; the logistics brief calls the same slot complexity. */
const CASE_ROW_LABEL_KEYS: Record<ProjectSector, readonly string[]> = {
  retail: ['situation', 'informationGap', 'cost', 'established'],
  logistics: ['situation', 'complexity', 'cost', 'established'],
};

const CASE_IDS: Record<ProjectSector, string> = {
  retail: 'caseRetail0',
  logistics: 'caseLogistics0',
};

export default async function ProjectsPage() {
  const t = await getTranslations('projectsPage');
  const projectCount = projects.length;

  const buildCase = (sector: ProjectSector) => {
    const id = CASE_IDS[sector];

    return {
      eyebrow: t(`cases.${sector}.eyebrow`),
      title: t(`${id}.title`),
      meta: [t(`${id}.scale`), t(`${id}.region`)] as [string, string],
      rows: CASE_BODY_KEYS.map((key, i) => ({
        label: t(`caseStudy.${CASE_ROW_LABEL_KEYS[sector][i]}`),
        copy: t(`${id}.caseStudy.${key}`),
      })),
      changedSlot: t('caseStudy.changedSlot'),
      changed: t(`${id}.caseStudy.changed`),
      imageHint: t(`cases.${sector}.image`),
      keyProofLabel: t('caseStudy.keyProof'),
      keyProof: Array.from({ length: KEY_PROOF_COUNT }, (_, i) =>
        t(`${id}.caseStudy.proof${i}`),
      ),
      viewProject: t('caseStudy.viewProject'),
    };
  };

  const cards: Record<string, { title: string; description: string; eyebrow?: string }> = {};
  const details: Record<string, ProjectDetailCopy> = {};

  for (const { id, sector } of projects) {
    if (sector) {
      cards[id] = {
        title: t(`sectorLabels.${sector}`),
        description: t(`index.${id}.description`),
        eyebrow: t('index.caseCardLabel'),
      };
      continue;
    }

    cards[id] = { title: t(`${id}.title`), description: t(`${id}.description`) };
    details[id] = {
      title: t(`${id}.title`),
      detail: {
        client: t(`${id}.detail.client`),
        location: t(`${id}.detail.location`),
        sector: t(`${id}.detail.sector`),
        scope: t(`${id}.detail.scope`),
        body: t(`${id}.detail.body`),
        labels: {
          client: t('detailLabels.client'),
          location: t('detailLabels.location'),
          sector: t('detailLabels.sector'),
          scope: t('detailLabels.scope'),
        },
      },
    };
  }

  return (
    <ProjectsTemplate
      hero={{
        eyebrow: t('hero.eyebrow'),
        headline: t('hero.headline', { count: projectCount }),
        subheadline: t('hero.subheadline'),
        ctaPrimary: t('hero.ctaPrimary'),
        ctaSecondary: t('hero.ctaSecondary'),
        stats: Array.from({ length: HERO_STAT_COUNT }, (_, i) => ({
          value:
            i === PROJECT_COUNT_STAT_INDEX ? String(projectCount) : t(`hero.stat${i}.value`),
          label: t(`hero.stat${i}.label`),
        })),
      }}
      sequence={{
        eyebrow: t('sequence.eyebrow'),
        headline: t('sequence.headline'),
        body: t('sequence.body'),
        steps: Array.from({ length: SEQUENCE_STEP_COUNT }, (_, i) => ({
          title: t(`sequence.step${i}.title`),
          question: t(`sequence.step${i}.question`),
        })),
      }}
      cases={{ retail: buildCase('retail'), logistics: buildCase('logistics') }}
      index={{
        eyebrow: t('index.eyebrow'),
        headline: t('index.headline', { count: projectCount }),
        body: t('index.body'),
        cards,
        details,
        backLabel: t('backToProjects'),
      }}
      finalCta={{
        headline: t('finalCta.headline'),
        subheadline: t('finalCta.subheadline'),
        cta: t('finalCta.cta'),
      }}
    />
  );
}
