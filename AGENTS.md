# Agent Instructions

## Package Manager
Use **npm**: `npm install`, `npm run dev`, `npm run build`

## Tech Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** + `clsx` + `tailwind-merge`
- **TanStack React Query** for data fetching
- **Zustand** for client state
- **Framer Motion** for animations
- **Axios** for HTTP requests (PokeAPI)
- **Lucide React** for icons

## Project Structure
```
src/
├── app/          # Next.js App Router pages & layouts
├── components/   # Reusable React components
├── lib/          # API client (api.ts), utilities (utils.ts)
├── store/        # Zustand stores
└── types/        # TypeScript type definitions
```

## Path Alias
`@/*` → `./src/*`

## File-Scoped Commands
| Task | Command |
|------|---------|
| Lint | `npx eslint path/to/file.ts` |
| Typecheck | `npx tsc --noEmit` |

## Key Conventions
- Images from `raw.githubusercontent.com/PokeAPI/**` and `pokeapi.co` are allowed in `next.config.ts`
- ESLint uses `eslint-config-next` (core-web-vitals + typescript)
- Tailwind config lives in CSS (`postcss.config.mjs` + `@tailwindcss/postcss`)
- Don't duplicate linter/formatter rules — they live in config files

## Commit Attribution
AI commits MUST include:
```
Co-Authored-By: Gemini <noreply@google.com>
```
