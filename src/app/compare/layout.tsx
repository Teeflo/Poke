import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compare Pokémon — Stats & Type Matchups",
  description: "Compare multiple Pokémon side-by-side to analyze their stats, types, and abilities.",
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
