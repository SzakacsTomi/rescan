'use client';

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
              'text-sm font-medium whitespace-nowrap transition-colors px-3 py-1.5 rounded-lg',
              isDark
                ? isActive
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                : isActive
                  ? 'bg-secondary text-foreground'
                  : 'text-foreground/55 hover:text-foreground hover:bg-secondary/60',
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
