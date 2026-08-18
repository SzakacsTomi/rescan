import Image from "next/image";
import type { ReactNode } from "react";

import { MediaPlaceholder } from "@/app/components/atoms/MediaPlaceholder";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { PORTRAIT_STRIPE } from "@/config/gradients";
import type { ProjectConfig } from "@/config/projects";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ProjectIndexCardProps = {
  project: ProjectConfig;
  title: string;
  description: string;
  /** Only the two written-up case studies carry one. */
  eyebrow?: string;
  /** The design gives the first cell two columns and an inline media split. */
  feature?: boolean;
  /** Present on the case studies, which link rather than open the detail overlay. */
  href?: string;
  onSelect?: () => void;
};

const FEATURE_IMAGE_SIZES = "(max-width: 1024px) 100vw, 45vw";
const STANDARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

const CELL_CLASS =
  "group bg-background text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary";

export const ProjectIndexCard = ({
  project,
  title,
  description,
  eyebrow,
  feature = false,
  href,
  onSelect,
}: ProjectIndexCardProps) => {
  const media = (
    <div
      className={cn(
        "relative overflow-hidden cursor-pointer",
        feature ? "aspect-4/3 sm:aspect-auto sm:h-full" : "aspect-4/3",
      )}
      style={{ background: project.gradient }}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={feature ? FEATURE_IMAGE_SIZES : STANDARD_IMAGE_SIZES}
        />
      ) : (
        <MediaPlaceholder stripe={PORTRAIT_STRIPE} className="absolute inset-0" />
      )}
    </div>
  );

  const body = (
    <div className={cn("flex flex-col gap-2", feature ? "justify-center p-6" : "p-5")}>
      {eyebrow && <MonoLabel className="tracking-[0.14em] text-primary">{eyebrow}</MonoLabel>}
      <h4
        className={cn(
          "font-semibold tracking-[-0.01em] transition-colors group-hover:text-primary",
          feature ? "text-lg" : "text-base",
        )}
      >
        {title}
      </h4>
      <p className="text-sm leading-[1.6] text-foreground/55">{description}</p>
    </div>
  );

  const inner: ReactNode = (
    <>
      {media}
      {body}
    </>
  );

  const layout = feature
    ? "grid grid-cols-1 sm:col-span-2 sm:grid-cols-[1.3fr_1fr]"
    : "flex flex-col";

  if (href) {
    // In-page anchors must not be locale-prefixed, so they bypass next-intl's Link.
    return href.startsWith("#") ? (
      <a href={href} className={cn(CELL_CLASS, layout)}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cn(CELL_CLASS, layout)}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onSelect} className={cn(CELL_CLASS, layout, "w-full")}>
      {inner}
    </button>
  );
};
