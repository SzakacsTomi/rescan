import { getTranslations } from "next-intl/server";
import { Logo } from "@/app/components/atoms/Logo";
import { SocialLink } from "@/app/components/atoms/SocialLink";
import { FooterNav } from "@/app/components/molecules/FooterNav";
import { footerNavLinks, socialLinks } from "@/config/footer";

export const Footer = async () => {
  const t = await getTranslations("footer");

  const resolvedNavLinks = footerNavLinks.map((link) => ({
    ...link,
    label: t(`nav.${link.labelKey}` as "nav.work" | "nav.about" | "nav.services" | "nav.contact"),
  }));

  return (
    <footer className="w-full bg-background border-t border-border py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <Logo />
        </div>

        <div>
          <FooterNav links={resolvedNavLinks} />
        </div>

        <div className="flex flex-row md:justify-end gap-4 items-center">
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
            />
          ))}
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-border text-center">
        <p className="text-foreground/40 text-sm">{t("copyright")}</p>
      </div>
    </footer>
  );
};
