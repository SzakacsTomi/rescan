import type { ReactNode } from 'react';

// Minimal root layout – all routes live under app/[locale]/layout.tsx
// which renders <html> and <body> with the correct lang attribute.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
