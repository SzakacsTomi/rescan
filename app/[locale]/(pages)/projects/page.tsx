import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/app/components/atoms/JsonLd';
import type { CaseShowcaseCaseCopy } from '@/app/components/organisms/projects/CaseShowcase';
import type { ProjectDetailCopy } from '@/app/components/organisms/projects/ProjectDetail';
import { ProjectsTemplate } from '@/app/components/templates/ProjectsTemplate';
import { caseStudies, projects, type ProjectSector } from '@/config/projects';
import { cloudinaryImageUrl, getCloudinaryFolderPublicIds } from '@/lib/cloudinary';
import { resolvePageJsonLd, resolvePageMetadata } from '@/i18n/metadata';

const METRICS_ITEM_COUNT = 4;
const CASE_STAT_COUNT = 3;

/**
 * How a case band's photographs are delivered. Both keep the quality high and leave the
 * format alone: Next re-encodes every frame anyway, and stacking Cloudinary's lossy pass
 * under that one is what makes a frame look washed.
 *
 * A folder of several images becomes a lattice of thumbnails, so the source only needs
 * capping — 2000px, rather than letting the optimiser pull the 5000px originals a couple
 * of these folders hold — and a light sharpen to recover what the downscale costs.
 *
 * A folder of one fills the band edge to edge, so the frame is asked for at band scale
 * rather than capped: `c_scale` resizes in both directions, which matters because a source
 * shorter than the band still has to cover it and Cloudinary resamples that scale-up far
 * better than the browser stretching the file across 1920px. It cannot invent detail that
 * was never there, though — a band whose single photograph looks soft needs a bigger
 * original, not a different transformation.
 */
const LATTICE_TRANSFORMATION = 'c_limit,w_2000,e_sharpen:40,q_90';
const FULL_BAND_TRANSFORMATION = 'c_scale,w_2560,e_sharpen:40,q_90';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return resolvePageMetadata((await params).locale, 'projects');
}

export default async function ProjectsPage({ params }: PageProps) {
  const [{ locale }, t, caseFolders] = await Promise.all([
    params,
    getTranslations('projectsPage'),
    Promise.all(caseStudies.map(({ imagesFolder }) => getCloudinaryFolderPublicIds(imagesFolder))),
  ]);
  const projectCount = projects.length;

  const cases: Record<string, CaseShowcaseCaseCopy> = {};
  const caseImages: Record<string, string[]> = {};
  for (const [i, { id }] of caseStudies.entries()) {
    const transformation =
      caseFolders[i].length > 1 ? LATTICE_TRANSFORMATION : FULL_BAND_TRANSFORMATION;
    caseImages[id] = caseFolders[i].map((publicId) =>
      cloudinaryImageUrl(publicId, transformation),
    );
    cases[id] = {
      title: t(`caseShowcase.${id}.title`),
      summary: t(`caseShowcase.${id}.summary`),
      body: t(`caseShowcase.${id}.body`),
      stats: Array.from({ length: CASE_STAT_COUNT }, (_, j) =>
        t(`caseShowcase.${id}.stat${j}.value`),
      ) as [string, string, string],
      statLabels: Array.from({ length: CASE_STAT_COUNT }, (_, j) =>
        t(`caseShowcase.${id}.stat${j}.label`),
      ) as [string, string, string],
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
        caseShowcase={{
          sectorLabels,
          cases,
          caseImages,
          revealLabel: t('caseShowcase.reveal'),
          hideLabel: t('caseShowcase.hide'),
          sectorLinkLabel: t('caseShowcase.sectorLink'),
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
          headline: t('index.headline'),
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
          cta: t('finalCta.cta'),
        }}
      />
    </>
  );
}
