'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface EvolutionChainProps {
  url: string;
}

interface ChainLink {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
}

interface ChainResponse {
  chain: ChainLink;
}

function EvolutionItem({ name }: { name: string }) {
  const { data: sprite } = useQuery({
    queryKey: ['pokemon-sprite', name],
    queryFn: async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    },
    staleTime: Infinity,
  });

  return (
    <Link href={`/pokemon/${name}`}>
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center cursor-pointer group"
      >
        <div className="w-20 h-20 md:w-24 md:h-24 neu-flat rounded-2xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
          {sprite ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sprite}
              alt={name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <Loader2 className="w-6 h-6 animate-spin text-foreground/20" />
          )}
        </div>
        <span className="mt-3 text-xs font-bold capitalize text-foreground/60 group-hover:text-primary transition-colors">
          {name}
        </span>
      </motion.div>
    </Link>
  );
}

function ChainNode({ node }: { node: ChainLink }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
      <EvolutionItem name={node.species.name} />

      {node.evolves_to.length > 0 && (
        <div className="flex flex-col gap-6 md:gap-8 relative">
          {node.evolves_to.map((evolution) => (
            <div key={evolution.species.name} className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
              <div className="neu-btn-icon w-8 h-8 text-foreground/30">
                <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
              </div>
              <ChainNode node={evolution} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EvolutionChain({ url }: EvolutionChainProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['evolutionChain', url],
    queryFn: async () => {
      const { data } = await axios.get<ChainResponse>(url);
      return data;
    },
    staleTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="mt-8 p-8 neu-flat h-40 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data?.chain) return null;

  return (
    <div className="neu-flat p-8 mt-8 overflow-x-auto">
      <h3 className="text-xl font-bold mb-8 text-center text-foreground/80 uppercase tracking-wider">
        Evolution Chain
      </h3>
      <div className="flex justify-center min-w-max p-4">
        <ChainNode node={data.chain} />
      </div>
    </div>
  );
}
