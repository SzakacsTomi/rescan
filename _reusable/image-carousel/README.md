# Reusable Image Carousel

Archived carousel components from the Rescan project. These can be dropped into other Next.js projects.

## Components

- **ImageCarousel.tsx** — Standalone 5-row marquee carousel with hover zoom + fixed overlay preview
- **ImageHeroCarousel.tsx** — Hero section variant with dimmed image background, radial overlay, headline/CTA

## Dependencies

- Next.js (Image component)
- Framer Motion
- Tailwind CSS
- `@keyframes marquee` CSS animation (translateX 0 → -50%)

## Usage

Both components accept an `images: string[]` prop with image URLs. Images are distributed across 5 rows with varying scroll speeds and alternating directions.
