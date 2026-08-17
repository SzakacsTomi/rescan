import type { LegalLink, SocialLinkConfig } from "@/app/types/footer";

export const socialLinks: SocialLinkConfig[] = [
  { href: "https://instagram.com", platform: "instagram", labelKey: "instagram" },
  { href: "https://linkedin.com", platform: "linkedin", labelKey: "linkedin" },
  { href: "https://twitter.com", platform: "twitter", labelKey: "twitter" },
];

export const legalLinks: LegalLink[] = [
  { href: "/pdfs/privacy-policy.pdf", labelKey: "privacy" },
  { href: "/pdfs/cookie-policy.pdf", labelKey: "cookies" },
];
