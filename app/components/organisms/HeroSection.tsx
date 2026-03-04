import { getTranslations } from "next-intl/server";
import { HeroText } from "@/app/components/molecules/HeroText";
import { ScrollArrow } from "@/app/components/atoms/ScrollArrow";
import { SECTIONS_ID } from "@/app/components/organisms/SectionsGrid";

export const HeroSection = async () => {
  const t = await getTranslations("hero");

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center">
      <HeroText headline={t("headline")} subheadline={t("subheadline")} />
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <ScrollArrow targetId={SECTIONS_ID} />
      </div>
    </section>
  );
};
