import { Metadata } from 'next';
import { getPokemonDetail } from '@/lib/api';

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = (await params).name;
  try {
    const pokemon = await getPokemonDetail(name);
    const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    return {
      title: `${displayName} — Pokédex Details`,
      description: `Explore detailed stats, types, and evolution chain for ${displayName}.`,
      openGraph: {
        images: [pokemon.sprites.other['official-artwork'].front_default || ''],
      },
    };
  } catch {
    return {
      title: 'Pokémon Details — Pokédex',
    };
  }
}

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
