# Rescan

Corporate website for a Swedish B2B company selling **existing-condition building
information**. Bilingual (`en` default, `sv`), public, marketing-led, low-interactivity.
That bias explains most rules here.

**The site is mid-repositioning.** Rescan is narrowing from a general 3D-scanning
supplier to a specialist for exactly two segments: **Retail Chains** and **Logistics
Warehouses**. Six client copy-briefs drive this — they live in `docs/briefs/` and are
the source of truth for page structure and wording. Read the relevant one before
touching a page.

Current state of the work: `PROGRESS.md`. Open questions for the client: `OPEN-ITEMS.md`.

A visual redesign is being imported from a claude.ai Design project ("Hero section
redesign feedback"), synced via the `DesignSync` MCP tool / `/design-sync` skill.
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
| Components   | shadcn/ui (style `new-york`, base colour slate) + Radix        |
| Animation    | Framer Motion 12                                               |
| Icons        | lucide-react                                                   |
| i18n         | next-intl 4, locales `en` (default) and `sv`                   |
| Forms        | Zod 4 + Server Actions (no react-hook-form)                    |
| Email        | Resend                                                         |
| Anti-spam    | Cloudflare Turnstile                                           |
| Lint         | ESLint 9 flat config + `eslint-config-next`                    |
| Test         | Vitest + Testing Library (installed, no tests written yet)     |
| Package mgr  | Yarn 4 (`nodeLinker: node-modules`)                            |

There is **no backend, no CMS, and no data-fetching library**. Server Components plus
Server Actions cover current needs. Do not add React Query, Zustand, or an ORM
without being asked.

## Commands

| Task                   | Command                                  |
|------------------------|------------------------------------------|
| Dev server             | `yarn dev`                               |
| Production build       | `yarn build`                             |
| Serve build            | `yarn start`                             |
| Lint                   | `yarn lint`                              |
| List open placeholders | `yarn todos` (`--md` for markdown)       |

Verify UI work against a running server. Do not report a change as working on the
strength of a passing build alone.

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
config/                 static, non-translated config (nav, footer, sectors, projects)
lib/                    framework-agnostic helpers (cn, cloudinary)
i18n/                   routing + request config
messages/               one JSON catalogue per locale
docs/briefs/            the client copy-briefs — source of truth for page content
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
| `/model-production` | — | No brief; removed from navigation, route kept so links resolve |

`/commercial-portfolios` and `/industrial-manufacturing` 308-redirect to the first two.

### Atomic design

| Tier         | Contains                                              | May import        |
|--------------|-------------------------------------------------------|-------------------|
| `atoms/`     | One element, no composition: `Logo`, `ScrollArrow`, `Pending`, `MonoLabel` | nothing local |
| `molecules/` | A few atoms doing one job: `NavLinks`, `ProjectCard`, `ConsequenceChain`, `MapPlate` | atoms |
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
  review — see `OPEN-ITEMS.md`.

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
- `placeholdersVisible` still exists as an export and is used in a few places
  (`ProjectsGrid`, `CaseStudyBody`) to decide whether to hide an *entire* card or
  section when its content is still pending, rather than show it half-empty — that's a
  separate decision from the badge's own visibility and is unaffected by the above.

**A marker must be the entire value.** `"We delivered [[TODO: n]] stores"` is not
detected and would leak the brackets to production — split it into a sentence that is
whole, or into two keys.

`yarn todos` reports every open slot grouped by page, and flags **locale drift** — a
key filled in one catalogue but still pending in the other. That report is what feeds
`OPEN-ITEMS.md`; do not maintain a second list by hand.

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
- **No magic numbers.** A literal with non-obvious meaning becomes a named constant.
- **Static config is not translated.** `config/` holds hrefs, gradients, image URLs,
  icons — never user-visible text. Text lives in `messages/`.
- **Mono is for structural labels only.** `atoms/MonoLabel` is the single definition —
  indices, coordinates, fixed field names. Never a sentence, and never copy the client
  wrote. Do not write `font-mono` by hand.
- **No CSS `filter` over a live map iframe.** It forces the compositor to re-rasterise the
  whole frame continuously and jams the page. Darken with a scrim instead — see
  `organisms/contact/OfficeMap.tsx`.

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
- [ ] `PROGRESS.md` updated; anything newly blocked added to `OPEN-ITEMS.md`
