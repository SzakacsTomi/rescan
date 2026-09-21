# design-sync notes — Rescan

## Shape: foundations, not a component library

This repo is a Next.js **application**, not a design-system package: `private: true`, no
`main`/`module`/`exports`, no `dist/`, no Storybook. What syncs is the visual language —
colour, type, spacing, motion, fonts — plus three documentation cards so the system is
browsable (see "The reference cards" below). **No Rescan UI components sync.**

The build entry is `.design-sync/ds-components.tsx`, which exports only those three
reference cards. Do not point `--entry` at `app/components/` — those are Server Components
coupled to `next-intl`, `next/image` and the Cloudinary allowlist, and bundling them needs
stubs nobody has written.

(An earlier iteration used a `.design-sync/.cache/empty-entry.ts` stub containing
`export {};` for a pure tokens-only build. That path still works and is what
`[ZERO_MATCH]` in `lib/source-kit.mjs` handles, but it produces a system the design picker
labels "empty".)

## Run order — `build-css.mjs` BEFORE the converter

```
node .design-sync/build-css.mjs
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --out ./ds-bundle --entry ./.design-sync/ds-components.tsx
```

Skipping the first step uploads a stale stylesheet that no longer matches `app/globals.css`.

## Gotchas already paid for

- **`@theme inline` hides tokens from `var()`.** The `inline` keyword makes Tailwind paste
  values straight into utilities, so 93 of 99 tokens had no `var(--token)` form in compiled
  output — a design agent writing `var(--color-fit)` would have got nothing. `build-css.mjs`
  re-declares the whole `@theme` body as a plain `:root` block to restore that idiom, and
  hard-fails if any token is unreachable. Don't remove that check.
- **`cfg.tokensGlob` is ignored without `cfg.tokensPkg`.** `lib/css.mjs:55` returns early,
  so `ds-bundle/tokens/` comes out empty and `styles.css` never imports it. That is why the
  tokens are folded into the compiled `cssEntry` instead of shipped as a separate
  `tokens/` file — one file, guaranteed inside the `styles.css` `@import` closure.
- **Content scanning alone is not enough.** The design agent writes markup this repo has
  never contained, so `build-css.mjs` safelists the brand utility families with
  `@source inline()`. A token added to `app/globals.css` is picked up automatically (the
  safelist is derived from the `@theme` block), but a *new kind* of utility prefix is not —
  add it to the `safelist` array.
- **next/font vars must be bound manually.** `--font-montserrat` / `--font-plex-mono` are
  injected on `<body>` by `next/font/google` at build time. No Next.js in the bundle, so
  `build-css.mjs` binds them to the self-hosted families or every `font-sans` resolves to
  the browser default.
- **Fonts are self-hosted from Google Fonts** into `.design-sync/fonts/` (committed, 356 KB,
  11 faces). Subsets mirror `lib/fonts.ts` exactly — Montserrat `latin` only, IBM Plex Mono
  `latin` + `latin-ext`. Fetching all subsets instead gives 45 files / 1.4 MB for nothing.
- **The render check runs and must stay running.** With three real previews, Playwright
  actually verifies them, so do NOT pass `--no-render-check`. (It was correct only for the
  earlier zero-preview build, where there was nothing to open.)
- **`@tailwindcss/cli` and `playwright` live in the gitignored `.ds-sync/`.** A fresh clone
  must re-stage the skill scripts, then
  `npm i esbuild ts-morph @types/react @tailwindcss/cli playwright && npx playwright install chromium`
  before `build-css.mjs` and the render check will run.
- **Don't `pkill -f` a pattern containing the served port.** The pattern matches the killing
  shell's own command line and takes out the session. Stop the verification server by its
  task id instead.

## Re-sync risks — what can go stale silently

- **`conventions.md` names ~139 concrete class names and 7 custom properties.** Renaming or
  dropping a token in `app/globals.css` leaves the header pointing at something that no
  longer exists, and the design agent will trust it and emit unstyled markup. Re-run the
  name-validation pass against the fresh `ds-bundle/_ds_bundle.css` on every sync; the
  header is human-owned, so report drift rather than rewriting it.
- **The hex values in `conventions.md` are conversions, not source.** They were computed
  from the `oklch()` tokens. If a brand colour changes, the hexes in the header do not
  follow automatically.
- **Two colour families still disagree.** `app/globals.css` documents this: the `:root`
  semantic roles are authored approximations that render visibly different colours from the
  brand hexes (`foreground` → `#06153A`, not `#141E3D`; `primary` → `#1C59AF`, not
  `#2B63BB`). Both families ship. If the approximations are ever reconciled, the header's
  "two families" section needs rewriting.
- **No status palette, by construction.** One positive hue (`fit`), one negative
  (`destructive`). Anything consuming this for dashboards must define its own warning/info
  and chart categoricals — flagged in the header, but nothing enforces it.
- **Only verified against Tailwind 4.3.3.** The `@source inline()` brace-expansion syntax
  and `source(none)` both require Tailwind ≥ 4.1.
- **Fonts were fetched over the network** from `fonts.googleapis.com`. A future re-fetch can
  pick up different font revisions; the committed `.woff2` files are the stable copy.

## The reference cards, and why they exist

A pure tokens-only upload renders in the design picker as **"This design system is empty"**.
The app's manifest indexed all 561 tokens and both font families correctly — but its pane is
card-driven (`components`/`cards`/`startingPoints` all `[]`), so a system with no previews
reads as unfinished no matter how complete its tokens are.

`.design-sync/ds-components.tsx` exports three documentation components — `ColorPalette`,
`TypeScale`, `SpacingScale` — purely so the system is browsable. They are **not** Rescan UI
and deliberately mirror nothing in `app/components/`. They read their values off the live
document via `getComputedStyle`, so a token renamed or revalued in `app/globals.css` shows
up on the next sync without editing them.

Wiring notes, each of which cost a build:

- **`.d.ts` discovery finds nothing in synth-entry mode.** Component detection reads a
  shipped `.d.ts` tree; there is none here, so `cfg.componentSrcMap` pins the three names
  explicitly (`source-kit.mjs:83-95` — non-null entries *add* to the set).
- **Prop extraction also fails without `.d.ts`**, emitting `[key: string]: unknown` — a
  useless contract for the design agent. `cfg.dtsPropsFor` carries the real prop bodies.
  Watch the quoting: a string-literal union must reach the config with its apostrophes
  intact, or you get `family?: brand | semantic | all`, which *parses* as valid TypeScript
  (three undefined type references) and sails through validate while being wrong.
- **Group comes from doc frontmatter.** Without `cfg.docsDir`, everything lands in
  `general`. `.design-sync/docs/<Name>.md` sets `category: Foundations` and doubles as the
  component's `.prompt.md`.
- **Renaming a group orphans the old remote paths.** `components/general/**` had to be
  deleted by hand during reconciliation; anchor-based diffs can't see paths the anchor never
  recorded.
- **`.design-sync/` must be a Tailwind `@source`.** The cards' classes live outside `app/`,
  so without the two scoped `@source` lines in `build-css.mjs` they render unstyled. Scoped
  to exact paths, never the whole directory — `.cache/` holds the compiled CSS this step
  writes, and scanning it back into itself is a loop.
- **The safelist was originally too broad.** Crossing the full colour set with
  `from/via/to/shadow/ring/fill/stroke` made the app register ~200 utility classes as
  selectable "themes" (`From Accent`, `Shadow Ink`, `Via Transparent`), burying the real
  `.dark`. Only `bg`/`text`/`border` are crossed now. Re-check the manifest's `themes` array
  after any safelist change.

Verification is real: `package-validate.mjs` runs the Playwright render check (3/3), and the
previews were graded by measuring the DOM — 20 distinct swatch colours, 26 distinct type
sizes from 10px to 104px, container bars ascending 900→1920px, spine exactly 126px.
