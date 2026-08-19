import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { HeroText } from "@/app/components/molecules/HeroText";
import { ScrollCue } from "@/app/components/molecules/ScrollCue";
import { SECTIONS_ID } from "@/app/components/organisms/SectionsGrid";
import { DEEP_BLUE_GRADIENT } from "@/config/gradients";
import { Link } from "@/i18n/navigation";

const READOUT_ITEM_COUNT = 4;
const TICK_COUNT = 14;
const HEADLINE_ACCENT_LINE_COUNT = 2;

export const HeroSection = async () => {
  const t = await getTranslations("homePage");

  const readoutItems = Array.from({ length: READOUT_ITEM_COUNT }, (_, i) => ({
    label: t(`hero.readout.item${i}.label`),
    value: t(`hero.readout.item${i}.value`),
  }));

  return (
    <section
      className="relative w-full flex flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-4rem)]"
      style={{ background: DEEP_BLUE_GRADIENT }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 18% 78%, rgba(43,99,187,0.35) 0%, rgba(43,99,187,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="animate-hero-sweep absolute left-0 right-0 top-0 h-44"
        style={{
          background:
            "linear-gradient(to bottom, rgba(43,99,187,0) 0%, rgba(120,170,255,0.14) 60%, rgba(190,220,255,0.5) 100%)",
        }}
      />

      <div className="relative w-full max-w-480 mx-auto px-6 lg:pl-31.5 pt-32 sm:pt-36 lg:pt-45">
        <div className="grid items-end gap-10 lg:gap-12 2xl:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="flex items-center gap-3.5 mb-7">
              <span aria-hidden className="w-11 h-px bg-white/40" />
              <MonoLabel className="text-white/55">{t("hero.eyebrow")}</MonoLabel>
            </div>

            <HeroText
              headline={t("hero.headline")}
              subheadline={t("hero.subheadline")}
              accentLineCount={HEADLINE_ACCENT_LINE_COUNT}
              className="max-w-6xl"
            />

            <div className="mt-11 flex flex-wrap items-center gap-7">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-md bg-primary text-white font-semibold text-[15px] px-7 py-4 transition-colors hover:bg-[#3f77cf]"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <MonoLabel className="text-white/35">{t("hero.responseNote")}</MonoLabel>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2.5 border-t border-white/10 pt-6 2xl:mt-0 2xl:border-t-0 2xl:pt-0 2xl:pb-2">
            <MonoLabel as="p" className="text-white/40 text-right">
              {t("hero.location.city")}
              <br />
              {t("hero.location.coordinates")}
            </MonoLabel>
            <div className="mt-3 flex w-full flex-col items-end gap-1.5">
              {Array.from({ length: TICK_COUNT }, (_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="animate-hero-tick h-px bg-white/45"
                  style={{
                    width: `${30 + ((i * 53) % 70)}%`,
                    animationDelay: `${(i * 0.16).toFixed(2)}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-480 mx-auto px-6 lg:pl-31.5">
        <div className="mt-16 flex flex-wrap items-stretch border-t border-white/10 lg:mt-20">
          {readoutItems.map((item, i) => (
            <div
              key={i}
              className="flex min-w-[45%] flex-1 flex-col gap-1.5 py-5 sm:min-w-0 lg:py-6"
            >
              <MonoLabel className="text-white/35">{item.label}</MonoLabel>
              <span className="text-[15px] font-medium text-white/85">{item.value}</span>
            </div>
          ))}
          <div className="flex w-full items-center justify-end py-5 sm:w-auto sm:ml-auto lg:py-6">
            <ScrollCue targetId={SECTIONS_ID} label={t("hero.scrollCue")} />
          </div>
        </div>
      </div>
    </section>
  );
};
