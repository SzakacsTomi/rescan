# Rescan

Corporate website for a Swedish B2B company selling **existing-condition building
information**. Bilingual (`en` default, `sv`), public, marketing-led, low-interactivity.
That bias explains most rules here.

**The site is mid-repositioning.** Rescan is narrowing from a general 3D-scanning
supplier to a specialist for exactly two segments: **Retail Chains** and **Logistics
Warehouses**. Six client copy-briefs drive this and are the source of truth for page
structure and wording. **The briefs are no longer checked in** (they were removed in
30e9342) — ask the user for the relevant one before rewriting a page's copy rather than
inventing it, and recover them from git history if needed.

A visual redesign is being imported from a claude.ai Design project ("Hero section
redesign feedback"), synced via the `DesignSync` MCP tool / `/design-sync` skill. The
`.dc.html` files it produces are not checked in either; they arrive through the tool.
`Rescan Redesign.dc.html` is the target state; `Rescan Current.dc.html` mirrors what's
live, for diffing. The `sc-if` / `sc-for` / `{{ }}` markup inside a `.dc.html` file is
the design tool's own preview templating, not literal markup to port — only the inline
styles, structure, and hardcoded copy carry real content. An `sc-for` loop backed only
by a `hint-placeholder-count` (no bound data) is generic scaffolding, not authored
copy — treat it as a layout hint, never a copy source. The design's dashed-amber "Todo"
badge is exactly what `atoms/Pending.tsx` already renders for `[[TODO: …]]` markers —
content pulled from the design with no real figure yet gets marked pending the same
way the proof metrics already are, not given a new placeholder style.

## Stack

| Concern      | Choice                                                        |
|--------------|---------------------------------------------------------------|
| Framework    | Next.js 16.1.6, **App Router**                                 |
| React        | 19.2.3 — Server Components by default                          |
| Language     | TypeScript 5 (`strict`)                                        |
| Styling      | Tailwind CSS 4 — CSS-first, `@theme` in `app/globals.css`, **no `tailwind.config.ts`** |
| Components   | Bespoke, atomic-design (see below) — **no shadcn/ui, no Radix**  |
| Animation    | Framer Motion 12                                               |
| Icons        | lucide-react                                                   |
| i18n         | next-intl 4, locales `en` (default) and `sv`                   |
| Forms        | Zod 4 + Server Actions (no react-hook-form)                    |
| Email        | Resend                                                         |
| Anti-spam    | Cloudflare Turnstile                                           |
| Lint         | ESLint 9 flat config + `eslint-config-next`                    |
| Test         | Vitest + Testing Library + jsdom — `yarn test`, config in `vitest.config.ts` |
| Package mgr  | Yarn 4 (`nodeLinker: node-modules`)                            |

There is **no backend, no CMS, and no data-fetching library**. Server Components plus
Server Actions cover current needs. Do not add React Query, Zustand, or an ORM
without being asked.

The project was scaffolded with shadcn but never used a single shadcn component. The
`components.json`, the `shadcn`/`radix-ui`/`class-variance-authority` packages and the
`shadcn/tailwind.css` import have been removed. Every component here is hand-written —
if you need a shadcn primitive, run `npx shadcn@latest init` first and say so.

## Commands

| Task                   | Command                                  |
|------------------------|------------------------------------------|
| Dev server             | `yarn dev`                               |
| Production build       | `yarn build`                             |
| Serve build            | `yarn start`                             |
| Lint                   | `yarn lint`                              |
| Test                   | `yarn test`                              |
| List open placeholders | `yarn todos` (`--md` for markdown)       |

Verify UI work against a running server. Do not report a change as working on the
strength of a passing build alone. Once `yarn dev` is running, leave it running —
do not stop it after finishing a task; the user keeps it up across tasks.

**Playwright MCP is the browser for that verification.** For anything about hero
sections, nav, spacing or layout, measure with `page.evaluate` (`getBoundingClientRect`)
rather than eyeballing screenshots — this model cannot read image files. Cross-page
consistency checks (e.g. the hero spine) are done by comparing the same metric on each
route at the same viewport.

## Gotchas specific to this repo

Each of these has already cost time.

1. **`proxy.ts`, not `middleware.ts`.** Next.js 16 renamed the file convention. Ours is
   `proxy.ts` at the repo root. The next-intl *import path* is still
   `next-intl/middleware` — only the Next.js side was renamed.
2. **No `src/` directory.** `app/` sits at the repo root and `@/*` maps to `./*`. An
   import is `@/app/components/...`, `@/config/...`, `@/lib/...`.
3. **No `tailwind.config.ts`.** Tailwind v4 is configured entirely through
   `@theme inline` in `app/globals.css`. Adding a token means editing that file.
4. **Cloudinary is allowlisted per-account.** `next.config.ts` only permits
   `res.cloudinary.com/daecns4am/**`. An image from another account renders as a
   broken `next/image`.
5. **Routes live under `app/[locale]/(pages)/`.** A page outside `[locale]` has no
   locale and will not translate.
6. **`messages/en.json` is the reference catalogue.** A key missing from `sv.json`
   fails the build, which is the intended safety net — do not silence it.

## Architecture

```
app/[locale]/(pages)/   routes — thin; resolve translations, compose a template
app/components/         atoms → molecules → organisms → templates
app/actions/            Server Actions
app/emails/             transactional email HTML
app/hooks/              client hooks (not components, so outside the atomic tiers)
app/types/              shared types
config/                 static, non-translated config (nav, footer, sectors, projects, gradients)
lib/                    framework-agnostic helpers (cn, cloudinary)
i18n/                   routing + request config
messages/               one JSON catalogue per locale
scripts/                repo tooling (`list-placeholders.mjs` backs `yarn todos`)
```

Dependencies point one way: `app/[locale]` → `templates` → `organisms` → `molecules`
→ `atoms` → `lib`. Never import "downward".

### Routes

| Route | Brief | Notes |
|---|---|---|
| `/` | `home.md` | Outside `(pages)`; renders `NavBar` directly in its `dark` variant (transparent, overlaid on the hero) — the sector cards further down are still the primary routing, the nav is wayfinding |
| `/retail-chains` | `retail-chains.md` | `SectorTemplate` + Cloudinary carousel hero |
| `/logistics-warehouses` | `logistics-warehouses.md` | `SectorTemplate` + `ConsequenceChain` |
| `/why-rescan` | `why-rescan.md` | `WhyRescanTemplate` |
| `/projects` | `projects.md` | Case-study format plus fifteen older references |
| `/contact` | `contact.md` | Zod + Server Action + Resend + Turnstile |
| `/about` | — | No brief; unchanged by the repositioning |

Retired routes 308-redirect rather than 404, so indexed links keep resolving. They are
listed in `RETIRED_ROUTES` in `next.config.ts`: `/commercial-portfolios` →
`/retail-chains`, `/industrial-manufacturing` → `/logistics-warehouses`,
`/model-production` → `/`.

### Atomic design

| Tier         | Contains                                              | May import        |
|--------------|-------------------------------------------------------|-------------------|
| `atoms/`     | One element, no composition: `Logo`, `ScrollArrow`, `Pending`, `MonoLabel` | nothing local |
| `molecules/` | A few atoms doing one job: `NavLinks`, `ProjectIndexCard`, `ConsequenceChain`, `MapPlate` | atoms |
| `organisms/` | A self-contained page region: `NavBar`, `CoreRisk`, `ProofBar`, `SplitMediaHero` | atoms, molecules |
| `templates/` | Page-level composition: `SectorTemplate`, `HomeTemplate` | all of the above |

Organisms that belong to one page live in a subdirectory: `organisms/sector/`,
`organisms/contact/`, `organisms/projects/`.

Extract to a lower tier only when something is reused. A one-off section used by a
single page stays an organism in that page's directory.

## The copy rules

These come from the client briefs and apply to **every** page. They govern content, and
they are the reason a change can be technically correct and still wrong.

1. **Never lead with the technology.** No scanner, point cloud, BIM or technical
   specification in a hero or an opening line. The first screen says who the page is
   for, what goes wrong, and why it costs time and money.
2. **Consequence, not output.** "3D laser scanning" / "BIM model" / "Point cloud"
   describe deliverables, not value. Write what the client avoided, did faster, or
   decided earlier.
3. **Proof over claims.** Banned adjectives: *high quality, accurate, professional,
   industry leading*. If there is no number, process or client quote to back a claim,
   it becomes a `[[TODO]]` placeholder rather than a confident sentence.
4. **Keep the disqualification.** *"Not private residential work. Not low-budget
   one-off surveys."* recurs across the briefs on purpose — it exists to improve lead
   quality. Do not soften or drop it.

The argument every page makes:

```
missing or untrustworthy building information
  → an assumption, or another site visit
  → redesign, coordination problems, extra investigation
  → lost time and cost
```

## i18n

- **Every user-visible string goes through a message key.** No literal text in JSX.
  Add the key to **both** `messages/en.json` and `messages/sv.json`.
- Server Components: `const t = await getTranslations('namespace')`.
  Client Components: `const t = useTranslations('namespace')`.
- Locale routing is next-intl middleware in `proxy.ts`.
- Copy-briefs arrive in English only. Swedish is our translation and is pending client
  review.

## Placeholders

The briefs are proof-led but the proof does not exist yet (~25 `[XX]` slots). Rather
than inventing numbers or writing vague filler, unavailable content is marked so both
we and the client can see exactly what is missing and where.

**The marker**, in both catalogues:

```json
"metrics.item0.value": "[[TODO: retail locations delivered — e.g. 42]]"
```

**Rendering** goes through `atoms/Pending.tsx`, never a raw `{t('key')}`:

```tsx
<Pending>{t('metrics.item0.value')}</Pending>
```

- `Pending` renders the dashed amber "Todo" box **unconditionally, everywhere** —
  matching the imported design, which always shows its placeholder badges rather than
  hiding them. There is no production/preview distinction: `NEXT_PUBLIC_SHOW_PLACEHOLDERS`
  no longer gates the badge itself.
- Real content passes through untouched, so `Pending` is safe to leave in place once
  the value arrives.
- `placeholdersVisible` still exists as an export and is used to decide whether to hide an
  *entire* section when its content is still pending, rather than show it half-empty — that's a
  separate decision from the badge's own visibility and is unaffected by the above.
  `ProjectsTemplate` is the reference: it gates both `CaseStudyFeature` blocks, whose copy is
  entirely unfilled, and swaps the index cards that point at them from an in-page anchor to the
  matching sector page so no cell is left linking to a section that did not render.

**A marker must be the entire value.** `"We delivered [[TODO: n]] stores"` is not
detected and would leak the brackets to production — split it into a sentence that is
whole, or into two keys.

`yarn todos` reports every open slot grouped by page, and flags **locale drift** — a
key filled in one catalogue but still pending in the other.

## Conventions

- **`type`, not `interface`.**
- **Arrow function components**, named exports. Exception: `app/**` file conventions
  (`page`, `layout`, `generateMetadata`) use default exports where Next.js requires it.
- **No enums** — `as const` object plus a derived union.
- **`cn()` from `@/lib/utils`** for conditional classes, not template-string concatenation.
- **Code is English.** Identifiers, component names, message *keys*, types and comments
  are English regardless of what the UI renders. Swedish appears only in
  `messages/sv.json`.
- **No trivial comments.** Do not restate what the code says. Comment only what the code
  cannot express: a constraint from a brief, a non-obvious choice, a workaround.

  A comment earns its place by answering **why**, never **what**. Concretely:

  - Delete it if removing it loses nothing — `// On touch devices: activate when scrolled
    into view` above `isHoverDevice ? isHovered : isInView` is the code read aloud.
  - No section banners, no `// --- helpers ---`, no `// imports`, no comment restating a
    component, prop or constant name. A well-named `DETAIL_MAX_HEIGHT_PX` needs no
    `// max height`; it needs the reason that number and not another.
  - No commented-out code, no `// TODO` in source. Missing *content* is a `[[TODO: …]]`
    marker in `messages/*.json` (see Placeholders); missing *work* belongs in the issue
    tracker, not a comment that nothing lists.
  - Prefer the JSDoc form (`/** … */`) on a type, prop or exported symbol, and a line
    comment inside a function body.
  - **A comment must not point at something that does not exist.** If you delete or move
    a file, grep for it and fix every comment naming it — stale pointers cost more time
    than no comment at all.
  - When you touch code that carries a comment, re-read the comment. Leaving it describing
    the previous behaviour is worse than having written nothing.
- **No magic numbers.** A literal with non-obvious meaning becomes a named constant.
- **Static config is not translated.** `config/` holds hrefs, gradients, image URLs,
  icons — never user-visible text. Text lives in `messages/`.
- **One definition per design value.** The dark navy behind the hero, the proof band and
  every full-width CTA is `DEEP_BLUE_GRADIENT` in `config/gradients.ts`. Do not paste a
  `linear-gradient(...)` string into a component; eight hand-copied copies had already
  drifted apart at the midpoint stop before they were consolidated.
- **No invented spacing.** Section padding, container width and the gaps between a
  headline, its body and the block beneath it come from the scale in **Spacing and
  rhythm** below. Pick the nearest row; do not reach for a fresh number.
- **Mono is for structural labels only.** `atoms/MonoLabel` is the single definition —
  indices, coordinates, fixed field names. Never a sentence, and never copy the client
  wrote. Do not write `font-mono` by hand.
- **No CSS `filter` over a live map iframe.** It forces the compositor to re-rasterise the
  whole frame continuously and jams the page. Darken with a scrim instead — see
  `organisms/contact/OfficeMap.tsx`.

### Spacing and rhythm

Every value here is measured from the redesign `.dc.html`, so a section built to this
scale lands on the design without a second pass. Written as Tailwind v4 scale utilities
(`py-30` is 7.5rem is 120px) rather than arbitrary `[...]` values.

**The section frame**

| Slot | Class | Design |
|------|-------|--------|
| Horizontal inset | `px-6 sm:px-8 lg:px-10` | 40px |
| Standard section | `py-24 lg:py-30` | 120px |
| Inverted / dark band | `py-24 lg:py-28` | 112px |
| Closing CTA | `py-24 lg:py-35` | 140px |
| Page frame | `mx-auto max-w-shell` | 1920px |
| Default container | `mx-auto max-w-page` | 1240px |
| Wide diagram container | `mx-auto max-w-wide` | 1400px |
| CTA container | `mx-auto max-w-cta` | 1000px |
| Single prose column | `mx-auto max-w-measure` | 900px |

**Inside a section**

| Step | Class | Design |
|------|-------|--------|
| eyebrow → headline | `mt-6` | 24px |
| headline → supporting body | `mt-5` | 20px |
| headline → main prose | `mt-8` | 32px |
| header block → grid or rows | `mt-14` | 56px |
| header block → full-width diagram | `mt-18` | 72px |
| diagram or rows → footnote | `mt-11` | 44px |
| headline → CTA button | `mt-11` | 44px |
| card grid | `gap-px` over a `bg-border` parent | 1px hairline |
| two-column split | `gap-10 lg:gap-16` | 64px |

The design draws card grids as a hairline lattice, not as detached cards: the grid gets
`gap-px` on a `bg-border` background and each cell paints its own opaque background. Do
not substitute `gap-4` and a `border` per card — the result reads as a different design.

**The hero**

| Step | Class | Design |
|------|-------|--------|
| Section height | `lg:min-h-[calc(100svh-4rem)]`, content bottom-aligned | full viewport minus the 64px navbar |
| Hero padding | `pt-28 pb-16` at `lg` | 112 / 64px |
| eyebrow → h1 | `mt-7` | 28px |
| h1 → subheadline | `mt-7` | 28px |
| subheadline → CTA row | `mt-10` | 40px |
| CTA row internal | `gap-6` | 24px |
| main column → side rail | `gap-10 lg:gap-16`, rail `w-85` | 340px / 64px |

A hero side rail is a desktop split: it stacks under the copy at narrower widths and
swaps its `border-l` for a `border-t`, so the hero never forces a horizontal scroll. Split
it only at the width where the headline still holds its authored line breaks — the rail
costs the headline 340px plus the gap, and a hero headline that wraps mid-line has lost
the shape the design drew.

## Server vs Client Components

Default to Server Components. Reach for `"use client"` only for real interactivity
(event handlers, `useState`, browser APIs, Framer Motion) and push it to the smallest
leaf, so translations stay off the client bundle.

Pages resolve translations on the server and pass plain strings down as props — see
`app/[locale]/(pages)/contact/page.tsx`. That is the established pattern here; follow
it rather than calling `useTranslations` inside a deep client component.

## Forms

Zod 4 + Server Actions. No react-hook-form. The reference implementation is the contact
form:

- `organisms/contact/contactSchema.ts` — Zod schema plus a `validateContactForm`
  helper used for optimistic client-side validation
- `organisms/contact/ContactForm.tsx` — `useActionState`, per-field errors, Turnstile
- `app/actions/contact.ts` — re-validates server-side (never trust the client), verifies
  Turnstile, sends through Resend

Validation messages are returned as **keys** (`'required'`, `'invalidEmail'`) and mapped
to translated strings in the component, so the action stays locale-agnostic.

Zod 4 notes: string formats are top-level (`z.email()`), coercion is `z.coerce.number()`.

## Git

**One feature, one commit.** Not a stream of WIP commits, and not several features
bundled together.

**Never push.** Committing is fine; pushing is the user's call.

## Before you finish

- [ ] `yarn lint` and `yarn build` both pass
- [ ] New strings exist in **both** `messages/en.json` and `messages/sv.json`
- [ ] No literal user-visible text in JSX
- [ ] Content checked against the four copy rules above
- [ ] Missing client data marked `[[TODO: …]]` and rendered through `Pending`
- [ ] New components sit in the right atomic tier and import only upward
- [ ] Interactive changes exercised in a browser, not just compiled
