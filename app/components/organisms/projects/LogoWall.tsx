"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Logo = {
  name: string;
  src: string;
};

type LogoWallProps = {
  headline: string;
  logos: readonly Logo[];
};

const MARQUEE_SPEED_PX_PER_SEC = 55;

const LogoItem = ({ name, src }: Logo) => (
  <div className="flex shrink-0 items-center px-12">
    <Image
      src={src}
      alt={name}
      width={200}
      height={48}
      unoptimized
      className="h-28 w-auto object-contain"
    />
  </div>
);

export const LogoWall = ({ headline, logos }: LogoWallProps) => {
  const setRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;

    const measure = () => setDistance(el.getBoundingClientRect().width);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        <div
          className="animate-logo-marquee flex w-max items-center"
          style={
            {
              "--logo-marquee-distance": `${distance}px`,
              "--logo-marquee-duration": `${distance > 0 ? distance / MARQUEE_SPEED_PX_PER_SEC : 40}s`,
            } as React.CSSProperties
          }
        >
          <div ref={setRef} className="flex shrink-0 items-center">
            {logos.map((logo) => (
              <LogoItem key={`a-${logo.name}`} {...logo} />
            ))}
          </div>
          <div aria-hidden className="flex shrink-0 items-center">
            {logos.map((logo) => (
              <LogoItem key={`b-${logo.name}`} {...logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
