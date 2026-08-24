import { getTranslations } from 'next-intl/server';

import type { CaseGridCaseCopy } from '@/app/components/organisms/projects/CaseGrid';
import type { ProjectDetailCopy } from '@/app/components/organisms/projects/ProjectDetail';
import { ProjectsTemplate } from '@/app/components/templates/ProjectsTemplate';
import { caseStudies, projects, type ProjectSector } from '@/config/projects';

const SEQUENCE_STEP_COUNT = 5;
const KEY_PROOF_COUNT = 4;
const METRICS_ITEM_COUNT = 4;
const CASE_STAT_COUNT = 3;

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

  const cases: Record<string, CaseGridCaseCopy> = {};
  for (const { id } of caseStudies) {
    cases[id] = {
      title: t(`caseGrid.${id}.title`),
      body: t(`caseGrid.${id}.body`),
      stats: Array.from({ length: CASE_STAT_COUNT }, (_, i) =>
        t(`caseGrid.${id}.stat${i}.value`),
      ) as [string, string, string],
      statLabels: Array.from({ length: CASE_STAT_COUNT }, (_, i) =>
        t(`caseGrid.${id}.stat${i}.label`),
      ) as [string, string, string],
      photoHint: t(`caseGrid.${id}.photoHint`),
    };
  }

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

  const sectorLabels: Record<ProjectSector, string> = {
    retail: t('sectorLabels.retail'),
    logistics: t('sectorLabels.logistics'),
  };

  return (
    <ProjectsTemplate
      pageTitle={t('pageTitle', { count: projectCount })}
      caseGrid={{
        sectorLabels,
        cases,
        ctaLabel: t('caseGrid.cta'),
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
      logoWall={{ headline: t('logoWall.headline') }}
      metrics={{
        headline: t('metrics.headline'),
        items: Array.from({ length: METRICS_ITEM_COUNT }, (_, i) => ({
          label: t(`metrics.item${i}.label`),
        })),
      }}
      cases={{ retail: buildCase('retail'), logistics: buildCase('logistics') }}
      index={{
        eyebrow: t('index.eyebrow'),
        headline: t('index.headline', { count: projectCount }),
        body: t('index.body'),
        columns: {
          ordinal: t('index.columns.ordinal'),
          project: t('index.columns.project'),
          sector: t('index.columns.sector'),
          location: t('index.columns.location'),
        },
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
