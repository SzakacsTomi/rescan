"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ScrollArrow } from "@/app/components/atoms/ScrollArrow";
import { Link } from "@/i18n/navigation";

type CommercialHeroProps = {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  scrollTargetId: string;
  images: string[];
};

const IMAGE_W = 220;
const IMAGE_H = 140;
const GAP = 8;

const ROW_CONFIGS = [
  { duration: "60s", reverse: false },
  { duration: "78s", reverse: true },
  { duration: "52s", reverse: false },
  { duration: "70s", reverse: true },
  { duration: "64s", reverse: false },
];

function buildRow(images: string[], rowIdx: number, prefix: string) {
  const slice = images.filter((_, i) => i % 5 === rowIdx);
  const srcs = slice.length >= 3 ? slice : images.slice(rowIdx * 4, rowIdx * 4 + 4);
  const safe = srcs.length > 0 ? srcs : images;
  return [
    ...safe.map((src, i) => ({ src, id: `${prefix}-a-${i}` })),
    ...safe.map((src, i) => ({ src, id: `${prefix}-b-${i}` })),
  ];
}

type HoverState = { id: string; src: string } | null;

export const CommercialHero = ({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  scrollTargetId,
  images,
}: CommercialHeroProps) => {
  const [hovered, setHovered] = useState<HoverState>(null);

  const rows = ROW_CONFIGS.map((cfg, rowIdx) => ({
    ...cfg,
    track: buildRow(images, rowIdx, `r${rowIdx}`),
  }));

  const totalRowsHeight = 5 * IMAGE_H + 4 * GAP;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background: 5 rows of images */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <div
          className="flex flex-col pointer-events-auto"
          style={{ gap: GAP, height: totalRowsHeight, width: "100%" }}
        >
          {rows.map((row) => (
            <div key={row.duration + row.reverse} className="relative overflow-hidden" style={{ height: IMAGE_H }}>
              <div
                className="flex w-max h-full"
                style={{
                  gap: GAP,
                  animation: `marquee ${row.duration} linear infinite`,
                  animationDirection: row.reverse ? "reverse" : "normal",
                  animationPlayState: hovered ? "paused" : "running",
                }}
              >
                {row.track.map(({ id, src }) => (
                  <button
                    key={id}
                    type="button"
                    tabIndex={-1}
                    className="shrink-0 relative cursor-pointer rounded-lg overflow-hidden"
                    style={{
                      width: IMAGE_W,
                      height: IMAGE_H,
                      opacity: hovered !== null && hovered.id !== id ? 0.35 : 1,
                      transition: "opacity 200ms ease",
                      boxShadow: hovered?.id === id ? "0 0 0 2px rgba(255,255,255,0.55)" : "none",
                    }}
                    onMouseEnter={() => setHovered({ id, src })}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes={`${IMAGE_W}px`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,10,30,0.7) 0%, rgba(5,10,30,0.45) 50%, rgba(5,10,30,0.7) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6 whitespace-pre-line">
          {headline}
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-white/25 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ScrollArrow targetId={scrollTargetId} className="text-white hover:text-white/65" />
      </div>

      {/* Corner preview on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="fixed bottom-8 right-8 z-50 pointer-events-none rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/15"
            style={{ width: 480, height: 320 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            <Image
              src={hovered.src}
              alt=""
              fill
              sizes="480px"
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
