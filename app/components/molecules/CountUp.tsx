"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pending, isPending } from "@/app/components/atoms/Pending";

type CountUpProps = {
  value: string;
  className?: string;
  /** Passed through to the `Pending` badge when the value is still a `[[TODO: …]]` marker. */
  pendingClassName?: string;
};

// English figures group with a comma ("38,000 m²"), Swedish ones with a space
// ("96 000 m²"), so both have to survive the round trip through Number().
const GROUP_SEPARATOR = /[,\u00a0\u202f ]/;
const NUMBER_PATTERN = /\d{1,3}(?:[,\u00a0\u202f ]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/;
const COUNT_DURATION_S = 1.4;

/**
 * Animates the first number inside a figure string from 0 up to its real value once
 * scrolled into view — "120+ locations" counts 0 → 120, then the rest of the string
 * sits still around it. A figure still marked `[[TODO: …]]` has nothing real to count
 * up to, so it renders through `Pending` unchanged.
 */
export const CountUp = ({ value, className, pendingClassName }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  // A regex match produces a new array on every call; without memoizing, the
  // animation's own setDisplay re-renders would re-trigger this effect each frame
  // and restart the count from zero forever.
  const match = useMemo(() => value.match(NUMBER_PATTERN), [value]);
  const [display, setDisplay] = useState(match ? "0" : value);

  useEffect(() => {
    if (!isInView || !match) return;

    const source = match[0];
    const separator = source.match(GROUP_SEPARATOR)?.[0];
    const target = Number(source.split(GROUP_SEPARATOR).join(""));
    // The figure's own precision, so "1.8M+" lands on 1.8 rather than being rounded to 2.
    const decimals = source.split(".")[1]?.length ?? 0;
    const controls = animate(0, target, {
      duration: COUNT_DURATION_S,
      ease: "easeOut",
      onUpdate: (latest) => {
        const grouped = latest.toLocaleString("en-US", {
          useGrouping: separator !== undefined,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        // Group with whichever separator the catalogue authored, not en-US's comma.
        setDisplay(separator ? grouped.replaceAll(",", separator) : grouped);
      },
    });

    return () => controls.stop();
  }, [isInView, match]);

  if (isPending(value)) {
    return <Pending className={pendingClassName}>{value}</Pending>;
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
