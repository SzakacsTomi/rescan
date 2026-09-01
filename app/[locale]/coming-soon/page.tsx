import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ComingSoonTemplate } from "@/app/components/templates/ComingSoonTemplate";

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

export default function ComingSoonPage() {
  return <ComingSoonTemplate />;
}
