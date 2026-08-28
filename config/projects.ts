import {
  CHARCOAL_GRADIENT,
  DEEP_BLUE_GRADIENT,
  EVERGREEN_GRADIENT,
  VIOLET_GRADIENT,
} from "@/config/gradients";

export type ProjectSector = "retail" | "logistics";

export type ProjectConfig = {
  id: string;
  gradient: string;
  image?: string;
  video?: string;
};

export type CaseStudyConfig = {
  id: string;
  sector: ProjectSector;
  /** Surface and link accent always move together — the design gives each square its own
   *  pair, and the two stand-in accents have no equivalent among the theme tokens. */
  gradient: string;
  accent: string;
};

/** The 2×2 the Projects design opens with, in the order it draws them — always four
 *  tiles, one per project. The sectors alternate down the grid (retail, logistics,
 *  retail, logistics) so neither segment reads as the sideline: the two grocery-retailer
 *  programmes are distribution-centre work and belong to Logistics Warehouses, the two
 *  property portfolios to Retail Chains. Gradient and accent stay with the *position*,
 *  not the project, so the grid keeps the colour sequence the design drew. */
export const caseStudies: CaseStudyConfig[] = [
  { id: "case2", sector: "retail", gradient: DEEP_BLUE_GRADIENT, accent: "#89b4f5" },
  { id: "case0", sector: "logistics", gradient: CHARCOAL_GRADIENT, accent: "#89b4f5" },
  { id: "case3", sector: "retail", gradient: VIOLET_GRADIENT, accent: "#c9a8f5" },
  { id: "case1", sector: "logistics", gradient: EVERGREEN_GRADIENT, accent: "#7fd6b5" },
];

/**
 * The index of older references. They predate the repositioning and are unchanged; the
 * two written-up case studies live in `caseStudies` above, not here.
 */
export const projects: ProjectConfig[] = [
  {
    id: "project0",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510684/jonkoping-office_bv6a9l.jpg",
  },
  {
    id: "project1",
    gradient: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
    image: "https://res.cloudinary.com/daecns4am/image/upload/v1774510681/vaxjo-office_mjvohv.jpg",
  },
  {
    id: "project2",
    gradient: "linear-gradient(135deg, #0c2461 0%, #1e3799 50%, #4a69bd 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510689/jonkoping-apartment_vyul6g.jpg",
  },
  {
    id: "project3",
    gradient: "linear-gradient(135deg, #1B1B2F 0%, #162447 50%, #1F4068 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510682/vaxjo-multi-office_slhkjk.jpg",
  },
  {
    id: "project4",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #5D6D7E 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/video/upload/so_0/v1774510723/almhult-office_ggeu9c.jpg",
    video:
      "https://res.cloudinary.com/daecns4am/video/upload/v1774510723/almhult-office_ggeu9c.mp4",
  },
  {
    id: "project5",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #2d4059 50%, #3b6978 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510687/austria-electrical_hrpxbe.png",
  },
  {
    id: "project6",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #2a3d5c 50%, #3a5a7c 100%)",
    image: "https://res.cloudinary.com/daecns4am/image/upload/v1774510680/usa-mining_npurnk.jpg",
  },
  {
    id: "project7",
    gradient: "linear-gradient(135deg, #2d3436 0%, #4a5568 50%, #636e72 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510685/austria-electrical-substation_givuwe.png",
  },
  {
    id: "project8",
    gradient: "linear-gradient(135deg, #1B1B2F 0%, #2d3a4e 50%, #3d4f6a 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510680/usa-mining-facility_jacqcg.jpg",
  },
  {
    id: "project9",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #3d566e 50%, #4a6a85 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/video/upload/so_0/v1774510723/sweden-mining_qenclv.jpg",
    video: "https://res.cloudinary.com/daecns4am/video/upload/v1774510723/sweden-mining_qenclv.mp4",
  },
  {
    id: "project10",
    gradient: "linear-gradient(135deg, #0c2461 0%, #2a4a7f 50%, #3b6b9e 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510681/jonkoping-vehicle_hkkh9j.jpg",
  },
  {
    id: "project11",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #1e3a5f 50%, #2a5a8f 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510686/vaxjo-mixed-use_zzuoty.jpg",
  },
  {
    id: "project12",
    gradient: "linear-gradient(135deg, #2d3436 0%, #3d4e5c 50%, #4d6878 100%)",
    image: "https://res.cloudinary.com/daecns4am/image/upload/v1774510679/vaxjo-hotel_o8fsvv.jpg",
  },
  {
    id: "project13",
    gradient: "linear-gradient(135deg, #1B1B2F 0%, #2a2a4e 50%, #3a3a6e 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/video/upload/so_0/v1774510731/vaxjo-church_jzxmve.jpg",
    video: "https://res.cloudinary.com/daecns4am/video/upload/v1774510731/vaxjo-church_jzxmve.mp4",
  },
  {
    id: "project14",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #3a4f63 50%, #4a6578 100%)",
    image:
      "https://res.cloudinary.com/daecns4am/image/upload/v1774510679/tingsryd-manufacturing_jxq4zl.jpg",
  },
];

export const projectsLogoWall = {
  logos: [
    { name: "Alhansa", src: "/assets/logos/alhansa.png" },
    { name: "CA Fastigheter", src: "/assets/logos/ca-fastigheter.png" },
    { name: "Carlqvist", src: "/assets/logos/carlqvist.png" },
    { name: "Famera", src: "/assets/logos/famera.png" },
    { name: "Ingka", src: "/assets/logos/ingka.png" },
    { name: "Kalmarhem", src: "/assets/logos/kalmarhem.png" },
    { name: "Omya", src: "/assets/logos/omya.png" },
    { name: "Upvidingehus", src: "/assets/logos/upvidingehus.png" },
    { name: "VBAB", src: "/assets/logos/vbab.png" },
    { name: "VIDA", src: "/assets/logos/vida.png" },
    { name: "Emilshus", src: "/assets/logos/emilshus.png" },
    { name: "Nivika", src: "/assets/logos/nivika.png" },
    { name: "Thulehus", src: "/assets/logos/thulehus.png" },
  ],
};

export const projectsMetrics = {
  items: [{ value: "250+" }, { value: "1.8M+" }, { value: "3" }, { value: "96,000" }],
};
