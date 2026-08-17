"use client";

import { MonoLabel } from "@/app/components/atoms/MonoLabel";
import { cn } from "@/lib/utils";

type ScrollCueProps = {
  targetId: string;
  label: string;
  className?: string;
};

/**
 * A bespoke scroll affordance for the home hero — a mono label next to a line that
 * grows and shrinks, distinct from the chevron-bounce `ScrollArrow` atom used by the
 * other hero organisms. The design deliberately gives each hero its own motion
 * language rather than repeating one template.
 */
export const ScrollCue = ({ targetId, label, className }: ScrollCueProps) => {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-3 border-0 bg-transparent cursor-pointer",
        className,
      )}
    >
      <MonoLabel className="text-white/40">{label}</MonoLabel>
      <span aria-hidden className="animate-hero-cue h-9 w-px bg-[#89b4f5]" />
    </button>
  );
};
