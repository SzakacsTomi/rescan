export const navLinks = [
  { href: '/commercial-portfolios', labelKey: 'commercial' },
  { href: '/industrial-manufacturing', labelKey: 'industrial' },
  { href: '/model-production', labelKey: 'modelProduction' },
  { href: '/projects', labelKey: 'projects' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export type NavLinkConfig = (typeof navLinks)[number];
