'use client';

import { useQuery } from '@tanstack/react-query';
import { usePokedexStore } from '@/store/pokedex';
import { getAllPokemon, getPokemonByType } from '@/lib/api';
import { PokemonCard } from './PokemonCard';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

export default function PokemonList() {
  const { searchTerm, selectedType } = usePokedexStore();
  const [displayedCount, setDisplayedCount] = useState(20);
  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef, { once: false, amount: 0.1 });

  // Fetch all Pokemon for search
  const { data: allPokemon, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allPokemon'],
    queryFn: getAllPokemon,
    staleTime: 30 * 60 * 1000,
  });

  // Fetch Pokemon by type if selected
  const { data: typePokemon, isLoading: isLoadingType } = useQuery({
    queryKey: ['typePokemon', selectedType],
    queryFn: () => (selectedType ? getPokemonByType(selectedType) : Promise.resolve([])),
    enabled: !!selectedType,
    staleTime: 30 * 60 * 1000,
  });

  // Filter logic
  const filteredPokemon = useMemo(() => {
    if (!allPokemon) return [];

    let list = selectedType ? typePokemon : allPokemon;

    if (!list) return [];

    if (searchTerm) {
      list = list.filter((p: { name: string }) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return list;
  }, [allPokemon, typePokemon, searchTerm, selectedType]);

  // Infinite scroll
  useEffect(() => {
    if (isInView && filteredPokemon && displayedCount < filteredPokemon.length) {
      setDisplayedCount((prev) => Math.min(prev + 20, filteredPokemon.length));
    }
  }, [isInView, filteredPokemon, displayedCount]);

  // Reset pagination on filter change
  useEffect(() => {
    setDisplayedCount(20);
  }, [searchTerm, selectedType]);

  if (isLoadingAll || (selectedType && isLoadingType)) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!filteredPokemon?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-foreground/50 animate-fade-in-up">
        <div className="text-6xl mb-6 grayscale opacity-50">👾</div>
        <h3 className="text-xl font-bold mb-2 uppercase text-foreground/60">No Pokémon found</h3>
        <p className="text-sm opacity-70 text-foreground/40">Try adjusting your search or filters</p>
      </div>
    );
  }

  const totalShowing = Math.min(displayedCount, filteredPokemon.length);

  return (
    <div className="space-y-8">
      <p className="text-center text-xs font-bold text-foreground/40 uppercase tracking-widest">
        Showing {totalShowing} of {filteredPokemon.length} Pokémon
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPokemon.slice(0, displayedCount).map((p: { name: string; url: string }) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>

      {displayedCount < filteredPokemon.length && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      )}
    </div>
  );
}
