import { placeholdersVisible } from "@/app/components/atoms/Pending";
import {
  CASE_ANCHOR_ID,
  CaseStudyFeature,
  type CaseStudyRow,
} from "@/app/components/organisms/projects/CaseStudyFeature";
import {
  CaseStudySequence,
  SEQUENCE_ID,
} from "@/app/components/organisms/projects/CaseStudySequence";
import {
  PROJECT_INDEX_ID,
  ProjectIndex,
} from "@/app/components/organisms/projects/ProjectIndex";
import type { ProjectDetailCopy } from "@/app/components/organisms/projects/ProjectDetail";
import { ProjectsHero } from "@/app/components/organisms/projects/ProjectsHero";
import { FinalCTA } from "@/app/components/organisms/sector/FinalCTA";
import { projects, type ProjectSector } from "@/config/projects";

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
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    stats: { value: string; label: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  sequence: {
    eyebrow: string;
    headline: string;
    body: string;
    steps: { title: string; question: string }[];
  };
  cases: Record<ProjectSector, CaseCopy>;
  index: {
    eyebrow: string;
    headline: string;
    body: string;
    cards: Record<string, IndexCardCopy>;
    details: Record<string, ProjectDetailCopy>;
    backLabel: string;
  };
  finalCta: { headline: string; subheadline: string; cta: string };
};

const SECTOR_HREF: Record<ProjectSector, string> = {
  retail: "/retail-chains",
  logistics: "/logistics-warehouses",
};

const CASE_SECTORS: ProjectSector[] = ["retail", "logistics"];

export const ProjectsTemplate = ({
  hero,
  sequence,
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
    href: project.sector
      ? placeholdersVisible
        ? `#${CASE_ANCHOR_ID[project.sector]}`
        : SECTOR_HREF[project.sector]
      : undefined,
  }));

  return (
    <>
      <ProjectsHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        stats={hero.stats}
        primaryCta={{ label: hero.ctaPrimary, href: `#${PROJECT_INDEX_ID}` }}
        secondaryCta={{ label: hero.ctaSecondary, href: `#${SEQUENCE_ID}` }}
      />

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

      <ProjectIndex
        eyebrow={index.eyebrow}
        headline={index.headline}
        body={index.body}
        items={items}
        details={index.details}
        backLabel={index.backLabel}
      />

      <FinalCTA
        headline={finalCta.headline}
        subheadline={finalCta.subheadline}
        cta={finalCta.cta}
        ctaHref="/contact"
        headlineClassName="leading-[1.1] tracking-[-0.03em]"
        subheadlineClassName="max-w-160"
      />
    </>
  );
};
