"use client";

import { useCallback, useRef, useState } from "react";
import { useLenis } from "lenis/react";

import { CaseBand } from "@/app/components/molecules/CaseBand";
import { CaseStudyPanel, type CaseStudyCopy } from "@/app/components/molecules/CaseStudyPanel";
import { caseStudies, type ProjectSector } from "@/config/projects";
import { contactHrefForSector } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type CaseShowcaseCaseCopy = CaseStudyCopy & {
  /** The single result line the collapsed band carries under the client's name. */
  summary: string;
};

type CaseShowcaseProps = {
  sectorLabels: Record<ProjectSector, string>;
  cases: Record<string, CaseShowcaseCaseCopy>;
  /** Every photograph in each case's Cloudinary folder, keyed by case id. Resolved on
   *  the server because listing a folder needs the Cloudinary API credentials. */
  caseImages: Record<string, string[]>;
  /** Translated `+n` figures keyed by the number a band's closing tile stands for. One set
   *  serves every band: the label depends on the number, not on the case. */
  morePropertyLabels: Record<number, string>;
  /** The word under that figure. */
  morePropertyLabel: string;
  caseStudyLabel: string;
  sectionLabels: { challenge: string; change: string; outcome: string };
  revealLabel: string;
  hideLabel: string;
  sectorLinkLabel: string;
  sectorHref: Record<ProjectSector, string>;
};

/** The navbar the opened band has to clear when the stack scrolls itself into place. */
const NAVBAR_HEIGHT_PX = 64;

/**
 * The page's hero: the four case studies stacked as full-bleed bands, flush against the
 * nav with nothing above them. Each band is half the viewport left under the navbar, so
 * the page opens on two facilities rather than on one — every band carries only a name
 * and a result line until the reader opens it, and the client's written-up study then
 * unrolls underneath that band. The gap matches the home page's sector split
 * (`SectionsGrid`'s `lg:gap-0.5`), keeping the two full-bleed hero-scale stacks on the
 * site in one family.
 *
 * Studies open independently and stay open: a reader comparing two facilities should not
 * lose the first to read the second. Nothing above an opening band moves, so the band it
 * belongs to can be brought to the top of the screen the moment it is asked for — closing
 * one instead to make room is what used to leave the reader stranded at the foot of the
 * study that had just collapsed.
 */
export const CaseShowcase = ({
  sectorLabels,
  cases,
  caseImages,
  morePropertyLabels,
  morePropertyLabel,
  caseStudyLabel,
  sectionLabels,
  revealLabel,
  hideLabel,
  sectorLinkLabel,
  sectorHref,
}: CaseShowcaseProps) => {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const bandRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lenis = useLenis();

  const scrollTo = useCallback(
    (target: HTMLElement, offsetPx: number) => {
      if (lenis) {
        lenis.scrollTo(target, { offset: -offsetPx });
        return;
      }
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offsetPx,
        behavior: "smooth",
      });
    },
    [lenis],
  );

  const toggle = useCallback(
    (id: string) => {
      const opening = !openIds.has(id);
      setOpenIds((current) => {
        const next = new Set(current);
        if (opening) next.add(id);
        else next.delete(id);
        return next;
      });

      // Only on the way open: a study collapsing has already put its band back under the
      // reader's eye, so moving the page under them as well would be the jolt.
      if (!opening) return;

      // A band lower down the stack would otherwise drop its study below the fold. Every
      // panel grows downwards, so nothing above the band has moved and its current top is
      // already where it will settle — no need to wait for the expansion to commit.
      const band = bandRefs.current[id];
      if (band) scrollTo(band, NAVBAR_HEIGHT_PX);
    },
    [openIds, scrollTo],
  );

  return (
    <section className="relative w-full">
      <div className="grid gap-0.5">
        {caseStudies.map((caseStudy, i) => {
          const copy = cases[caseStudy.id];
          const isOpen = openIds.has(caseStudy.id);
          const panelId = `case-study-${caseStudy.id}`;

          return (
            <div key={caseStudy.id}>
              <div
                ref={(node) => {
                  bandRefs.current[caseStudy.id] = node;
                }}
              >
                <CaseBand
                  gradient={caseStudy.gradient}
                  accent={caseStudy.accent}
                  sectorLabel={sectorLabels[caseStudy.sector]}
                  index={i}
                  total={caseStudies.length}
                  images={caseImages[caseStudy.id] ?? []}
                  propertyCount={caseStudy.propertyCount ?? (caseImages[caseStudy.id] ?? []).length}
                  morePropertyLabels={morePropertyLabels}
                  morePropertyLabel={morePropertyLabel}
                  priority={i === 0}
                  title={copy.title}
                  summary={copy.summary}
                  isOpen={isOpen}
                  onToggle={() => toggle(caseStudy.id)}
                  panelId={panelId}
                  revealLabel={revealLabel}
                  hideLabel={hideLabel}
                />
              </div>

              {/* Always mounted, collapsed to a zero-height grid row rather than left
                  unrendered until it is asked for: the written-up studies are the only
                  hard proof the site carries, and neither a crawler nor an answer engine
                  clicks. The height is CSS rather than a measured Framer `height: auto`
                  so the closed state is already in the server HTML — a measured
                  animation would leave every study full-height until hydration. */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
                inert={!isOpen}
              >
                <div className="overflow-hidden">
                  <CaseStudyPanel
                    id={panelId}
                    copy={copy}
                    isOpen={isOpen}
                    sectorLabel={sectorLabels[caseStudy.sector]}
                    caseStudyLabel={caseStudyLabel}
                    labels={sectionLabels}
                    contactHref={contactHrefForSector(caseStudy.sector)}
                    sectorLink={{
                      label: sectorLinkLabel,
                      href: sectorHref[caseStudy.sector],
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
