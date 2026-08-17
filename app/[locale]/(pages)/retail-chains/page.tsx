import { getTranslations } from "next-intl/server";

import { CarouselHero } from "@/app/components/organisms/sector/CarouselHero";
import { SectorTemplate } from "@/app/components/templates/SectorTemplate";
import type { SectorPageTranslations } from "@/app/types/sectorPage";
import { retailSectorConfig } from "@/config/sectors/retail";
import { getCloudinaryFolderImages } from "@/lib/cloudinary";

export default async function RetailChainsPage() {
  const [t, carouselImages] = await Promise.all([
    getTranslations("sectorPage.retail"),
    getCloudinaryFolderImages(retailSectorConfig.hero.imagesFolder ?? ""),
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
    strategicValue: {
      headline: t("strategicValue.headline"),
      body: t("strategicValue.body"),
      values: (["valueA", "valueB", "valueC", "valueD"] as const).map((key) => ({
        title: t(`strategicValue.${key}.title`),
        description: t(`strategicValue.${key}.description`),
      })),
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
      items: (retailSectorConfig.metrics?.items ?? []).map((_, i) => ({
        label: t(`metrics.item${i}.label`),
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
      cta: t("finalCta.cta"),
    },
  };

  return (
    <SectorTemplate
      config={retailSectorConfig}
      translations={translations}
      heroOverride={
        <CarouselHero
          headline={translations.hero.headline}
          subheadline={translations.hero.subheadline}
          primaryCta={{
            label: translations.hero.primaryCta,
            href: retailSectorConfig.hero.primaryCtaHref,
          }}
          secondaryCta={{
            label: translations.hero.secondaryCta,
            href: retailSectorConfig.hero.secondaryCtaHref,
          }}
          scrollTargetId={retailSectorConfig.hero.scrollTargetId}
          images={carouselImages}
        />
      }
    />
  );
}
