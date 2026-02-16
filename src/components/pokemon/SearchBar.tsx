'use client';

import { usePokedexStore } from '@/store/pokedex';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = usePokedexStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative flex items-center w-full max-w-lg mx-auto my-8 px-4 group"
    >
      <div className="absolute left-8 pointer-events-none text-foreground/40 group-focus-within:text-primary transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Press / to search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="neu-input pl-12 pr-12 py-4 text-foreground placeholder:text-foreground/30 text-base md:text-lg font-semibold transition-all focus:ring-2 focus:ring-primary/20"
        aria-label="Search for a Pokémon by name"
        id="pokemon-search"
      />
      <div className="absolute right-12 pointer-events-none hidden md:block">
        <kbd className="px-2 py-1 text-[10px] font-bold text-foreground/20 bg-foreground/5 rounded-md border border-foreground/10 uppercase">
          /
        </kbd>
      </div>
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-8 text-foreground/40 hover:text-primary transition-colors focus:outline-none"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}
