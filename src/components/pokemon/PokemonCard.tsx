'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PokemonDetail, TYPE_COLORS } from '@/types/pokemon';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { usePokedexStore } from '@/store/pokedex';
import { cn, formatId } from '@/lib/utils';
import Link from 'next/link';

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = usePokedexStore();

  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      const { data } = await axios.get<PokemonDetail>(url);
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading || !pokemon) {
    return (
      <div className="py-4 px-2">
        <div className="neu-flat h-80 animate-shimmer" />
      </div>
    );
  }

  const isFav = isFavorite(pokemon.id);
  const mainType = pokemon.types[0].type.name;
  const color = TYPE_COLORS[mainType] || '#A8A77A';

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  return (
    <Link href={`/pokemon/${name}`} className="block h-full py-4 px-2">
      <motion.div
        whileHover={{ y: -5 }}
        className="neu-flat type-glow relative h-full p-6 flex flex-col items-center group overflow-hidden"
        style={{ '--type-color': `${color}40` } as React.CSSProperties}
      >
        {/* Subtle type color accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem] opacity-60 transition-opacity group-hover:opacity-100"
          style={{ backgroundColor: color }}
        />

        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleFavorite}
            className={cn(
              "neu-btn-icon w-10 h-10 transition-all",
              isFav ? "text-primary" : "text-foreground/30 hover:text-primary/60"
            )}
            aria-label={isFav ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          >
            <Heart className={cn("w-5 h-5 transition-transform", isFav && "fill-current scale-110")} />
          </button>
        </div>

        <span className="self-start text-xs font-bold text-foreground/30 mb-2">
          {formatId(pokemon.id)}
        </span>

        <div className="relative w-32 h-32 my-2 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={name}
            className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="mt-auto w-full text-center z-10 pt-4">
          <h3 className="text-lg font-extrabold text-foreground capitalize mb-3 tracking-wide">
            {pokemon.name}
          </h3>

          <div className="flex justify-center gap-2 flex-wrap">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="neu-tag text-white shadow-sm"
                style={{ backgroundColor: TYPE_COLORS[t.type.name] || color }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
