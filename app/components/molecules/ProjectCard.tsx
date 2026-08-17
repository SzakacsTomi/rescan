"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Pending } from "@/app/components/atoms/Pending";
import type { ProjectConfig } from "@/config/projects";

/**
 * Two shapes, chosen by whether the project has been written to the case-study format:
 * the brief's card (sector, scale, one-line problem, one-line outcome) for those, and the
 * original title-and-description card for the fifteen references that predate it.
 */

export type ProjectCardCopy = {
  title: string;
  description: string;
  sectorLabel?: string;
  scale?: string;
  problem?: string;
  outcome?: string;
  ctaLabel?: string;
};

type ProjectCardProps = {
  project: ProjectConfig;
  copy: ProjectCardCopy;
  onClick: () => void;
};

export const ProjectCard = ({ project, copy, onClick }: ProjectCardProps) => {
  const isCaseStudy = project.sector !== undefined;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group relative w-full aspect-4/3 rounded-2xl overflow-hidden cursor-pointer text-left"
      style={{ background: project.gradient }}
    >
      {project.image && (
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.15) inset" }}
      />

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {isCaseStudy && copy.sectorLabel && (
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
            {copy.sectorLabel}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            <Pending>{copy.title}</Pending>
          </h3>

          {isCaseStudy ? (
            <div className="mt-2 flex flex-col gap-2">
              {copy.scale && (
                <p className="text-sm font-medium text-white/70">
                  <Pending>{copy.scale}</Pending>
                </p>
              )}
              {copy.problem && (
                <p className="text-sm text-white/55 line-clamp-2">
                  <Pending>{copy.problem}</Pending>
                </p>
              )}
              {copy.outcome && (
                <p className="text-sm font-medium text-white line-clamp-2">
                  <Pending>{copy.outcome}</Pending>
                </p>
              )}
              {copy.ctaLabel && (
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white/85">
                  {copy.ctaLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          ) : (
            <p className="mt-1.5 text-sm text-white/50 group-hover:text-white/70 transition-colors duration-500 line-clamp-2">
              {copy.description}
            </p>
          )}
        </div>
      </div>

      {!isCaseStudy && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-500 flex items-center justify-center">
          <ArrowUpRight
            aria-hidden
            className="w-4 h-4 text-white/0 group-hover:text-white/70 transition-all duration-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      )}
    </motion.button>
  );
};
