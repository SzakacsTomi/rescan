import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/app/components/atoms/JsonLd';
import type { CaseGridCaseCopy } from '@/app/components/organisms/projects/CaseGrid';
import type { ProjectDetailCopy } from '@/app/components/organisms/projects/ProjectDetail';
import { ProjectsTemplate } from '@/app/components/templates/ProjectsTemplate';
import { caseStudies, projects, type ProjectSector } from '@/config/projects';
import { resolvePageJsonLd, resolvePageMetadata } from '@/i18n/metadata';

const METRICS_ITEM_COUNT = 4;
const CASE_STAT_COUNT = 3;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return resolvePageMetadata((await params).locale, 'projects');
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
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

  const cards: Record<string, { title: string; description: string; eyebrow?: string }> = {};
  const details: Record<string, ProjectDetailCopy> = {};

  for (const { id } of projects) {
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

  // The index is the only part of this page that is always rendered — the two case-study
  // blocks are gated on their copy arriving — so it is what the CollectionPage lists.
  const jsonLd = await resolvePageJsonLd(locale, 'projects', {
    listItems: projects.map(({ id }) => cards[id].title),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectsTemplate
        pageTitle={t('pageTitle', { count: projectCount })}
        caseGrid={{
          sectorLabels,
          cases,
          ctaLabel: t('caseGrid.cta'),
        }}
        whyItMatters={{
          eyebrow: t('whyItMatters.eyebrow'),
          headline: t('whyItMatters.headline'),
          body: t('whyItMatters.body'),
        }}
        logoWall={{ headline: t('logoWall.headline') }}
        metrics={{
          headline: t('metrics.headline'),
          items: Array.from({ length: METRICS_ITEM_COUNT }, (_, i) => ({
            label: t(`metrics.item${i}.label`),
          })),
        }}
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
    </>
  );
}
