import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ComingSoonTemplate } from "@/app/components/templates/ComingSoonTemplate";
import { isSiteGateEnabled } from "@/config/comingSoon";

// Outside the SEO route registry (config/routes.ts) on purpose, same as not-found.tsx —
// this is the gate proxy.ts redirects to, not indexable content, so it never belongs in
// the sitemap or a hreflang set.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("comingSoonPage");

  return {
    title: t("metaTitle"),
    robots: { index: false, follow: false },
  };
}

// A deployment with no SITE_PREVIEW_SECRET has no gate, so this page has nothing to
// announce and stops existing rather than sitting there as a reachable dead end.
export default function ComingSoonPage() {
  if (!isSiteGateEnabled()) {
    notFound();
  }

  return <ComingSoonTemplate />;
}
