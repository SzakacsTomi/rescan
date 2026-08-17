'use client';

import { motion } from 'framer-motion';
import { PILL_SPRING_TRANSITION } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';

type NavLinksProps = {
  links: { href: string; label: string }[];
  variant?: 'light' | 'dark';
};

export const NavLinks = ({ links, variant = 'light' }: NavLinksProps) => {
  const pathname = usePathname();
  const isDark = variant === 'dark';

  return (
    <div className="flex items-center gap-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'relative text-sm font-medium whitespace-nowrap transition-colors px-3 py-1.5 rounded-lg',
              isActive
                ? 'text-primary-foreground'
                : isDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-foreground/55 hover:text-foreground hover:bg-secondary/60',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-lg bg-primary"
                transition={PILL_SPRING_TRANSITION}
              />
            )}
            <span className="relative">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
