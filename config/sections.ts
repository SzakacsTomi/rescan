import type { SectionConfig } from "@/app/types/section";

/** The Home brief routes every visitor into one of exactly two sectors. Adding a third
 *  card here works against the narrowing the whole page is built around. */
export const sectionsConfig: SectionConfig[] = [
  {
    id: "retailChains",
    href: "/retail-chains",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: "logisticsWarehouses",
    href: "/logistics-warehouses",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d2d2d 100%)",
  },
];
