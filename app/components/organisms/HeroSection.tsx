import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ScrollArrow } from "@/app/components/atoms/ScrollArrow";
import { HeroText } from "@/app/components/molecules/HeroText";
import { SECTIONS_ID } from "@/app/components/organisms/SectionsGrid";
import { sectionsConfig } from "@/config/sections";
import { Link } from "@/i18n/navigation";

export const HeroSection = async () => {
  const t = await getTranslations("homePage");

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center">
      <HeroText headline={t("hero.headline")} subheadline={t("hero.subheadline")} />

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 px-6">
        {sectionsConfig.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium hover:bg-muted transition-colors"
          >
            {t(`sectors.${section.id}.title`)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        ))}
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
        >
          {t("hero.primaryCta")}
        </Link>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <ScrollArrow targetId={SECTIONS_ID} />
      </div>
    </section>
  );
};
