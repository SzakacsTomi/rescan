import { placeholdersVisible } from "@/app/components/atoms/Pending";
import {
  CaseGrid,
  type CaseGridCaseCopy,
} from "@/app/components/organisms/projects/CaseGrid";
import {
  CASE_ANCHOR_ID,
  CaseStudyFeature,
  type CaseStudyRow,
} from "@/app/components/organisms/projects/CaseStudyFeature";
import { CaseStudySequence } from "@/app/components/organisms/projects/CaseStudySequence";
import { ProjectIndex } from "@/app/components/organisms/projects/ProjectIndex";
import { LogoWall } from "@/app/components/organisms/projects/LogoWall";
import { Metrics } from "@/app/components/organisms/projects/Metrics";
import type { ProjectDetailCopy } from "@/app/components/organisms/projects/ProjectDetail";
import { FinalCTA } from "@/app/components/organisms/sector/FinalCTA";
import { projects, projectsLogoWall, projectsMetrics, type ProjectSector } from "@/config/projects";

type CaseCopy = {
  eyebrow: string;
  title: string;
  meta: [string, string];
  rows: CaseStudyRow[];
  changedSlot: string;
  changed: string;
  imageHint: string;
  keyProofLabel: string;
  keyProof: string[];
  viewProject: string;
};

type IndexCardCopy = {
  title: string;
  description: string;
  eyebrow?: string;
};

type ProjectsTemplateProps = {
  pageTitle: string;
  caseGrid: {
    sectorLabels: Record<ProjectSector, string>;
    cases: Record<string, CaseGridCaseCopy>;
    ctaLabel: string;
  };
  sequence: {
    eyebrow: string;
    headline: string;
    body: string;
    steps: { title: string; question: string }[];
  };
  logoWall: { headline: string };
  metrics: { headline: string; items: { label: string }[] };
  cases: Record<ProjectSector, CaseCopy>;
  index: {
    eyebrow: string;
    headline: string;
    body: string;
    columns: { ordinal: string; project: string; sector: string; location: string };
    cards: Record<string, IndexCardCopy>;
    details: Record<string, ProjectDetailCopy>;
    backLabel: string;
  };
  finalCta: { headline: string; subheadline: string; cta: string };
};

const SECTOR_HREF: Record<ProjectSector, string> = {
  retail: "/retail-property-portfolios",
  logistics: "/logistics-warehouses",
};

const CASE_SECTORS: ProjectSector[] = ["retail", "logistics"];

export const ProjectsTemplate = ({
  pageTitle,
  caseGrid,
  sequence,
  logoWall,
  metrics,
  cases,
  index,
  finalCta,
}: ProjectsTemplateProps) => {
  // Both case studies are still entirely `[[TODO]]`, so they follow the same rule as every
  // other unfilled section: shown on preview, absent in production. Their index cards carry
  // real copy either way, and fall back to the sector page when there is nothing to scroll to.
  const items = projects.map((project) => ({
    project,
    ...index.cards[project.id],
    sectorLabel: index.details[project.id]?.detail.sector,
    location: index.details[project.id]?.detail.location,
    href: project.sector
      ? placeholdersVisible
        ? `#${CASE_ANCHOR_ID[project.sector]}`
        : SECTOR_HREF[project.sector]
      : undefined,
  }));

  return (
    <>
      {/* The design opens straight on the case grid with no visual hero — this keeps a
       *  real page heading for assistive tech and search without reintroducing one. */}
      <h1 className="sr-only">{pageTitle}</h1>

      <CaseGrid
        sectorLabels={caseGrid.sectorLabels}
        cases={caseGrid.cases}
        ctaLabel={caseGrid.ctaLabel}
        sectorHref={SECTOR_HREF}
      />

      <LogoWall headline={logoWall.headline} logos={projectsLogoWall.logos} />

      <CaseStudySequence
        eyebrow={sequence.eyebrow}
        headline={sequence.headline}
        body={sequence.body}
        steps={sequence.steps}
      />

      {placeholdersVisible &&
        CASE_SECTORS.map((sector) => (
          <CaseStudyFeature
            key={sector}
            sector={sector}
            {...cases[sector]}
            viewProject={{ label: cases[sector].viewProject, href: SECTOR_HREF[sector] }}
          />
        ))}

      <Metrics
        headline={metrics.headline}
        items={metrics.items.map((item, i) => ({
          ...item,
          value: projectsMetrics.items[i].value,
        }))}
      />

      <ProjectIndex
        eyebrow={index.eyebrow}
        headline={index.headline}
        body={index.body}
        columns={index.columns}
        items={items}
        details={index.details}
        backLabel={index.backLabel}
      />

      <FinalCTA
        headline={finalCta.headline}
        subheadline={finalCta.subheadline}
        cta={finalCta.cta}
        ctaHref="/contact"
        headlineClassName="leading-headline tracking-tight"
        subheadlineClassName="max-w-160"
      />
    </>
  );
};
