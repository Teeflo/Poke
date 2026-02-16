# Agent Guide for Poke/pokedex

This repository contains a Next.js application located in the `pokedex/` subdirectory. All commands and file operations should be performed relative to that directory unless otherwise specified.

## 1. Build, Lint, and Test Commands

**Working Directory:** `pokedex/`

### Development
- **Start Dev Server:** `npm run dev` (Runs Next.js development server)
- **Production Build:** `npm run build`
- **Start Production Server:** `npm run start`

### Code Quality
- **Linting:** `npm run lint` (Runs ESLint)
- **Type Checking:** `npx tsc --noEmit` (Runs TypeScript compiler check without emitting files)

### Testing
*Note: No test runner (Jest/Vitest) is currently configured in `package.json`.*
- **Manual Verification:** Use `npm run build` to ensure type safety and successful build compilation.
- **Future:** If adding tests, prefer **Vitest** for compatibility with Vite/Next.js ecosystems.

## 2. Code Style & Conventions

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query) + Axios
- **UI/Animation:** Framer Motion, Lucide React

### File Structure
- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable React components.
- `src/lib/`: Utility functions and configuration (e.g., `utils.ts`, `api.ts`).
- `src/store/`: Global state stores (Zustand).
- `src/types/`: TypeScript type definitions.

### Coding Standards

**Imports:**
- Use absolute imports with the `@/` alias (e.g., `import { cn } from '@/lib/utils'`).
- Group imports: External (React, Next, libs) -> Internal (Components, Types, Utils, Stores).

**Components:**
- Use **Functional Components** with named exports.
- **Props Interface:** Define `InterfaceNameProps` immediately before the component.
- **Client Components:** Add `'use client';` directive at the top only when necessary (interactive hooks, browser APIs).

**Styling:**
- Use **Tailwind CSS** utility classes.
- Use the `cn(...)` utility (from `@/lib/utils`) for conditional class merging.
- **Naming:** use `kebab-case` for file names generally, but `PascalCase` for React Component files (e.g., `PokemonCard.tsx`).

**Types:**
- Explicitly type component props.
- Use `interface` for object definitions and `type` for unions/primitives.
- Avoid `any`; use `unknown` or specific types.

**State Management:**
- Use **Zustand** for global client-side state.
- Keep stores small and focused (e.g., `usePokedexStore`).

**Data Fetching:**
- Use **React Query** (`useQuery`, `useMutation`) for server state.
- Create typed wrappers around Axios in `@/lib/api.ts` if needed.

**Error Handling:**
- Use `try/catch` blocks in async functions (e.g., inside `queryFn`).
- Handle loading and error states in UI components (e.g., `if (isLoading) return ...`).

### Example Component Pattern
```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  id: number;
  name: string;
  className?: string;
}

export function PokemonCard({ id, name, className }: PokemonCardProps) {
  // Implementation...
  return (
    <div className={cn("p-4 rounded-lg", className)}>
      {/* Content */}
    </div>
  );
}
```
