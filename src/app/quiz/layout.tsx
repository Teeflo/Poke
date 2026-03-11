import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PokéQuiz — Test Your Pokémon Knowledge",
  description: "Test your Pokémon knowledge with our interactive quiz. Multiple game modes: Time Attack, Survival, and Marathon!",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
