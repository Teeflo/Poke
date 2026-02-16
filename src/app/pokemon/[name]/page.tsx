'use client';

import { useQuery } from '@tanstack/react-query';
import { getPokemonDetail, getPokemonSpecies } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Ruler, Weight, Sparkles, Swords } from 'lucide-react';
import { TYPE_COLORS } from '@/types/pokemon';
import { motion } from 'framer-motion';
import { formatId } from '@/lib/utils';
import React from 'react';
import { EvolutionChain } from '@/components/pokemon/EvolutionChain';

const STAT_LABELS: Record<string, string> = {
  'hp': 'HP',
  'attack': 'ATK',
  'defense': 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  'speed': 'SPD',
};

export default function PokemonDetailPage() {
  const params = useParams();
  const name = params?.name as string;
  const router = useRouter();

  const { data: pokemon, isLoading: isPokemonLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => getPokemonDetail(name),
    enabled: !!name,
  });

  const { data: species, isLoading: isSpeciesLoading } = useQuery({
    queryKey: ['species', pokemon?.species.name],
    queryFn: () => getPokemonSpecies(pokemon!.species.name),
    enabled: !!pokemon?.species.name,
  });

  if (isPokemonLoading || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const color = TYPE_COLORS[mainType] || '#A8A77A';

  // Flavor text (English)
  const flavorText = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  )?.flavor_text.replace(/\f/g, ' ');

  // Genus (English)
  const genus = species?.genera.find(
    (g) => g.language.name === 'en'
  )?.genus;

  const statMax = 255;
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="relative min-h-[40vh] w-full flex flex-col items-center justify-end pb-12 pt-24 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div
            className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] rounded-[100%] blur-3xl opacity-40 mix-blend-multiply"
            style={{ backgroundColor: color }}
          />
        </div>

        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 neu-btn-icon z-20 text-foreground/60 hover:text-primary transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="absolute top-10 right-10 text-foreground/10 font-black text-7xl md:text-8xl select-none z-0">
          {formatId(pokemon.id)}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10 group"
        >
          {/* Scan Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-[10%] w-full top-0 left-0 animate-[scan_3s_linear_infinite] z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20 pb-20 max-w-5xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground capitalize mb-3 tracking-wide">
            {pokemon.name}
          </h1>

          {genus && (
            <div className="flex flex-col items-center gap-1 mb-6">
              <p className="text-sm text-foreground/50 font-semibold uppercase tracking-widest">{genus}</p>
              {species?.habitat && (
                <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-tighter italic">Found in {species.habitat.name}</p>
              )}
            </div>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="neu-tag text-white shadow-md px-5 py-1.5 text-sm"
                style={{ backgroundColor: TYPE_COLORS[t.type.name] || color }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Stats Section */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="neu-flat p-8 rounded-[2rem]"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-foreground/80 flex items-center gap-2">
                <Swords className="w-5 h-5 text-primary" />
                Base Stats
              </h3>
              <span className="text-sm font-bold text-foreground/40">Total: {totalStats}</span>
            </div>
            <div className="space-y-5">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center gap-3">
                  <span className="w-16 font-bold uppercase text-foreground/50 text-xs tracking-wider">
                    {STAT_LABELS[s.stat.name] || s.stat.name}
                  </span>
                  <span className="w-10 font-bold text-right text-foreground/80 text-sm tabular-nums">{s.base_stat}</span>
                  <div
                    className="flex-1 h-3 rounded-full overflow-hidden"
                    style={{ boxShadow: 'var(--stat-inset)' }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((s.base_stat / statMax) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: color,
                        boxShadow: 'var(--stat-bar-shadow)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="neu-flat p-8 rounded-[2rem]"
            >
              <h3 className="text-xl font-bold mb-6 text-foreground/80">About</h3>
              {isSpeciesLoading ? (
                <div className="h-20 animate-shimmer rounded-xl" />
              ) : (
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                  {flavorText || "No description available."}
                </p>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="neu-pressed p-4 rounded-2xl flex flex-col items-center text-center">
                  <Weight className="w-5 h-5 text-foreground/40 mb-2" />
                  <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-wider mb-1">Weight</p>
                  <p className="text-base font-bold text-foreground/80">{pokemon.weight / 10} kg</p>
                </div>
                <div className="neu-pressed p-4 rounded-2xl flex flex-col items-center text-center">
                  <Ruler className="w-5 h-5 text-foreground/40 mb-2" />
                  <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-wider mb-1">Height</p>
                  <p className="text-base font-bold text-foreground/80">{pokemon.height / 10} m</p>
                </div>
                <div className="neu-pressed p-4 rounded-2xl flex flex-col items-center text-center">
                  <Sparkles className="w-5 h-5 text-foreground/40 mb-2" />
                  <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-wider mb-1">Base Exp</p>
                  <p className="text-base font-bold text-foreground/80">{pokemon.base_experience || '---'}</p>
                </div>
                <div className="neu-pressed p-4 rounded-2xl flex flex-col items-center text-center">
                  <Swords className="w-5 h-5 text-foreground/40 mb-2" />
                  <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-wider mb-1">Abilities</p>
                  <div className="flex flex-col">
                    {pokemon.abilities.slice(0, 2).map(a => (
                      <span key={a.ability.name} className="text-[10px] font-bold text-foreground/70 capitalize">
                        {a.ability.name.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sprites Gallery */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="neu-flat p-8 rounded-[2rem]"
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-foreground/80">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Variations
              </h3>
              <div className="flex justify-around items-center gap-4">
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-20 h-20 md:w-24 md:h-24 neu-flat rounded-2xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pokemon.sprites.front_default} alt="Front" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-bold text-foreground/40">Default</span>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-20 h-20 md:w-24 md:h-24 neu-flat rounded-2xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pokemon.sprites.back_default} alt="Back" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-bold text-foreground/40">Back</span>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-20 h-20 md:w-24 md:h-24 neu-flat rounded-2xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pokemon.sprites.front_shiny} alt="Shiny" className="w-full h-full object-contain relative z-10" />
                  </div>
                  <span className="text-xs font-bold text-yellow-500/80">Shiny ✨</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Moves Preview */}
        {pokemon.moves.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 neu-flat p-8 rounded-[2rem]"
          >
            <h3 className="text-xl font-bold mb-6 text-foreground/80">
              Moves <span className="text-sm font-semibold text-foreground/40">({pokemon.moves.length})</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 20).map((m) => (
                <span
                  key={m.move.name}
                  className="neu-tag bg-card text-foreground/60 text-xs capitalize"
                >
                  {m.move.name.replace('-', ' ')}
                </span>
              ))}
              {pokemon.moves.length > 20 && (
                <span className="neu-tag bg-card text-foreground/40 text-xs">
                  +{pokemon.moves.length - 20} more
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Evolution Chain */}
        {species?.evolution_chain?.url && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 mb-20"
          >
            <EvolutionChain url={species.evolution_chain.url} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
