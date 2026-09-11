import { CaseBand } from "@/app/components/molecules/CaseBand";
import { caseStudies, type ProjectSector } from "@/config/projects";

export type CaseShowcaseCaseCopy = {
  title: string;
  summary: string;
  body: string;
  stats: [string, string, string];
  statLabels: [string, string, string];
  photoHint?: string;
};

type CaseShowcaseProps = {
  sectorLabels: Record<ProjectSector, string>;
  cases: Record<string, CaseShowcaseCaseCopy>;
  revealLabel: string;
  hideLabel: string;
  sectorLinkLabel: string;
  sectorHref: Record<ProjectSector, string>;
};

/**
 * The page's hero: the four case studies stacked as full-bleed bands, flush against the
 * nav with nothing above them. Each band is half the viewport left under the navbar, so
 * the page opens on two facilities rather than on one — every band carries only a name
 * and a result line until the reader opens it. The gap matches the home page's sector
 * split (`SectionsGrid`'s `lg:gap-0.5`), keeping the two full-bleed hero-scale stacks on
 * the site in one family.
 */
export const CaseShowcase = ({
  sectorLabels,
  cases,
  revealLabel,
  hideLabel,
  sectorLinkLabel,
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
              image={caseStudy.image}
              photoHint={copy.photoHint}
              priority={i === 0}
              title={copy.title}
              summary={copy.summary}
              body={copy.body}
              stats={copy.stats.map((value, j) => ({ value, label: copy.statLabels[j] }))}
              revealLabel={revealLabel}
              hideLabel={hideLabel}
              sectorLink={{ label: sectorLinkLabel, href: sectorHref[caseStudy.sector] }}
            />
          );
        })}
      </div>
    </section>
  );
};
