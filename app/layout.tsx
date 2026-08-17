import type { ReactNode } from 'react';

// Deliberately renders no <html>/<body>: app/[locale]/layout.tsx owns those, so the lang
// attribute can be set from the resolved locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
