import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { JsonLd } from "@/app/components/atoms/JsonLd";
import { LogisticsHero } from "@/app/components/organisms/sector/LogisticsHero";
import { SectorTemplate } from "@/app/components/templates/SectorTemplate";
import type { SectorPageTranslations } from "@/app/types/sectorPage";
import { logisticsSectorConfig } from "@/config/sectors/logistics";
import { resolvePageJsonLd, resolvePageMetadata } from "@/i18n/metadata";

const CONSEQUENCE_STEP_COUNT = 6;
const HERO_FACT_COUNT = 3;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return resolvePageMetadata((await params).locale, "logistics");
}

export default async function LogisticsWarehousesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("sectorPage.logistics");

  const translations: SectorPageTranslations = {
    hero: {
      eyebrow: t("hero.eyebrow"),
      headline: t("hero.headline"),
      subheadline: t("hero.subheadline"),
      primaryCta: t("hero.primaryCta"),
      secondaryCta: t("hero.secondaryCta"),
      facts: Array.from({ length: HERO_FACT_COUNT }, (_, i) => ({
        label: t(`hero.fact${i}.label`),
        value: t(`hero.fact${i}.value`),
      })),
    },
    coreRisk: {
      eyebrow: t("coreRisk.eyebrow"),
      headline: t("coreRisk.headline"),
      body: t("coreRisk.body"),
    },
    consequenceChain: {
      headline: t("consequenceChain.headline"),
      steps: Array.from({ length: CONSEQUENCE_STEP_COUNT }, (_, i) =>
        t(`consequenceChain.step${i}`),
      ),
      footnote: t("consequenceChain.footnote"),
    },
    strategicValue: {
      headline: t("strategicValue.headline"),
      body: t("strategicValue.body"),
      // The brief allows exactly these three — a fourth generic benefit is banned.
      values: (["valueA", "valueB", "valueC"] as const).map((key) => ({
        title: t(`strategicValue.${key}.title`),
        description: t(`strategicValue.${key}.description`),
      })),
    },
    proof: {
      headline: t("proof.headline"),
      items: (["item0", "item1"] as const).map((key) => ({
        slot: t(`proof.${key}.slot`),
        figure: t(`proof.${key}.figure`),
        statement: t(`proof.${key}.statement`),
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

  const jsonLd = await resolvePageJsonLd(locale, "logistics");

  return (
    <>
      <JsonLd data={jsonLd} />
      <SectorTemplate
        config={logisticsSectorConfig}
        translations={translations}
        hero={
          <LogisticsHero
            eyebrow={translations.hero.eyebrow ?? ""}
            headline={translations.hero.headline}
            subheadline={translations.hero.subheadline}
            primaryCta={{
              label: translations.hero.primaryCta,
              href: logisticsSectorConfig.hero.primaryCtaHref,
            }}
            secondaryCta={{
              label: translations.hero.secondaryCta,
              href: logisticsSectorConfig.hero.secondaryCtaHref,
            }}
            facts={translations.hero.facts ?? []}
          />
        }
      />
    </>
  );
}
