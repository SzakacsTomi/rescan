import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { JsonLd } from "@/app/components/atoms/JsonLd";
import { WhyRescanTemplate } from "@/app/components/templates/WhyRescanTemplate";
import { resolvePageJsonLd, resolvePageMetadata } from "@/i18n/metadata";

const PROOF_ROW_COUNT = 5;
const ROLE_COUNT = 6;

const TRUST_SECTIONS = [
  { key: "repeatability", id: "repeatability", proofCount: 2 },
  { key: "coverage", id: "coverage", proofCount: 1 },
  { key: "downstreamUsefulness", id: "downstream-usefulness", proofCount: 1 },
  { key: "qualityControl", id: "quality-control", proofCount: 4 },
] as const;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return resolvePageMetadata((await params).locale, "whyRescan");
}

export default async function WhyRescanPage({ params }: PageProps) {
  const [{ locale }, t, tc] = await Promise.all([
    params,
    getTranslations("whyRescanPage"),
    getTranslations("common"),
  ]);

  const jsonLd = await resolvePageJsonLd(locale, "whyRescan");

  return (
    <>
      <JsonLd data={jsonLd} />
      <WhyRescanTemplate
        hero={{
          eyebrow: t("hero.eyebrow"),
          headline: t("hero.headline"),
          subheadline: t("hero.subheadline"),
          anchors: TRUST_SECTIONS.map(({ id }, i) => ({
            label: t(`hero.anchors.${i}`),
            href: `#${id}`,
          })),
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
        trustSections={TRUST_SECTIONS.map(({ key, id, proofCount }) => ({
          id,
          headline: t(`${key}.headline`),
          body: t(`${key}.body`),
          proofLabel: tc("proof"),
          proofs: Array.from({ length: proofCount }, (_, i) => t(`${key}.proof${i}`)),
        }))}
        proof={{
          headline: t("proof.headline"),
          rows: Array.from({ length: PROOF_ROW_COUNT }, (_, i) => ({
            slot: t(`proof.item${i}.slot`),
            figure: t(`proof.item${i}.figure`),
            statement: t(`proof.item${i}.statement`),
          })),
          cta: { label: t("proof.cta"), href: "/projects" },
        }}
        finalCta={{
          eyebrow: t("finalCta.eyebrow"),
          headline: t("finalCta.headline"),
          cta: t("finalCta.cta"),
        }}
      />
    </>
  );
}