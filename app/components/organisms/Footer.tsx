import { getTranslations } from "next-intl/server";
import { SocialLink } from "@/app/components/atoms/SocialLink";
import { legalLinks, socialLinks } from "@/config/footer";
import { Logo } from "../atoms/Logo";

export const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="px-6 py-12 grid grid-cols-1 sm:grid-cols-3 items-center gap-8">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-foreground/45 text-sm leading-relaxed text-pretty">{t("tagline")}</p>
        </div>

        <div className="flex flex-col items-start sm:items-center gap-1.5">
          <p className="text-foreground/40 text-sm">{t("copyright")}</p>
          <div className="flex items-center gap-3">
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
          </div>
        </div>

        <div className="flex gap-6 sm:justify-end">
          {socialLinks.map((social) => (
            <SocialLink
              key={social.platform}
              config={social}
              label={t(
                `social.${social.labelKey}` as
                  | "social.instagram"
                  | "social.linkedin"
                  | "social.twitter",
              )}
              size="lg"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};
