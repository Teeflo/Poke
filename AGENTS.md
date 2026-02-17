# AGENTS.md - Agent Coding Guidelines

This file provides guidelines for agentic coding agents operating in this repository.

## Project Overview

- **Project Type**: Next.js 16 (App Router) with React 19, TypeScript
- **Package Manager**: npm
- **Styling**: Tailwind CSS 4 with custom neumorphic design system
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query + axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Path Alias**: `@/*` maps to `./src/*`

## Commands

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

### Linting
```bash
npm run lint     # Run ESLint
```

### Testing
- **No test framework is currently configured** - Do not add tests unless explicitly requested

## Code Style Guidelines

### TypeScript
- **Strict mode enabled** in `tsconfig.json`
- Always define explicit return types for utility functions
- Use `type` for simple types, `interface` for complex/object types
- Avoid `any` - use `unknown` when type is truly unknown

### Imports
- Use single quotes for strings: `import x from 'y'`
- Use path alias `@/` for internal imports: `import { x } from '@/components/x'`
- Order imports: external libraries → internal aliases → relative paths
- Use `import { type X }` syntax when importing only types

### Naming Conventions
- **Files**: PascalCase for components (`PokemonCard.tsx`), camelCase for utilities (`api.ts`)
- **Components**: PascalCase, e.g., `export function PokemonCard()`
- **Variables/functions**: camelCase
- **Types/interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE for config values

### React Patterns
- Use `'use client'` directive for client components (those using hooks, event handlers, or browser APIs)
- Use Server Components by default, only add `'use client'` when needed
- Use functional components with arrow functions or function declarations
- Destructure props in component signature: `function Component({ prop1, prop2 }: Props)`
- Avoid default exports - use named exports for consistency

### Tailwind CSS
- Use Tailwind's utility classes for styling
- Custom neumorphic utilities available: `neu-flat`, `neu-btn`, `neu-btn-icon`, `neu-input`, `neu-tag`
- Use CSS variables from `:root` and `.dark` for theming
- Custom animation classes: `animate-shimmer`, `animate-fade-in-up`

### Error Handling
- Use try/catch for async operations
- Log errors with context using `console.error()`
- Throw errors to let calling code handle them
- Handle loading and error states in components using React Query

### State Management (Zustand)
- Create stores in `src/store/` directory
- Use `persist` middleware for persistent state
- Use `create<T>()` generic for type safety
- Destructure store values in components: `const { x, y } = useStore()`

### API Patterns
- Use axios for HTTP requests
- Create API functions in `src/lib/api.ts`
- Define response types in `src/types/`
- Use React Query for server state management
- Set appropriate `staleTime` for caching

### CSS & Styling
- Global styles in `src/app/globals.css`
- Use CSS custom properties for theming
- Support both light and dark modes via `.dark` class
- Avoid inline styles - use Tailwind classes or CSS variables
- Use `cn()` utility from `@/lib/utils` for conditional class merging

### File Organization
```
src/
├── app/           # Next.js App Router pages
├── components/    # React components (grouped by feature)
├── lib/          # Utilities and API functions
├── store/        # Zustand stores
└── types/        # TypeScript type definitions
```

### Accessibility
- Include `aria-label` on icon-only buttons
- Use semantic HTML elements
- Ensure sufficient color contrast
- Add `alt` text to images

### ESLint Configuration
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Follows Next.js best practices
- Run `npm run lint` before committing

## Cursor/Copilot Rules

None found in this repository.
