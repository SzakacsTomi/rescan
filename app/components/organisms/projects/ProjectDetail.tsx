'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Building2, Maximize2, Users } from 'lucide-react';
import type { ProjectConfig } from '@/config/projects';

type ProjectDetailProps = {
  project: ProjectConfig | null;
  translations: {
    title: string;
    detail: {
      client: string;
      location: string;
      sector: string;
      scope: string;
      body: string;
    };
  } | null;
  backLabel: string;
  onClose: () => void;
};

const META_ITEMS = [
  { key: 'client' as const, icon: Users },
  { key: 'location' as const, icon: MapPin },
  { key: 'sector' as const, icon: Building2 },
  { key: 'scope' as const, icon: Maximize2 },
];

export const ProjectDetail = ({ project, translations, backLabel, onClose }: ProjectDetailProps) => {
  return (
    <AnimatePresence mode="wait">
      {project && translations && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain -webkit-overflow-scrolling-touch"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="min-h-screen">
            <div className="relative h-[50vh] sm:h-[60vh]" style={{ background: project.gradient }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              <button
                onClick={onClose}
                className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                {backLabel}
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl"
                >
                  {translations.title}
                </motion.h1>
              </div>
            </div>

            <div className="bg-slate-950 px-8 sm:px-12 py-12">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12"
                >
                  {META_ITEMS.map(({ key, icon: Icon }) => (
                    <div key={key}>
                      <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider mb-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        {key}
                      </div>
                      <p className="text-white text-sm font-medium">{translations.detail[key]}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                    {translations.detail.body}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
