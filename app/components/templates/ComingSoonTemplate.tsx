import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Logo } from "@/app/components/atoms/Logo";
import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { siteConfig } from "@/config/site";

/**
 * The whole page proxy.ts gates every public route behind while the repositioning is
 * unfinished — see config/comingSoon.ts. No NavBar/Footer: there is nothing to route to
 * yet, so this is deliberately the entire screen rather than a section within one.
 */
export const ComingSoonTemplate = async () => {
  const t = await getTranslations("comingSoonPage");

  return (
    <main
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-8 lg:px-10"
      style={{ background: DEEP_BLUE_GRADIENT }}
    >
      <Logo invert />

      <div className="mt-14 flex items-center gap-3.5">
        <span aria-hidden className="h-px w-11 bg-white/40" />
        <MonoLabel className="text-white/55">{t("eyebrow")}</MonoLabel>
        <span aria-hidden className="h-px w-11 bg-white/40" />
      </div>

      <h1 className="mt-7 max-w-measure text-display-sm font-semibold leading-display tracking-display text-white">
        {t("headline")}
      </h1>

      <p className="mt-7 max-w-measure text-body-lg leading-copy text-white/70">{t("body")}</p>

      <a
        href={`mailto:${siteConfig.email}`}
        className="mt-10 inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        <Mail aria-hidden className="h-4 w-4" />
        {siteConfig.email}
      </a>
    </main>
  );
};
