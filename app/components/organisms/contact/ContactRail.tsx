'use client';

import type { MouseEvent } from 'react';

import { MonoLabel } from '@/app/components/atoms/MonoLabel';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { cn } from '@/lib/utils';

import type { ContactGroup } from './contactGroups';

type ContactRailProps = {
  items: ContactGroup[];
  ariaLabel: string;
};

/**
 * An index of the form's five groups. Real anchors, so it works before hydration; the active
 * state is progressive enhancement on top.
 */
export const ContactRail = ({ items, ariaLabel }: ContactRailProps) => {
  const activeId = useActiveSection(items.map((item) => item.id));

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    // CSS cannot override the JS scroll option, so the preference is read here.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <nav aria-label={ariaLabel} className="hidden lg:block">
      <ol className="border-l border-border">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => handleClick(event, item.id)}
                className="group relative flex min-h-11 items-start gap-3 rounded-sm py-2.5 pl-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {/* A leader line pulled off the rule, the way a drafter points from a note to
                    the thing it annotates. Never the only signal — see the label weight. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-4 left-0 h-px bg-primary transition-[width,opacity] duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none',
                    isActive ? 'w-4 opacity-100' : 'w-0 opacity-0',
                  )}
                />
                <MonoLabel
                  aria-hidden
                  className={cn(
                    'text-mono-xs leading-5 tracking-mono tabular-nums transition-colors duration-200',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground/70 group-hover:text-foreground/70',
                  )}
                >
                  {item.index}
                </MonoLabel>
                <span
                  className={cn(
                    'text-sm leading-5 transition-colors duration-200',
                    isActive
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground group-hover:text-foreground',
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
