"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { Link } from "@/i18n/navigation";

type CarouselHeroProps = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  images: string[];
};

const MIN_W = 240;
const MAX_W = 360;
const GAP = 8;
const MAX_IMAGES = 24;

const ROW_CONFIGS = [{ duration: "200s" }, { duration: "140s" }, { duration: "201s" }];

function seededWidth(index: number): number {
  const hash = ((index * 2654435761) >>> 0) % 1000;
  return MIN_W + Math.round((hash / 999) * (MAX_W - MIN_W));
}

/** Every row gets the full image list, just rotated to a different start, so a small
 *  Cloudinary folder still reads as a dense, continuous strip in each row rather than
 *  thinning out three ways. */
function buildRow(images: string[], rowIdx: number) {
  const rotated = [...images.slice(rowIdx), ...images.slice(0, rowIdx)];
  const safe = rotated.length > 0 ? rotated : images;
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
    <div className="relative h-full shrink-0 overflow-hidden" style={{ width }}>
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
    </div>
  );
}

export const CarouselHero = ({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  images,
}: CarouselHeroProps) => {
  const limitedImages = images.slice(0, MAX_IMAGES);

  const rows = ROW_CONFIGS.map((cfg, rowIdx) => ({
    ...cfg,
    track: buildRow(limitedImages, rowIdx),
  }));

  return (
    <section className="grid grid-cols-1 border-b border-border lg:min-h-[86vh] lg:grid-cols-[minmax(0,1fr)_44%]">
      <div className="flex flex-col justify-center gap-10 px-6 py-16 lg:ml-auto lg:max-w-205 lg:pt-28 lg:pb-24">
        <div>
          {eyebrow && <MonoLabel className="text-primary">{eyebrow}</MonoLabel>}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-[-0.03em] text-balance whitespace-pre-line"
          >
            {headline}
          </motion.h1>
          <p className="mt-7 max-w-155 text-[19px] leading-[1.65] text-foreground/60">
            {subheadline}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center gap-2.5 rounded-md bg-primary px-7.5 py-4.25 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#3f77cf]"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="border-b border-foreground/25 pb-0.5 text-sm font-semibold text-foreground hover:border-foreground/50"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="relative h-72 overflow-hidden bg-[#020409] sm:h-96 lg:h-auto">
        <div className="absolute inset-0 flex flex-col gap-2 py-2">
          {rows.map((row) => (
            <div key={row.duration} className="relative flex-1 overflow-hidden">
              <div
                className="flex h-full w-max"
                style={{ gap: GAP, animation: `marquee ${row.duration} linear infinite` }}
              >
                {row.track.map(({ id, src, width }) => (
                  <CarouselImage key={id} src={src} width={width} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,4,9,0.85)_0%,rgba(2,4,9,0.15)_40%,rgba(2,4,9,0.15)_100%)]" />
      </div>
    </section>
  );
};
