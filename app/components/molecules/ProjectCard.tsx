'use client';

import { motion } from 'framer-motion';
import type { ProjectConfig } from '@/config/projects';

type ProjectCardProps = {
  project: ProjectConfig;
  title: string;
  description: string;
  index: number;
  onClick: () => void;
};

export const ProjectCard = ({ project, title, description, index, onClick }: ProjectCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer text-left"
      style={{ background: project.gradient }}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: '0 0 0 1px rgba(255,255,255,0.15) inset',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">{title}</h3>
          <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-500 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-500 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white/0 group-hover:text-white/70 transition-all duration-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </motion.button>
  );
};
