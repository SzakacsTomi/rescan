import { CaseBand } from "@/app/components/molecules/CaseBand";
import { caseStudies, type ProjectSector } from "@/config/projects";

export type CaseShowcaseCaseCopy = {
  title: string;
  body: string;
  stats: [string, string, string];
  statLabels: [string, string, string];
  photoHint: string;
};

type CaseShowcaseProps = {
  sectorLabels: Record<ProjectSector, string>;
  cases: Record<string, CaseShowcaseCaseCopy>;
  ctaLabel: string;
  sectorHref: Record<ProjectSector, string>;
};

/**
 * The page's hero: the four case studies stacked as full-bleed bands, flush against the
 * nav with nothing above them. The lead band fills the viewport and the remaining
 * three sit at the design's 600px, so the page opens on one facility rather than on four
 * competing tiles. The gap matches the home page's sector split (`SectionsGrid`'s
 * `lg:gap-0.5`), keeping the two full-bleed hero-scale stacks on the site in one family.
 */
export const CaseShowcase = ({
  sectorLabels,
  cases,
  ctaLabel,
  sectorHref,
}: CaseShowcaseProps) => {
  const total = String(caseStudies.length).padStart(2, "0");

  return (
    <section className="relative w-full">
      <div className="grid gap-0.5">
        {caseStudies.map((caseStudy, i) => {
          const copy = cases[caseStudy.id];

          return (
            <CaseBand
              key={caseStudy.id}
              gradient={caseStudy.gradient}
              accent={caseStudy.accent}
              sectorLabel={sectorLabels[caseStudy.sector]}
              ordinal={String(i + 1).padStart(2, "0")}
              total={total}
              photoHint={copy.photoHint}
              title={copy.title}
              body={copy.body}
              stats={copy.stats.map((value, j) => ({ value, label: copy.statLabels[j] }))}
              cta={{ label: ctaLabel, href: sectorHref[caseStudy.sector] }}
              isLead={i === 0}
            />
          );
        })}
      </div>
    </section>
  );
};
