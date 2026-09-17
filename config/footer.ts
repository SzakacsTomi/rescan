import type { LegalLink, SocialLinkConfig } from "@/app/types/footer";

export const socialLinks: SocialLinkConfig[] = [
  {
    href: "https://www.linkedin.com/company/rescan-innovations-sweden-ab/",
    platform: "linkedin",
    labelKey: "linkedin",
  },
];

export const legalLinks: LegalLink[] = [
  { href: "/pdfs/privacy-policy.pdf", labelKey: "privacy" },
  { href: "/pdfs/cookie-policy.pdf", labelKey: "cookies" },
];
