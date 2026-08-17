"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pending, isPending } from "@/app/components/atoms/Pending";

type CountUpProps = {
  value: string;
  className?: string;
};

const NUMBER_PATTERN = /[\d,]+(?:\.\d+)?/;
const COUNT_DURATION_S = 1.4;

/**
 * Animates the first number inside a figure string from 0 up to its real value once
 * scrolled into view — "120+ locations" counts 0 → 120, then the rest of the string
 * sits still around it. A figure still marked `[[TODO: …]]` has nothing real to count
 * up to, so it renders through `Pending` unchanged.
 */
export const CountUp = ({ value, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const match = value.match(NUMBER_PATTERN);
  const [display, setDisplay] = useState(match ? "0" : value);

  useEffect(() => {
    if (!isInView || !match) return;

    const target = Number(match[0].replace(/,/g, ""));
    const hasThousandsSeparator = match[0].includes(",");
    const controls = animate(0, target, {
      duration: COUNT_DURATION_S,
      ease: "easeOut",
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        setDisplay(hasThousandsSeparator ? rounded.toLocaleString("en-US") : String(rounded));
      },
    });

    return () => controls.stop();
  }, [isInView, match]);

  if (isPending(value)) {
    return <Pending>{value}</Pending>;
  }

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const [prefix, suffix] = value.split(match[0]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
