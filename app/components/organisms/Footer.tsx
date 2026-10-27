import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CookiePreferencesButton } from "@/app/components/atoms/CookiePreferencesButton";
import { SocialLink } from "@/app/components/atoms/SocialLink";
import { legalLinks, membership, socialLinks } from "@/config/footer";
import { Logo } from "../atoms/Logo";

export const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="px-6 py-12 flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 max-w-sm">
          <Logo />
          <p className="text-foreground/45 text-sm leading-relaxed text-pretty">{t("tagline")}</p>
        </div>

        {/* The badge's lettering is under a tenth of its height, so it needs ~96px of height
            before "German-Swedish Chamber of Commerce" is legible at all. */}
        <a
          href={membership.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block self-start sm:self-auto transition-transform duration-500 ease-brand hover:-translate-y-1 focus-visible:-translate-y-1"
        >
          <Image
            src={membership.src}
            alt={t("membership.alt")}
            width={membership.width}
            height={membership.height}
            className="h-24 w-auto lg:h-28"
          />
        </a>
      </div>

      <div className="px-6 py-6 border-t border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="text-foreground/40 text-sm">{t("copyright")}</p>
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground/70 transition-colors text-sm"
            >
              {t(`legal.${link.labelKey}` as "legal.privacy" | "legal.cookies")}
            </a>
          ))}
          <CookiePreferencesButton
            label={t("cookieSettings")}
            className="cursor-pointer text-foreground/40 hover:text-foreground/70 transition-colors text-sm"
          />
        </div>

        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <SocialLink
              key={social.platform}
              config={social}
              label={t(`social.${social.labelKey}` as "social.linkedin")}
              size="lg"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};
