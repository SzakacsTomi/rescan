import { getTranslations } from "next-intl/server";
import { Footer } from "@/app/components/organisms/Footer";
import { NavBar } from "@/app/components/organisms/NavBar";
import { NotFoundHero } from "@/app/components/organisms/NotFoundHero";
import { navLinks } from "@/config/nav";

export const NotFoundTemplate = async () => {
  const [t, tNav] = await Promise.all([
    getTranslations("notFoundPage"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <NavBar />
      <div className="pt-16 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col">
          <NotFoundHero
            code={t("code")}
            headline={t("headline")}
            subheadline={t("subheadline")}
            cta={t("cta")}
            linksLabel={t("linksLabel")}
            links={navLinks.map((link) => ({ href: link.href, label: tNav(link.labelKey) }))}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};
