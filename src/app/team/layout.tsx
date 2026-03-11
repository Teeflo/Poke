import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Team Builder — Build Your Ultimate Squad",
  description: "Create your ideal Pokémon team, analyze its strengths and weaknesses, and get suggestions for better coverage.",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
