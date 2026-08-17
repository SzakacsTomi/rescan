import { getTranslations } from "next-intl/server";

import { SectorTemplate } from "@/app/components/templates/SectorTemplate";
import type { SectorPageTranslations } from "@/app/types/sectorPage";
import { logisticsSectorConfig } from "@/config/sectors/logistics";

const CONSEQUENCE_STEP_COUNT = 6;
const PROOF_ITEM_COUNT = 4;

export default async function LogisticsWarehousesPage() {
  const t = await getTranslations("sectorPage.logistics");

  const translations: SectorPageTranslations = {
    hero: {
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
      items: Array.from({ length: PROOF_ITEM_COUNT }, (_, i) => ({
        slot: t(`proof.item${i}.slot`),
        figure: t(`proof.item${i}.figure`),
        statement: t(`proof.item${i}.statement`),
      })),
      cta: { label: t("proof.cta"), href: "/projects" },
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

  return <SectorTemplate config={logisticsSectorConfig} translations={translations} />;
}
