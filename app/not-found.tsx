import type { Metadata, Viewport } from "next";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { AppShell } from "@/app/components/AppShell";
import { NotFoundTemplate } from "@/app/components/templates/NotFoundTemplate";
import { siteConfig, siteViewport } from "@/config/site";

// Next.js builds its one `/_not-found` route from files at this true root, not from
// `app/[locale]/not-found.tsx` — a nested not-found.tsx is never reached, for both an
// unmatched URL and an in-tree `notFound()` call. See AGENTS.md's not-found gotcha.
// Because this route sits outside `[locale]/layout.tsx`, it resolves its own locale and
// provides its own `<html>`/`<body>` shell via `AppShell` rather than inheriting either.

export const viewport: Viewport = siteViewport;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFoundPage");

  return {
    title: `${t("metaTitle")} — ${siteConfig.brandName}`,
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <AppShell locale={locale} messages={messages}>
      <NotFoundTemplate />
    </AppShell>
  );
}
