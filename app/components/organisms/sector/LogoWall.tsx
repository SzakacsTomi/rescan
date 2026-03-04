"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Logo = {
  name: string;
  src: string;
};

type LogoWallProps = {
  headline: string;
  logos: readonly Logo[];
};

export const LogoWall = ({ headline, logos }: LogoWallProps) => {
  const track = [
    ...logos.map((l) => ({ ...l, key: `a-${l.name}` })),
    ...logos.map((l) => ({ ...l, key: `b-${l.name}` })),
  ];

  return (
    <section className="py-16 border-y border-border">
      <p className="text-xs font-semibold tracking-widest uppercase text-foreground/40 text-center mb-10 px-6">
        {headline}
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {track.map(({ key, name, src }) => (
            <div key={key} className="shrink-0 px-4">
              <Image
                src={src}
                alt={name}
                width={200}
                height={48}
                unoptimized
                className="h-8 w-auto object-contain grayscale opacity-60"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
