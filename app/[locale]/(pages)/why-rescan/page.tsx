import { getTranslations } from "next-intl/server";

import { WhyRescanTemplate } from "@/app/components/templates/WhyRescanTemplate";

const PILLAR_COUNT = 4;
const ANCHOR_COUNT = 4;
const PROOF_ROW_COUNT = 5;
const ROLE_COUNT = 6;

export default async function WhyRescanPage() {
  const [t, tc] = await Promise.all([
    getTranslations("whyRescanPage"),
    getTranslations("common"),
  ]);

  return (
    <WhyRescanTemplate
      hero={{
        eyebrow: t("hero.eyebrow"),
        headline: t("hero.headline"),
        subheadline: t("hero.subheadline"),
        anchors: Array.from({ length: ANCHOR_COUNT }, (_, i) => t(`hero.anchors.${i}`)),
        questionLabel: t("hero.questionLabel"),
        question: t("hero.question"),
        cta: t("hero.cta"),
      }}
      corePrinciple={{
        headline: t("corePrinciple.headline"),
        body: t("corePrinciple.body"),
        rolesLabel: t("corePrinciple.rolesLabel"),
        roles: Array.from({ length: ROLE_COUNT }, (_, i) => t(`corePrinciple.roles.${i}`)),
      }}
      pillars={{
        headline: t("pillars.headline"),
        monoLabel: t("pillars.monoLabel"),
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
        rows: Array.from({ length: PROOF_ROW_COUNT }, (_, i) => ({
          slot: t(`proof.item${i}.slot`),
          figure: t(`proof.item${i}.figure`),
          statement: t(`proof.item${i}.statement`),
        })),
        cta: { label: t("proof.cta"), href: "/projects" },
      }}
      focused={{
        headline: t("focused.headline"),
        note: t("focused.note"),
        items: [
          t("focused.items.0"),
          t("focused.items.1"),
          t("focused.items.2"),
        ],
        notFitLabel: t("focused.notFitLabel"),
        notFitText: t("focused.notFitText"),
      }}
      finalCta={{
        eyebrow: t("finalCta.eyebrow"),
        headline: t("finalCta.headline"),
        cta: t("finalCta.cta"),
      }}
    />
  );
}