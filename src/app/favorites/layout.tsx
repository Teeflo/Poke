import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Favorites — Pokédex",
  description: "View and manage your personal collection of favorite Pokémon.",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
