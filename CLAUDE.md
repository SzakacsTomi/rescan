# Rescan — Claude Context

## Project

Corporate website for **Rescan**, a Swedish B2B company specialising in 3D scanning services. Target audience: asset managers, engineering teams, architects, and consultants.

**Supported locales:** English (`en`) and Swedish (`sv`). English is the default.

---

## Tech Stack

- **Next.js 16** — App Router, server components by default
- **TypeScript 5** — strict mode
- **Tailwind CSS v4** — no `tailwind.config.ts`, configured via CSS
- **shadcn/ui** — style: "new-york", base color: slate
- **Framer Motion** — animations
- **next-intl v4** — i18n (server: `getTranslations`, client: `useTranslations`)
- **Lucide React** — icons
- **Vitest** — unit testing

---

## Commands

```bash
npm run dev      # development server
npm run build    # production build
npm run lint     # ESLint
```

---

## Architecture

Components follow **Atomic Design**:
- `atoms/` — smallest units (Logo, ScrollArrow, SocialLink, LanguageSwitcher)
- `molecules/` — composites (NavLinks, SectionCard, HeroText, MobileMenu, FooterNav)
- `organisms/` — full sections (NavBar, Footer, HeroSection, SectionsGrid)
- `templates/` — page-level wrappers (HomeTemplate)

Static config lives in `/config/` (nav, footer, sections, site).

---

## i18n Rules

- Every user-facing string must be in both `messages/en.json` and `messages/sv.json`
- Never hardcode visible text in components
- Server components use `getTranslations()`, client components use `useTranslations()`
- Locale routing is handled by next-intl middleware in `proxy.ts`

---

## Key Conventions

- Prefer editing existing files over creating new ones
- No unnecessary comments — only where logic is non-obvious
- No over-engineering — build for current requirements, not hypothetical future ones
- Keep components lean; extract to atoms/molecules only when reused
- Use `clsx` + `tailwind-merge` (via `cn()`) for conditional classes
- Path alias: `@/` maps to project root

---

## Pages

| Route | Status |
|---|---|
| `/` | Done — Hero + SectionsGrid |
| `/commercial-portfolios` | Placeholder |
| `/industrial-manufacturing` | Placeholder |
| `/model-production` | Placeholder |
| `/projects` | Placeholder |
| `/about` | Placeholder |
| `/contact` | Placeholder — no form yet |

---

## Notes

- No analytics or cookie consent implemented yet
- Cookie Policy and Privacy Policy are PDFs in `/public/pdfs/`
- Footer and nav links are config-driven (`/config/footer.ts`, `/config/nav.ts`)
- No environment variables required for base setup
