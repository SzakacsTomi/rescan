import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { JsonLd } from "@/app/components/atoms/JsonLd";
import { CarouselHero } from "@/app/components/organisms/sector/CarouselHero";
import { ProofGrid } from "@/app/components/molecules/ProofGrid";
import { SectorTemplate } from "@/app/components/templates/SectorTemplate";
import type { SectorPageTranslations } from "@/app/types/sectorPage";
import { retailSectorConfig } from "@/config/sectors/retail";
import { getCloudinaryFolderImages } from "@/lib/cloudinary";
import { resolvePageJsonLd, resolvePageMetadata } from "@/i18n/metadata";

const PROOF_GRID_CELL_COUNT = 56;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return resolvePageMetadata((await params).locale, "retail");
}

export default async function RetailPropertyPortfoliosPage({ params }: PageProps) {
  const { locale } = await params;
  const [t, carouselImages] = await Promise.all([
    getTranslations("sectorPage.retail"),
    getCloudinaryFolderImages(retailSectorConfig.hero.imagesFolder ?? ""),
  ]);

  const translations: SectorPageTranslations = {
    hero: {
      eyebrow: t("hero.eyebrow"),
      headline: t("hero.headline"),
      subheadline: t("hero.subheadline"),
      primaryCta: t("hero.primaryCta"),
      secondaryCta: t("hero.secondaryCta"),
    },
    coreRisk: {
      eyebrow: t("coreRisk.eyebrow"),
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
      image: t("namedCase.image"),
      quote: t("namedCase.quote"),
      quoteAuthor: t("namedCase.quoteAuthor"),
    },
    proofCase: {
      label: t("proofCase.label"),
      headline: t("proofCase.headline"),
      body: t("proofCase.body"),
      metric: t("proofCase.metric"),
      metricLabel: t("proofCase.metricLabel"),
      image: t("proofCase.image"),
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

  const jsonLd = await resolvePageJsonLd(locale, "retail");

  return (
    <>
      <JsonLd data={jsonLd} />
      <SectorTemplate
        config={retailSectorConfig}
        translations={translations}
        hero={
          <CarouselHero
            eyebrow={translations.hero.eyebrow}
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
            images={carouselImages}
          />
        }
        coreRiskAside={
          <ProofGrid
            label={t("coreRisk.proof.label")}
            caption={t("coreRisk.proof.caption")}
            cellCount={PROOF_GRID_CELL_COUNT}
          />
        }
      />
    </>
  );
}
