# design-sync notes — Rescan

## Shape: tokens-only, and deliberately so

This repo is a Next.js **application**, not a design-system package: `private: true`, no
`main`/`module`/`exports`, no `dist/`, no Storybook. The converter's `[ZERO_MATCH]` path
(`lib/source-kit.mjs`) treats it as a tokens-only DS, which is the intended outcome — what
syncs is the visual language (colour, type, spacing, motion, fonts), not React components.

The JS entry is a stub: `.design-sync/.cache/empty-entry.ts` containing `export {};`. It
exists only to give `package-build.mjs` something to bundle. Do not point `--entry` at
`app/components/` — those are Server Components coupled to `next-intl`, `next/image` and
the Cloudinary allowlist, and bundling them needs stubs nobody has written.

## Run order — `build-css.mjs` BEFORE the converter

```
node .design-sync/build-css.mjs
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --out ./ds-bundle --entry ./.design-sync/.cache/empty-entry.ts --no-render-check
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
- **`--no-render-check` is correct here, not a shortcut.** A tokens-only bundle has zero
  previews, so the render check has nothing to open. The stylesheet was instead verified in
  a real browser (fonts loading, tokens resolving, utilities applying). Re-do that check by
  hand if the CSS pipeline changes; `validate`'s warn line about it is expected.
- **`@tailwindcss/cli` lives in the gitignored `.ds-sync/`.** A fresh clone must re-stage the
  skill scripts and `npm i esbuild ts-morph @types/react @tailwindcss/cli` before
  `build-css.mjs` will run.
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

## Not synced

No component previews and no `components/` entries. Adding them is not a config change: a
zero-component bundle fails `package-validate.mjs` if any `.html` card exists
(`previews !== ver.componentCount`, line 370, not guarded by `tokensOnly`), so foundation
cards would require real React components in the bundle.
