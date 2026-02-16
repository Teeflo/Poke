import Header from '@/components/layout/Header';
import PokemonList from '@/components/pokemon/PokemonList';
import SearchBar from '@/components/pokemon/SearchBar';
import TypeFilter from '@/components/pokemon/TypeFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary pixel-text-shadow leading-relaxed">
            Gotta Catch &apos;Em All!
          </h2>
          <p className="text-foreground/70 mt-4 text-xs md:text-sm font-semibold tracking-widest uppercase opacity-80">
            Generation 1 — 9
          </p>

          <div className="flex flex-col items-center mt-8 space-y-4">
            <SearchBar />
            <TypeFilter />
          </div>
        </section>

        <PokemonList />
      </main>

      <footer className="py-12 text-center text-[10px] md:text-xs text-foreground/60 font-semibold border-t border-foreground/10 mt-20 bg-foreground/5">
        <p>Pokédex Generation © {new Date().getFullYear()}</p>
        <p className="mt-4 opacity-50">Data provided by PokéAPI</p>
      </footer>
    </div>
  );
}
