'use client';

import { useEffect, useState } from 'react';

/** Pushes the trigger band clear of the fixed navbar, down to where a reader's eye actually is. */
const OBSERVER_TOP_INSET = '-25%';
/** Narrows the band so the active section is the one being read, not merely the one on screen. */
const OBSERVER_BOTTOM_INSET = '-60%';

/**
 * Returns the id of the section currently being read. Falls back to the first id, and holds the
 * last known value when nothing intersects — otherwise the indicator blanks out at the end of a
 * long page.
 */
export const useActiveSection = (ids: readonly string[]): string => {
  const [activeId, setActiveId] = useState(ids[0] ?? '');
  const key = ids.join(',');

  useEffect(() => {
    const sectionIds = key.split(',').filter(Boolean);
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (targets.length === 0) return;

    const intersecting = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersecting.set(entry.target.id, entry.isIntersecting);
        }
        // Document order rather than "last entry wins", which is non-deterministic when two
        // adjacent sections straddle the band.
        const next = sectionIds.find((id) => intersecting.get(id));
        if (next) setActiveId(next);
      },
      {
        rootMargin: `${OBSERVER_TOP_INSET} 0px ${OBSERVER_BOTTOM_INSET} 0px`,
        threshold: 0,
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
};
