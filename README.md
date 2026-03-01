# Rescan — Corporate Website

Official website for **Rescan**, a 3D scanning company offering commercial portfolios, industrial manufacturing, and 2D/3D model production services.

Built with Next.js App Router, Tailwind CSS v4, and full English/Swedish localisation.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion |
| i18n | next-intl (EN, SV) |
| Icons | Lucide React |
| Testing | Vitest + Testing Library |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm, yarn, pnpm, or bun

### Install & run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
/app
├── [locale]/
│   ├── (pages)/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── commercial-portfolios/
│   │   ├── industrial-manufacturing/
│   │   ├── model-production/
│   │   └── projects/
│   ├── layout.tsx          # Locale layout (html, body, fonts, i18n provider)
│   └── page.tsx            # Home page
├── components/
│   ├── atoms/              # Basic UI building blocks
│   ├── molecules/          # Composite components
│   ├── organisms/          # Complex sections (NavBar, Footer, HeroSection)
│   └── templates/          # Page-level layouts
├── types/
└── globals.css

/config
├── nav.ts                  # Navigation links
├── footer.ts               # Footer links & legal
├── sections.ts             # Section cards config
└── site.ts                 # Site metadata

/i18n
├── routing.ts              # Locale routing
├── navigation.ts           # i18n navigation helpers
└── request.ts              # Message loading

/messages
├── en.json                 # English translations
└── sv.json                 # Swedish translations

/public
├── assets/                 # Logo and brand assets
└── pdfs/                   # Privacy Policy, Cookie Policy
```

---

## Internationalisation

The site supports **English (en)** and **Swedish (sv)**. English is the default locale.

- Routes: `/en/about`, `/sv/about`, etc.
- Translations live in [messages/en.json](messages/en.json) and [messages/sv.json](messages/sv.json)
- Locale routing is handled by `next-intl` middleware in [proxy.ts](proxy.ts)

To add a new translation key, update both JSON files and reference it with `useTranslations()` in client components or `getTranslations()` in server components.

---

## Component Architecture

Components follow **Atomic Design**:

- **Atoms** — smallest units: `Logo`, `ScrollArrow`, `SocialLink`, `LanguageSwitcher`
- **Molecules** — combinations: `NavLinks`, `SectionCard`, `HeroText`, `MobileMenu`, `FooterNav`
- **Organisms** — full sections: `NavBar`, `Footer`, `HeroSection`, `SectionsGrid`
- **Templates** — page wrappers: `HomeTemplate`

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Home — hero + section cards |
| `/commercial-portfolios` | Commercial portfolio services |
| `/industrial-manufacturing` | Industrial manufacturing services |
| `/model-production` | 2D/3D model production services |
| `/projects` | Project showcase |
| `/about` | About the company |
| `/contact` | Contact page |

All routes are available under both locale prefixes (`/en/...`, `/sv/...`).

---

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` triggers an automatic production deployment.

No environment variables are required for the base setup.
