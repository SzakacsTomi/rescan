import { getTranslations } from "next-intl/server";

import { WhyRescanTemplate } from "@/app/components/templates/WhyRescanTemplate";

const PILLAR_COUNT = 4;
const PROOF_ITEM_COUNT = 4;

export default async function WhyRescanPage() {
  const [t, tc] = await Promise.all([
    getTranslations("whyRescanPage"),
    getTranslations("common"),
  ]);

  return (
    <WhyRescanTemplate
      hero={{
        headline: t("hero.headline"),
        subheadline: t("hero.subheadline"),
        cta: t("hero.cta"),
        secondaryCta: tc("viewProjects"),
      }}
      corePrinciple={{
        headline: t("corePrinciple.headline"),
        body: t("corePrinciple.body"),
      }}
      pillars={{
        headline: t("pillars.headline"),
        proofLabel: tc("proof"),
        items: Array.from({ length: PILLAR_COUNT }, (_, i) => ({
          title: t(`pillars.pillar${i}.title`),
          lead: t(`pillars.pillar${i}.lead`),
          body: t(`pillars.pillar${i}.body`),
          proof: t(`pillars.pillar${i}.proof`),
        })),
      }}
      proof={{
        headline: t("proof.headline"),
        items: Array.from({ length: PROOF_ITEM_COUNT }, (_, i) => ({
          figure: t(`proof.item${i}.figure`),
          statement: t(`proof.item${i}.statement`),
        })),
        cta: { label: t("proof.cta"), href: "/projects" },
      }}
      focused={{
        headline: t("focused.headline"),
        bestFit: {
          title: t("focused.bestFit.title"),
          items: [
            t("focused.bestFit.item0"),
            t("focused.bestFit.item1"),
            t("focused.bestFit.item2"),
          ],
        },
        notFit: {
          title: t("focused.notFit.title"),
          items: [t("focused.notFit.item0"), t("focused.notFit.item1")],
        },
      }}
      finalCta={{ headline: t("finalCta.headline"), cta: t("finalCta.cta") }}
    />
  );
}
