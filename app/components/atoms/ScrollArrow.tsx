'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ScrollArrowProps = {
  targetId: string;
};

export const ScrollArrow = ({ targetId }: ScrollArrowProps) => {
  const t = useTranslations('hero');

  const handleClick = () => {
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label={t('scrollHint')}
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-2 text-foreground/60 hover:text-foreground transition-colors cursor-pointer bg-transparent border-0"
    >
      <span className="text-xs tracking-widest uppercase">{t('scrollHint')}</span>
      <ChevronDown className="w-5 h-5" />
    </motion.button>
  );
};
