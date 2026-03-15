import { CommercialHero } from "@/app/components/organisms/sector/CommercialHero";
import { SectorTemplate } from "@/app/components/templates/SectorTemplate";
import type { SectorPageTranslations } from "@/app/types/sectorPage";
import { commercialSectorConfig } from "@/config/sectors/commercial";
import { getCloudinaryFolderImages } from "@/lib/cloudinary";
import { getTranslations } from "next-intl/server";

export default async function CommercialPortfoliosPage() {
  const [t, carouselImages] = await Promise.all([
    getTranslations("sectorPage.commercial"),
    getCloudinaryFolderImages("commercial-page"),
  ]);

  const translations: SectorPageTranslations = {
    hero: {
      headline: t("hero.headline"),
      subheadline: t("hero.subheadline"),
      primaryCta: t("hero.primaryCta"),
      secondaryCta: t("hero.secondaryCta"),
    },
    coreRisk: {
      headline: t("coreRisk.headline"),
      body: t("coreRisk.body"),
    },
    friction: {
      headline: t("friction.headline"),
      body: t("friction.body"),
      points: [
        { title: t("friction.point0.title"), description: t("friction.point0.description") },
        { title: t("friction.point1.title"), description: t("friction.point1.description") },
        { title: t("friction.point2.title"), description: t("friction.point2.description") },
      ],
    },
    strategicValue: {
      headline: t("strategicValue.headline"),
      values: [
        {
          title: t("strategicValue.valueA.title"),
          description: t("strategicValue.valueA.description"),
        },
        {
          title: t("strategicValue.valueB.title"),
          description: t("strategicValue.valueB.description"),
        },
      ],
    },
    differentiator: {
      headline: t("differentiator.headline"),
      subheadline: t("differentiator.subheadline"),
    },
    namedCase: {
      label: t("namedCase.label"),
      headline: t("namedCase.headline"),
      body: t("namedCase.body"),
      bulletIntro: t("namedCase.bulletIntro"),
      bulletPoints: [
        t("namedCase.bullet0"),
        t("namedCase.bullet1"),
        t("namedCase.bullet2"),
        t("namedCase.bullet3"),
      ],
      metric: t("namedCase.metric"),
      metricLabel: t("namedCase.metricLabel"),
      quote: t("namedCase.quote"),
      quoteAuthor: t("namedCase.quoteAuthor"),
    },
    logoWall: {
      headline: t("logoWall.headline"),
    },
    metrics: {
      items: commercialSectorConfig.metrics.items.map((item, i) => ({
        label: t(`metrics.item${i}.label`),
        ...item,
      })),
    },
    fitNotFit: {
      headline: t("fitNotFit.headline"),
      bestFit: {
        title: t("fitNotFit.bestFit.title"),
        items: [
          t("fitNotFit.bestFit.item0"),
          t("fitNotFit.bestFit.item1"),
          t("fitNotFit.bestFit.item2"),
          t("fitNotFit.bestFit.item3"),
        ],
      },
      notFit: {
        title: t("fitNotFit.notFit.title"),
        items: [
          t("fitNotFit.notFit.item0"),
          t("fitNotFit.notFit.item1"),
          t("fitNotFit.notFit.item2"),
        ],
      },
    },
    finalCta: {
      headline: t("finalCta.headline"),
      subheadline: t("finalCta.subheadline"),
      cta: t("finalCta.cta"),
    },
  };

  return (
    <SectorTemplate
      config={commercialSectorConfig}
      translations={translations}
      heroOverride={
        <CommercialHero
          headline={translations.hero.headline}
          subheadline={translations.hero.subheadline}
          primaryCta={{
            label: translations.hero.primaryCta,
            href: commercialSectorConfig.hero.primaryCtaHref,
          }}
          secondaryCta={{
            label: translations.hero.secondaryCta,
            href: commercialSectorConfig.hero.secondaryCtaHref,
          }}
          scrollTargetId={commercialSectorConfig.hero.scrollTargetId}
          images={carouselImages}
        />
      }
    />
  );
}
