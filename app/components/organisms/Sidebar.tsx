'use client';

import type { ReactNode } from 'react';

type SidebarProps = {
  children?: ReactNode;
  isOpen?: boolean;
};

export const Sidebar = ({ children, isOpen = false }: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-50 overflow-y-auto">
      <div className="p-6">{children}</div>
    </aside>
  );
};
