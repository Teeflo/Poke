# Pokédex Improvements

## Goal
Implement a series of requested enhancements for the Pokédex, focusing on technical foundations, UI features, and accessibility.

## Tasks
- [x] Task 1: Replace all `<img>` with `next/image` in `team/page.tsx`, `quiz/page.tsx`, `compare/page.tsx`, and `RecentlyViewed.tsx` → Verify: Images load correctly and use Next.js optimization.
- [x] Task 2: Add `aria-label` to all icon buttons in `Header.tsx`, `PokemonCard.tsx`, and `PokemonDetailPage` → Verify: Accessibility audit passes for buttons.
- [x] Task 3: Add dynamic metadata to `pokemon/[name]/page.tsx` and static metadata to other main pages → Verify: Browser tab shows correct title/description for each page.
- [x] Task 4: UI Polish for `EvolutionChain.tsx` to make it more like a timeline → Verify: Visual representation is linear/branched and clearly shows evolution steps.
- [x] Task 5: Enhance Team Builder suggestions in `team-analysis.ts` based on types and stats → Verify: Suggestions panel shows relevant Pokémon to cover weaknesses.
- [x] Task 6: Implement Quiz filtering by Generation and Type in `quiz/page.tsx` → Verify: Quiz only selects Pokémon from chosen generation/type.
- [x] Task 7: Add educational "Infos" tab to the Pokémon detail page → Verify: New tab explains type matchups and roles.
- [x] Task 8: Final verification and linting → Verify: `npm run lint` and `npm run build` pass without errors.

## Done When
- [x] All technical and UI enhancements are implemented and verified.
- [x] The app is more accessible and SEO-friendly.
- [x] Team Builder and Quiz features are expanded as requested.
