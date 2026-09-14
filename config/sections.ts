import type { SectionConfig } from "@/app/types/section";
import { CHARCOAL_GRADIENT, DEEP_BLUE_GRADIENT } from "@/config/gradients";

/** Cap on the Cloudinary original before Next's optimiser sees it: the retail frame is a
 *  5472px export and the card never needs more than a tall column at 2x. */
export const SECTION_IMAGE_TRANSFORMATION = "f_auto,q_auto,w_2400";

/** The Home brief routes every visitor into one of exactly two sectors. Adding a third
 *  card here works against the narrowing the whole page is built around.
 *
 *  Each card carries a photograph from that sector's own client work, matching how the
 *  Projects showcase sorts the same folders: the property portfolios are Retail Chains,
 *  the grocery distribution centres are Logistics Warehouses. */
export const sectionsConfig: SectionConfig[] = [
  {
    id: "retailChains",
    href: "/retail-property-portfolios",
    gradient: DEEP_BLUE_GRADIENT,
    image: {
      id: "447636_original_Bilder__3_xzerrx",
      /** The building sits high in this aerial, above a wide apron of parking. */
      objectPosition: "50% 38%",
    },
  },
  {
    id: "logisticsWarehouses",
    href: "/logistics-warehouses",
    gradient: CHARCOAL_GRADIENT,
    image: {
      id: "PHOTO-2026-08-20-22-11-18_f1stlx",
      /** Keeps the loaded docks in frame; a centred crop drifts down onto empty yard. */
      objectPosition: "50% 42%",
    },
  },
];
