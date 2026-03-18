import { Metadata } from 'next';
import { getPokemonDetail } from '@/lib/api';
import { t } from '@/lib/server-i18n';

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = (await params).name;
  try {
    const pokemon = await getPokemonDetail(name);
    const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const types = pokemon.types
      .map((type) => t(`types.${type.type.name}`, { defaultValue: type.type.name }))
      .join(', ');
    const artwork = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

    const title = t('meta.pokemon_title', { name: displayName });
    const description = t('meta.pokemon_description', { name: displayName, types });

    return {
      title,
      description,
      alternates: {
        canonical: `/pokemon/${name}`,
      },
      openGraph: {
        title,
        description,
        url: `/pokemon/${name}`,
        images: [{ url: artwork || '' }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [artwork || ''],
      }
    };
  } catch {
    return {
      title: t('meta.pokemon_fallback_title'),
    };
  }
}

export default async function PokemonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  let jsonLd = null;

  try {
    const pokemon = await getPokemonDetail(name);
    const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: `${displayName} Pokémon Data`,
      description: `Comprehensive data including stats, abilities, and moves for ${displayName}.`,
      url: `https://primedex.vercel.app/pokemon/${name}`,
      creator: {
        '@type': 'Organization',
        name: 'PrimeDex',
      },
      image: imageUrl,
      keywords: `Pokemon, ${displayName}, ${pokemon.types.map((t: any) => t.type.name).join(', ')}`,
    };
  } catch (e) {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
