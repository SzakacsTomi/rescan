"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Props = { images: string[] };

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

export const CommercialImageCarousel = ({ images }: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null);

  if (images.length === 0) return null;

  const rows = ROW_CONFIGS.map((cfg, rowIdx) => ({
    ...cfg,
    track: buildRow(images, rowIdx, `r${rowIdx}`),
  }));

  return (
    <section
      className="py-12 border-b border-border relative"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className="flex flex-col" style={{ gap: GAP }}>
        {rows.map((row) => (
          <div key={row.duration + row.reverse} className="relative" style={{ height: IMAGE_H }}>
            <div
              className="flex w-max h-full"
              style={{
                gap: GAP,
                animation: `marquee ${row.duration} linear infinite`,
                animationDirection: row.reverse ? "reverse" : "normal",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {row.track.map(({ id, src }) => (
                <motion.div
                  key={id}
                  className="shrink-0 relative cursor-zoom-in"
                  style={{
                    width: IMAGE_W,
                    height: IMAGE_H,
                    zIndex: hoveredId === id ? 50 : 1,
                  }}
                  animate={{
                    scale: hoveredId === id ? 2.2 : 1,
                    opacity: hoveredId !== null && hoveredId !== id ? 0.4 : 1,
                  }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setHoveredId(id);
                    setHoveredSrc(src);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                    setHoveredId(null);
                    setHoveredSrc(null);
                  }}
                >
                  <div className="w-full h-full relative rounded-lg overflow-hidden">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes={`${IMAGE_W}px`}
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed overlay preview for edge-clipped hover cases */}
      <AnimatePresence>
        {hoveredSrc && (
          <motion.div
            className="fixed inset-0 z-200 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              style={{ width: 640, height: 420 }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            >
              <Image
                src={hoveredSrc}
                alt=""
                fill
                sizes="640px"
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
