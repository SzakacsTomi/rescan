# Rescan — Corporate Website

Bilingual (EN/SV) marketing site for **Rescan**, a Swedish B2B company selling
existing-condition building information to **retail chains** and **logistics
warehouses**.

Built with Next.js 16 (App Router), Tailwind CSS v4 and next-intl.

> Working on this repo? Read [AGENTS.md](AGENTS.md) first — it holds the copy rules, the
> placeholder workflow and the repo-specific gotchas. This README is the short version.

---

## Getting started

Requires **Node 20+** and **Yarn 4** (the repo pins it via `.yarnrc.yml`).

```bash
yarn install
yarn dev          # http://localhost:3000 → redirects to /en
```

### Scripts

| Command       | What it does                                            |
|---------------|---------------------------------------------------------|
| `yarn dev`    | Development server                                      |
| `yarn build`  | Production build (also typechecks)                       |
| `yarn start`  | Serve the production build                              |
| `yarn lint`   | ESLint                                                  |
| `yarn test`   | Vitest + Testing Library (jsdom)                        |
| `yarn todos`  | List every open `[[TODO: …]]` copy slot (`--md` for markdown) |

### Environment

The site builds and runs with no environment variables, but one is not optional in
production: without `NEXT_PUBLIC_SITE_URL` the whole site is served `noindex` and
`robots.txt` disallows everything, which is the fail-safe that keeps preview builds
out of Google while the domain is still being decided.

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | **The public origin, no trailing slash.** Every canonical, hreflang tag, sitemap entry, Open Graph URL and JSON-LD `@id` derives from it, so changing domain is this one variable. Unset → the deployment is `noindex`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Search Console / Bing Webmaster ownership meta tags. Unset → the tags are omitted. |
| `RESEND_API_KEY` | Sending the contact form by email. Unset → the form succeeds and logs a warning. |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile on the contact form. Unset → the check is skipped. |
| `CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | The `/retail-property-portfolios` hero carousel, which lists a Cloudinary folder. |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `true` keeps case-study cards and sections whose copy is still pending visible, for client review. |

---

## Layout

```
app/[locale]/(pages)/   routes — thin; resolve translations, compose a template
app/[locale]/page.tsx   home (outside (pages): renders its own NavBar + Footer)
app/components/         atoms → molecules → organisms → templates
app/actions/            Server Actions
app/emails/             transactional email HTML
app/hooks/              client hooks
app/types/              shared types
config/                 static, non-translated config (nav, footer, sectors, gradients)
lib/                    framework-agnostic helpers (cn, cloudinary)
i18n/                   routing + request config
messages/               en.json + sv.json — every user-visible string
scripts/                repo tooling
proxy.ts                next-intl locale routing (Next 16's middleware file convention)
```

Components follow atomic design; dependencies point one way only
(`templates → organisms → molecules → atoms → lib`).

## Routes

| Route | Notes |
|---|---|
| `/` | Hero, sector split, cost ladder, proof, qualification |
| `/retail-property-portfolios` | Sector page with a Cloudinary carousel hero |
| `/logistics-warehouses` | Sector page with the consequence chain |
| `/projects` | Two case studies plus fifteen older references |
| `/about` | Company page |
| `/contact` | Zod + Server Action + Resend + Turnstile |

Retired routes 308-redirect (see `RETIRED_ROUTES` in `next.config.ts`):
`/commercial-portfolios` → `/retail-property-portfolios`, `/retail-chains` →
`/retail-property-portfolios`, `/industrial-manufacturing` → `/logistics-warehouses`,
`/model-production` → `/`, `/why-rescan` → `/`.

All pages are served under both locale prefixes: `/en/...` and `/sv/...`.

## Internationalisation

Every user-visible string goes through a message key in **both**
[messages/en.json](messages/en.json) and [messages/sv.json](messages/sv.json) — a key
present in one and missing from the other fails the build on purpose.

Copy the client still owes us is written as `[[TODO: what we need]]` rather than invented,
and rendered through `atoms/Pending.tsx` as a visible amber badge. `yarn todos` lists
every open slot and flags locale drift.

## Deployment

Vercel. Pushing to `main` triggers a production deploy.
