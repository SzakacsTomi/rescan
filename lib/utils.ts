import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const TEXT_TOKENS = [
  "mono-2xs", "mono-xs", "micro", "caption", "note", "body", "body-lg", "lead",
  "lead-lg", "subhead", "title-sm", "title", "title-lg", "h3", "h2", "h2-lg",
  "h1", "h1-lg", "display-2xs", "display-xs", "display-sm", "display",
  "display-lg", "display-xl", "hero", "hero-lg",
]

const LEADING_TOKENS = [
  "numeral", "hero-tight", "hero", "display", "headline", "tight", "heading",
  "title", "card", "quote", "snug", "caption", "note", "body", "body-lg",
  "copy", "prose", "loose", "read",
]

const TRACKING_TOKENS = [
  "note", "snug", "title", "tight", "headline", "numeral", "display",
  "mono-tight", "mono", "mono-lg", "mono-wide", "eyebrow-tight", "eyebrow",
]

const CONTAINER_TOKENS = ["shell", "wide", "page", "cta", "measure"]

// tailwind-merge has no knowledge of the bespoke type and layout scales, so it
// misclasses text-note & co. as colors and drops them next to text-*.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: TEXT_TOKENS,
      leading: LEADING_TOKENS,
      tracking: TRACKING_TOKENS,
      container: CONTAINER_TOKENS,
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
