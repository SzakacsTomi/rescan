import type { FooterNavLink, SocialLinkConfig } from '@/app/types/footer';

export const footerNavLinks: FooterNavLink[] = [
  { href: '/work', labelKey: 'work' },
  { href: '/about', labelKey: 'about' },
  { href: '/services', labelKey: 'services' },
  { href: '/contact', labelKey: 'contact' },
];

export const socialLinks: SocialLinkConfig[] = [
  { href: 'https://instagram.com', platform: 'instagram', labelKey: 'instagram' },
  { href: 'https://linkedin.com', platform: 'linkedin', labelKey: 'linkedin' },
  { href: 'https://twitter.com', platform: 'twitter', labelKey: 'twitter' },
];
