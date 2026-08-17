import { MonoLabel } from "@/app/components/atoms/MonoLabel";

type ProofGridProps = {
  label: string;
  caption: string;
  cellCount: number;
};

/** One filled cell per site in a named-case portfolio — a visual echo of "one visit
 *  each" rather than real per-property data. The card itself is revealed by the
 *  caller (`CoreRisk`'s `aside` wraps it in a scroll-triggered `Reveal`); the cells
 *  are static so mounting this doesn't spin up 50+ individual viewport observers. */
export const ProofGrid = ({ label, caption, cellCount }: ProofGridProps) => (
  <div className="rounded-[10px] border border-border p-7">
    <MonoLabel>{label}</MonoLabel>
    <div className="mt-5.5 grid grid-cols-8 gap-1.5">
      {Array.from({ length: cellCount }, (_, i) => (
        <span key={i} className="aspect-square rounded-sm bg-primary" />
      ))}
    </div>
    <p className="mt-5.5 text-sm leading-[1.6] text-foreground/60">{caption}</p>
  </div>
);
