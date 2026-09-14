"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";

import { CaseBand } from "@/app/components/molecules/CaseBand";
import { CaseStudyPanel, type CaseStudyCopy } from "@/app/components/molecules/CaseStudyPanel";
import { caseStudies, type ProjectSector } from "@/config/projects";
import { contactHrefForSector } from "@/lib/contact";

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
  /** Translated `+n more` labels keyed by how many photographs a band's strip leaves out.
   *  One set serves every band: the label depends on the number dropped, not on the case. */
  moreImageLabels: Record<number, string>;
  /** What a band's `+n more` tile does, for assistive tech. */
  openGalleryLabel: string;
  caseStudyLabel: string;
  sectionLabels: { challenge: string; change: string; outcome: string };
  revealLabel: string;
  hideLabel: string;
  sectorLinkLabel: string;
  sectorHref: Record<ProjectSector, string>;
};

/** The navbar the opened band has to clear when the stack scrolls itself into place. */
const NAVBAR_HEIGHT_PX = 64;
/** Room above a gallery brought into view, so its label is not flush under the navbar. */
const GALLERY_HEADROOM_PX = 24;

const galleryDomId = (id: string) => `case-gallery-${id}`;

const PANEL_EXPAND_S = 0.5;
const PANEL_EXPAND_MS = PANEL_EXPAND_S * 1000;
/** The same symmetric curve the bands sweep on, so the panel unrolling reads as part of
 *  the same motion language rather than a stock accordion. */
const PANEL_EASE = [0.4, 0, 0.2, 1] as const;

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
  moreImageLabels,
  openGalleryLabel,
  caseStudyLabel,
  sectionLabels,
  revealLabel,
  hideLabel,
  sectorLinkLabel,
  sectorHref,
}: CaseShowcaseProps) => {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const [galleryIds, setGalleryIds] = useState<ReadonlySet<string>>(() => new Set());
  /** A gallery asked for from a band, waiting on the panel that holds it to finish opening. */
  const [pendingGallery, setPendingGallery] = useState<{ id: string; delayMs: number } | null>(
    null,
  );
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

  const toggleGallery = useCallback((id: string) => {
    setGalleryIds((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }, []);

  /** The band's own `+n more`: open the study if it is closed, unroll the gallery, and take
   *  the reader to it — they asked for the photographs, not for the top of the write-up. */
  const openGallery = useCallback(
    (id: string) => {
      setOpenIds((current) => (current.has(id) ? current : new Set(current).add(id)));
      setGalleryIds((current) => (current.has(id) ? current : new Set(current).add(id)));
      setPendingGallery({ id, delayMs: openIds.has(id) ? 0 : PANEL_EXPAND_MS });
    },
    [openIds],
  );

  useEffect(() => {
    if (!pendingGallery) return;

    // The gallery sits inside a panel that may still be unrolling, so it has no position
    // worth scrolling to until that has finished; its own height animation runs underneath.
    const timer = setTimeout(() => {
      const gallery = document.getElementById(galleryDomId(pendingGallery.id));
      if (gallery) scrollTo(gallery, NAVBAR_HEIGHT_PX + GALLERY_HEADROOM_PX);
      setPendingGallery(null);
    }, pendingGallery.delayMs);

    return () => clearTimeout(timer);
  }, [pendingGallery, scrollTo]);

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
                  moreImageLabels={moreImageLabels}
                  openGalleryLabel={openGalleryLabel}
                  onOpenGallery={() => openGallery(caseStudy.id)}
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

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={panelId}
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: PANEL_EXPAND_S, ease: PANEL_EASE }}
                  >
                    <CaseStudyPanel
                      id={panelId}
                      copy={copy}
                      sectorLabel={sectorLabels[caseStudy.sector]}
                      caseStudyLabel={caseStudyLabel}
                      labels={sectionLabels}
                      contactHref={contactHrefForSector(caseStudy.sector)}
                      sectorLink={{
                        label: sectorLinkLabel,
                        href: sectorHref[caseStudy.sector],
                      }}
                      images={caseImages[caseStudy.id] ?? []}
                      isGalleryOpen={galleryIds.has(caseStudy.id)}
                      onToggleGallery={() => toggleGallery(caseStudy.id)}
                      galleryId={galleryDomId(caseStudy.id)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
