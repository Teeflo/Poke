# Pokédex

A modern, beautifully crafted Pokédex application built with **Next.js 16**, **React 19**, and the **PokéAPI**. Browse, search, and explore all Pokémon from Generation 1 through 9 with a smooth, animated interface.

<p align="center">
  <a href="https://poke-nextjs.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-Click_Here-FF6B6B?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

![Pokédex Preview](./public/preview.png)

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🗃️ Comprehensive Database** | Explore all 9 generations of Pokémon |
| **⚡ Real-time Search** | Find any Pokémon instantly by name |
| **🎯 Type Filtering** | Filter by type (Fire, Water, Electric, etc.) |
| **🔄 Evolution Chains** | View complete evolution chains |
| **📊 Detailed Stats** | Stats, abilities, types, and more |
| **✨ Beautiful Animations** | Smooth transitions with Framer Motion |
| **📱 Responsive Design** | Works on desktop, tablet, and mobile |
| **🌙 Dark/Light Mode** | Toggle between themes |

## 🛠️ Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-3E3E3E?style=flat&logo=zustand)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=tanstack)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer)

</div>

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS 4
- **State**: Zustand + TanStack Query
- **Animations**: Framer Motion
- **API**: PokéAPI + Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/estde/poke.git
cd poke

# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── pokemon/[name]/     # Pokemon detail page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Context providers
├── components/
│   ├── layout/             # Header, Settings
│   └── pokemon/            # Pokemon components
├── lib/
│   ├── api.ts              # PokéAPI integration
│   └── utils.ts            # Helpers
├── store/
│   └── pokedex.ts          # Zustand store
└── types/
    └── pokemon.ts           # TypeScript types
```

## 🏗️ Architecture

```
User → Next.js Page → Component → TanStack Query → PokéAPI
                                        ↓
                                   Zustand Store
```

### State Management

- **Zustand**: Global state (search, filters, theme)
- **TanStack Query**: Server state with caching & deduplication

### API Functions

| Function | Description |
|----------|-------------|
| `getPokemonList` | Paginated list of Pokémon |
| `getAllPokemon` | All Pokémon for search |
| `getPokemonDetail` | Detailed Pokémon info |
| `getPokemonSpecies` | Species + evolution chain |
| `getEvolutionChain` | Evolution chain data |
| `getPokemonByType` | Pokémon filtered by type |

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/estde/poke)

Or build manually:

```bash
npm run build
# Deploy the .next folder to your hosting provider
```

## ⚠️ Troubleshooting

### Images Not Loading

Ensure `next.config.ts` has the correct remote patterns:

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    { protocol: 'https', hostname: 'pokeapi.co' },
  ],
},
```

### API Rate Limits

PokéAPI is free but has rate limits. Wait a moment and refresh if you encounter errors.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Pokémon and Pokémon character names are trademarks of Nintendo.

---

<div align="center">

Built with ❤️ using [Next.js](https://nextjs.org) and [PokéAPI](https://pokeapi.co/)

</div>
