import { CaseSquare } from "@/app/components/molecules/CaseSquare";
import { caseStudies, type ProjectSector } from "@/config/projects";

export type CaseGridCaseCopy = {
  title: string;
  body: string;
  stats: [string, string, string];
  statLabels: [string, string, string];
  photoHint: string;
};

type CaseGridProps = {
  sectorLabels: Record<ProjectSector, string>;
  cases: Record<string, CaseGridCaseCopy>;
  ctaLabel: string;
  sectorHref: Record<ProjectSector, string>;
};

/**
 * The page's hero: four equal tiles, always four — one per project, edge to edge under
 * the nav, full width and (from `lg`) full viewport height. The gap matches the home
 * page's sector split (`SectionsGrid`'s `lg:gap-0.5`) rather than the design's own wider
 * 8px, so two full-bleed hero-scale grids on the site read as the same family. Two of the
 * four tiles carry the design's own stand-in copy rather than delivered work, so their
 * title, body, stats and photo hint render through `Pending`'s unconditional amber "Todo"
 * treatment — same as every other unfilled value on the site — but the tile itself
 * always shows, unlike the CaseStudyFeature sections this replaced.
 */
export const CaseGrid = ({ sectorLabels, cases, ctaLabel, sectorHref }: CaseGridProps) => {
  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:min-h-[calc(100svh-4rem)] lg:grid-rows-2">
        {caseStudies.map((caseStudy, i) => {
          const copy = cases[caseStudy.id];

          return (
            <CaseSquare
              key={caseStudy.id}
              gradient={caseStudy.gradient}
              accent={caseStudy.accent}
              sectorLabel={sectorLabels[caseStudy.sector]}
              ordinal={String(i + 1).padStart(2, "0")}
              photoHint={copy.photoHint}
              title={copy.title}
              body={copy.body}
              stats={copy.stats.map((value, j) => ({ value, label: copy.statLabels[j] }))}
              cta={{ label: ctaLabel, href: sectorHref[caseStudy.sector] }}
            />
          );
        })}
      </div>
    </section>
  );
};
