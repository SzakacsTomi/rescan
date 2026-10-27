# Rescan — how to build with this system

This is a **tokens-only** design system: it ships no React components. Build UI with your
own markup and style it with the vocabulary below. Everything here is real and verified
against the compiled stylesheet.

## Setup

Link `styles.css`. It pulls in the self-hosted brand fonts and every utility and token
below — nothing else to import, no provider to wrap.

**Dark mode is a class, not a media query.** The system declares
`@custom-variant dark (&:is(.dark *))`, so `dark:` utilities only fire under an ancestor
carrying `class="dark"` — normally `<html>`. A `prefers-color-scheme` query will do nothing.

## Colour — two families, used for different jobs

**Semantic roles** flip between light and dark. Use these for dashboard chrome — surfaces,
text, borders, form controls:

`background` `foreground` `card` `card-foreground` `popover` `popover-foreground`
`primary` `primary-foreground` `secondary` `secondary-foreground` `muted`
`muted-foreground` `accent` `accent-foreground` `destructive` `border` `input` `ring`

**Brand surfaces** are fixed — identical in both themes. Use them for signature moments, not
for general chrome:

`ink` (#020409) `ink-soft` (#0B1020) `accent-sky` (#89B4F5) `accent-mid` (#3F77CF)
`fit` (#7EE2B8) `paper` (#E5EAF5) `hairline` (#D8DEEA)

Every name above works as `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*`, with
an opacity suffix (`bg-ink/50`, `border-hairline/40`) and the `hover:` `focus:`
`focus-visible:` `active:` `group-hover:` `dark:` variants.

`primary` is the brand blue and `accent-mid` is its hover state — the site's buttons lighten
on hover rather than darkening. Keep that direction.

## Type

`font-sans` is Montserrat (300–900); `font-mono` is IBM Plex Mono (400, 500).

Sizes run `text-mono-2xs` `text-mono-xs` `text-micro` `text-caption` `text-note` `text-body`
`text-body-lg` `text-lead` `text-lead-lg` `text-subhead` `text-title-sm` `text-title`
`text-title-lg` `text-h3` `text-h2` `text-h2-lg` `text-h1` `text-h1-lg` then the display and
hero steps. **A dashboard lives in `text-micro` → `text-body-lg`**; the display and hero
steps exist for marketing pages and will look wrong in a data view.

Pair with `leading-*` (`leading-tight` `leading-snug` `leading-body` `leading-note`
`leading-card` …) and `tracking-*` (`tracking-snug` `tracking-tight` `tracking-title`
`tracking-headline` for headings; `tracking-mono` `tracking-mono-wide` `tracking-eyebrow`
for mono and eyebrows).

**The mono rule is strict and worth keeping.** Mono is for indices, coordinates, IDs,
timestamps and fixed field names — never a sentence, never prose. The system's single
definition is:

```html
<span class="font-mono text-mono-2xs leading-none tracking-mono-wide uppercase text-muted-foreground">
  ROW 014
</span>
```

Reuse that exact combination for table column headers, record IDs and metric labels.

## Layout

Containers: `max-w-measure` (900px) `max-w-cta` (1000px) `max-w-page` (1240px)
`max-w-wide` (1400px) `max-w-shell` (1920px). The `*-spine` spacing token is 126px — the left
spine the site aligns hero copy to (`pl-spine`, `ml-spine`).

Horizontal inset is `px-6 sm:px-8 lg:px-10`. Vertical section rhythm is `py-24 lg:py-30`
standard, `py-24 lg:py-28` for an inverted dark band. Don't invent intermediate values.

**Card grids are drawn as a hairline lattice, not as detached cards**: the grid gets `gap-px`
over a `bg-border` parent and each cell paints its own opaque background. Substituting
`gap-4` with a `border` per card reads as a different design system. This matters more in a
dashboard than anywhere else, since dashboards are mostly grids.

## Motion

`ease-brand` and `ease-out-expo` are the two curves. Nothing else.

## What you must supply yourself

This system was built for a marketing site, so it has **no status palette**. The only
positive hue is `fit` and the only negative is `destructive` — there is no warning, no info,
and no categorical series for charts. Define those yourself in the same `oklch()` idiom, and
note that `fit` on `paper` is far too low-contrast for a status dot; put it on `ink` or
darken it.

## Direct token access

Every token is also a plain custom property, so `var(--color-ink)`, `var(--text-body)`,
`var(--leading-body)`, `var(--tracking-mono)`, `var(--container-page)`, `var(--spacing-spine)`
and `var(--ease-brand)` all resolve. Use these for values a utility can't express — a
gradient stop, a `calc()`, an inline style.

## One idiomatic block

```html
<section class="bg-background px-6 sm:px-8 lg:px-10 py-24 lg:py-30">
  <div class="mx-auto max-w-page">
    <span class="font-mono text-mono-2xs tracking-mono-wide uppercase text-muted-foreground">Portfolio</span>
    <h2 class="mt-6 text-h2 lg:text-h2-lg tracking-headline leading-headline text-foreground">Sites under survey</h2>
    <div class="mt-14 grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
      <div class="bg-card p-6">
        <p class="font-mono text-mono-2xs tracking-mono-wide uppercase text-muted-foreground">Delivered</p>
        <p class="mt-5 text-h1 leading-numeral tracking-numeral text-foreground">128</p>
      </div>
      <div class="bg-card p-6">
        <p class="font-mono text-mono-2xs tracking-mono-wide uppercase text-muted-foreground">In survey</p>
        <p class="mt-5 text-h1 leading-numeral tracking-numeral text-foreground">14</p>
      </div>
      <div class="bg-card p-6">
        <p class="font-mono text-mono-2xs tracking-mono-wide uppercase text-muted-foreground">Flagged</p>
        <p class="mt-5 text-h1 leading-numeral tracking-numeral text-destructive">3</p>
      </div>
    </div>
  </div>
</section>
```
