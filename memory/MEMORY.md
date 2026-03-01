# Rescan Project Memory

## Project
- B2B 3D scanning company website (Swedish company, EN + SV locales)
- Next.js 16 App Router, Tailwind CSS v4, next-intl, shadcn/ui, Framer Motion
- CLAUDE.md exists at project root with full context

## Key Paths
- Pages: `app/[locale]/(pages)/`
- Components: `app/components/{atoms,molecules,organisms,templates}/`
- Config: `config/{nav,footer,sections,site}.ts`
- Translations: `messages/{en,sv}.json`
- i18n setup: `i18n/{routing,navigation,request}.ts`
- Middleware: `proxy.ts`

## Status
- Home page done (Hero + SectionsGrid)
- All other pages are placeholders
- No contact form yet
- No analytics or cookie consent implemented

## Conventions
- Always update both en.json and sv.json for new strings
- No hardcoded visible text in components
- Atomic Design pattern for components
- `npm run dev` to run locally
