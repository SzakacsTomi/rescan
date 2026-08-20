import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { MediaPlaceholder } from "@/app/components/atoms/MediaPlaceholder";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { PORTRAIT_STRIPE } from "@/config/gradients";
import type { ProjectConfig } from "@/config/projects";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ProjectIndexRowProps = {
  project: ProjectConfig;
  /** Zero-padded position in the index, rendered as the row's mono ordinal. */
  ordinal: string;
  title: string;
  description: string;
  /** Read off the project's own detail copy; the two case studies carry neither. */
  sectorLabel?: string;
  location?: string;
  /** Only the written-up case studies carry one. */
  eyebrow?: string;
  /** Present on the case studies, which link rather than open the detail overlay. */
  href?: string;
  onSelect?: () => void;
  /** Fired on pointer entry so the section can place its cursor preview. */
  onPoint?: (event: { clientX: number; clientY: number }) => void;
};

const THUMBNAIL_SIZES = "(max-width: 640px) 64px, 80px";

/** Below `lg` the row carries its own thumbnail; from `lg` the cursor-following preview
 *  takes over and the columns of the ledger open up in its place. */
const ROW_CLASS =
  "group relative flex w-full items-center gap-3 border-b border-border px-3 py-5 text-left sm:gap-4" +
  "transition-colors duration-300 hover:bg-background " +
  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary " +
  "lg:grid lg:grid-cols-[3.5rem_minmax(0,1fr)_9rem_11rem_1.5rem] lg:items-baseline lg:gap-8 lg:px-4 lg:py-6 cursor-pointer";

export const ProjectIndexRow = ({
  project,
  ordinal,
  title,
  description,
  sectorLabel,
  location,
  eyebrow,
  href,
  onSelect,
  onPoint,
}: ProjectIndexRowProps) => {
  const meta = [ordinal, sectorLabel, location].filter(Boolean).join(" · ");

  const inner: ReactNode = (
    <>
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100"
      />

      <span
        className="relative h-12 w-16 shrink-0 overflow-hidden sm:h-14 sm:w-20 lg:hidden"
        style={{ background: project.gradient }}
      >
        {project.image ? (
          <Image src={project.image} alt="" fill className="object-cover" sizes={THUMBNAIL_SIZES} />
        ) : (
          <MediaPlaceholder stripe={PORTRAIT_STRIPE} className="absolute inset-0" />
        )}
      </span>

      <MonoLabel
        aria-hidden
        className="hidden text-foreground/35 transition-colors duration-300 group-hover:text-primary lg:block"
      >
        {ordinal}
      </MonoLabel>

      <span className="min-w-0 flex-1">
        <MonoLabel aria-hidden className="text-foreground/35 lg:hidden">
          {meta}
        </MonoLabel>
        {eyebrow && (
          <MonoLabel className="mt-1.5 block tracking-mono-lg text-primary lg:mt-0">
            {eyebrow}
          </MonoLabel>
        )}
        <span
          className={cn(
            "mt-1.5 block text-note font-semibold tracking-note transition-colors duration-300 group-hover:text-primary lg:mt-0 lg:text-base",
            eyebrow && "lg:mt-1.5",
          )}
        >
          {title}
        </span>
        <span className="mt-1 block text-caption leading-body text-foreground/50">
          {description}
        </span>
      </span>

      <span className="hidden text-caption leading-body text-foreground/55 lg:block">
        {sectorLabel}
      </span>
      <span className="hidden text-caption leading-body text-foreground/55 lg:block">
        {location}
      </span>

      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 text-primary transition-all duration-300 lg:-translate-x-2 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100"
      />
    </>
  );

  const handlers = { onPointerEnter: onPoint };

  if (href) {
    // In-page anchors must not be locale-prefixed, so they bypass next-intl's Link.
    return href.startsWith("#") ? (
      <a href={href} className={ROW_CLASS} {...handlers}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={ROW_CLASS} {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onSelect} className={ROW_CLASS} {...handlers}>
      {inner}
    </button>
  );
};
