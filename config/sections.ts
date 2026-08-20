import type { SectionConfig } from "@/app/types/section";
import { CHARCOAL_GRADIENT, DEEP_BLUE_GRADIENT } from "@/config/gradients";

/** The Home brief routes every visitor into one of exactly two sectors. Adding a third
 *  card here works against the narrowing the whole page is built around. */
export const sectionsConfig: SectionConfig[] = [
  {
    id: "retailChains",
    href: "/retail-property-portfolios",
    gradient: DEEP_BLUE_GRADIENT,
  },
  {
    id: "logisticsWarehouses",
    href: "/logistics-warehouses",
    gradient: CHARCOAL_GRADIENT,
  },
];
