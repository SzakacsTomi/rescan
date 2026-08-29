import {
  CaseShowcase,
  type CaseShowcaseCaseCopy,
} from "@/app/components/organisms/projects/CaseShowcase";
import { ProjectIndex } from "@/app/components/organisms/projects/ProjectIndex";
import { LogoWall } from "@/app/components/organisms/projects/LogoWall";
import { Metrics } from "@/app/components/organisms/projects/Metrics";
import type { ProjectDetailCopy } from "@/app/components/organisms/projects/ProjectDetail";
import { WhyItMatters } from "@/app/components/organisms/projects/WhyItMatters";
import { FinalCTA } from "@/app/components/organisms/sector/FinalCTA";
import { projects, projectsLogoWall, projectsMetrics, type ProjectSector } from "@/config/projects";

type IndexCardCopy = {
  title: string;
  description: string;
  eyebrow?: string;
};

type ProjectsTemplateProps = {
  pageTitle: string;
  caseShowcase: {
    eyebrow: string;
    sectorLabels: Record<ProjectSector, string>;
    cases: Record<string, CaseShowcaseCaseCopy>;
    ctaLabel: string;
  };
  whyItMatters: { eyebrow: string; headline: string; body: string };
  logoWall: { headline: string };
  metrics: { headline: string; items: { label: string }[] };
  index: {
    eyebrow: string;
    headline: string;
    body: string;
    columns: { ordinal: string; project: string; sector: string; location: string };
    cards: Record<string, IndexCardCopy>;
    details: Record<string, ProjectDetailCopy>;
    backLabel: string;
  };
  finalCta: { headline: string; cta: string };
};

const SECTOR_HREF: Record<ProjectSector, string> = {
  retail: "/retail-property-portfolios",
  logistics: "/logistics-warehouses",
};

export const ProjectsTemplate = ({
  pageTitle,
  caseShowcase,
  whyItMatters,
  logoWall,
  metrics,
  index,
  finalCta,
}: ProjectsTemplateProps) => {
  const items = projects.map((project) => ({
    project,
    ...index.cards[project.id],
    sectorLabel: index.details[project.id]?.detail.sector,
    location: index.details[project.id]?.detail.location,
  }));

  return (
    <>
      {/* The design opens straight on the case bands with no headline of its own — this
       *  keeps a real page heading for assistive tech and search without reintroducing one. */}
      <h1 className="sr-only">{pageTitle}</h1>

      <CaseShowcase
        eyebrow={caseShowcase.eyebrow}
        sectorLabels={caseShowcase.sectorLabels}
        cases={caseShowcase.cases}
        ctaLabel={caseShowcase.ctaLabel}
        sectorHref={SECTOR_HREF}
      />

      <LogoWall headline={logoWall.headline} logos={projectsLogoWall.logos} />

      <WhyItMatters
        eyebrow={whyItMatters.eyebrow}
        headline={whyItMatters.headline}
        body={whyItMatters.body}
      />

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
        cta={finalCta.cta}
        ctaHref="/contact"
        headlineClassName="leading-headline tracking-tight"
      />
    </>
  );
};
