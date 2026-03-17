"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

const MIN_W = 310;
const MAX_W = 440;
const GAP = 10;
const MAX_IMAGES = 30;

const ROW_CONFIGS = [
  { duration: "55s" },
  { duration: "70s" },
  { duration: "48s" },
  { duration: "65s" },
];

function seededWidth(index: number): number {
  const hash = ((index * 2654435761) >>> 0) % 1000;
  return MIN_W + Math.round((hash / 999) * (MAX_W - MIN_W));
}

function buildRow(images: string[], rowIdx: number, totalRows: number) {
  const slice = images.filter((_, i) => i % totalRows === rowIdx);
  const safe = slice.length > 0 ? slice : images;
  return [
    ...safe.map((src, i) => ({
      src,
      id: `r${rowIdx}-a-${i}`,
      width: seededWidth(rowIdx * 100 + i),
    })),
    ...safe.map((src, i) => ({
      src,
      id: `r${rowIdx}-b-${i}`,
      width: seededWidth(rowIdx * 100 + i),
    })),
  ];
}

function CarouselImage({ src, width }: { src: string; width: number }) {
  return (
    <motion.div
      className="shrink-0 relative rounded-lg overflow-hidden h-full"
      style={{ width }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={`${width}px`}
        className="object-cover opacity-0 transition-opacity duration-500"
        onLoad={(e) => {
          (e.target as HTMLImageElement).classList.replace("opacity-0", "opacity-100");
        }}
      />
    </motion.div>
  );
}

export const CommercialHero = ({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  scrollTargetId,
  images,
}: CommercialHeroProps) => {
  const limitedImages = images.slice(0, MAX_IMAGES);

  const rows = ROW_CONFIGS.map((cfg, rowIdx) => ({
    ...cfg,
    track: buildRow(limitedImages, rowIdx, ROW_CONFIGS.length),
  }));

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background: rows of scrolling images */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
        <div className="flex flex-col h-full w-full" style={{ gap: GAP }}>
          {rows.map((row) => (
            <div key={row.duration} className="relative overflow-hidden flex-1">
              <div
                className="flex w-max h-full"
                style={{
                  gap: GAP,
                  animation: `marquee ${row.duration} linear infinite`,
                }}
              >
                {row.track.map(({ id, src, width }) => (
                  <CarouselImage key={id} src={src} width={width} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle uniform overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[rgba(5,10,30,0.6)]" />

      {/* Radial shade behind the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(5,10,30,0.5) 0%, rgba(5,10,30,0.0) 100%)",
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
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm tracking-wide hover:bg-white/20 transition-colors w-full sm:w-auto"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ScrollArrow targetId={scrollTargetId} className="text-white hover:text-white/65" />
      </div>
    </section>
  );
};
