# Pokédex

A modern, beautifully crafted Pokédex application built with Next.js 16, React 19, and the PokéAPI. Browse, search, and explore all Pokémon from Generation 1 through 9 with a smooth, animated interface.

![Pokédex](./public/pokeapi-logo.png)

## Features

- **Comprehensive Pokémon Database** — Explore all 9 generations of Pokémon
- **Real-time Search** — Find any Pokémon instantly by name
- **Type Filtering** — Filter Pokémon by their type (Fire, Water, Electric, etc.)
- **Evolution Chains** — View evolution chains for each Pokémon
- **Detailed Stats** — See stats, abilities, types, and more for each Pokémon
- **Beautiful Animations** — Smooth transitions powered by Framer Motion
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** — Toggle between themes (if implemented)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Data Source**: [PokéAPI](https://pokeapi.co/)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or pnpm (recommended)

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/your-username/poke.git
cd poke
```

Install dependencies:

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

### Development Server

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
poke/
├── public/                 # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes (if any)
│   │   ├── pokemon/       # Dynamic Pokemon detail page
│   │   │   └── [name]/
│   │   │       └── page.tsx
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── providers.tsx  # Context providers
│   ├── components/        # React components
│   │   ├── layout/        # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── SettingsModal.tsx
│   │   └── pokemon/       # Pokemon-specific components
│   │       ├── EvolutionChain.tsx
│   │       ├── PokemonCard.tsx
│   │       ├── PokemonList.tsx
│   │       ├── SearchBar.tsx
│   │       └── TypeFilter.tsx
│   ├── lib/               # Utilities and API
│   │   ├── api.ts         # PokéAPI integration
│   │   └── utils.ts       # Helper functions
│   ├── store/             # Zustand stores
│   │   └── pokedex.ts
│   └── types/             # TypeScript types
│       └── pokemon.ts
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind configuration (if applicable)
└── tsconfig.json         # TypeScript configuration
```

## Architecture

### Request Flow

```
User Action → Next.js Page → React Component → TanStack Query → PokéAPI
                                                  ↓
                                            Zustand Store (cached state)
```

### State Management

The application uses Zustand for global state management:

- **pokedex.ts** — Manages search queries, type filters, and theme preferences

### Data Fetching

TanStack Query handles all server state:

- Automatic caching and deduplication
- Infinite scrolling for Pokemon lists
- Error and loading states
- Background refetching

### API Integration

The `api.ts` module provides:

| Function | Description |
|----------|-------------|
| `getPokemonList` | Fetches paginated list of Pokémon |
| `getAllPokemon` | Fetches all Pokémon (for search) |
| `getPokemonDetail` | Gets detailed info for a specific Pokémon |
| `getPokemonSpecies` | Gets species data including evolution chain URL |
| `getEvolutionChain` | Fetches the evolution chain data |
| `getPokemonByType` | Gets all Pokémon of a specific type |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

This project does not require any environment variables for local development. All data is fetched from the public PokéAPI.

## PokéAPI Reference

This project uses the [PokéAPI](https://pokeapi.co/), a free RESTful API for Pokémon data.

### Endpoints Used

- `/pokemon` — List of all Pokémon
- `/pokemon/{name}` — Individual Pokémon details
- `/pokemon-species/{name}` — Species data including evolution chain
- `/evolution-chain/{id}` — Evolution chain data
- `/type/{type}` — Pokémon by type

## Troubleshooting

### Pokémon Images Not Loading

Ensure the `next.config.ts` includes the correct remote patterns for image domains:

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    { protocol: 'https', hostname: 'pokeapi.co' },
  ],
},
```

### API Rate Limiting

The PokéAPI is free but has rate limits. If you encounter errors, wait a moment and refresh.

### TypeScript Errors

Ensure you have the correct TypeScript version installed:

```bash
npm install typescript@latest
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for educational purposes. Pokémon and Pokémon character names are trademarks of Nintendo.

---

Built with ❤️ using Next.js and the PokéAPI
