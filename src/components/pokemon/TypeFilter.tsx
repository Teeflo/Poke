'use client';

import { usePokedexStore } from '@/store/pokedex';
import { TYPE_COLORS } from '@/types/pokemon';
import { cn, capitalize } from '@/lib/utils';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TypeFilter() {
  const { selectedType, setSelectedType } = usePokedexStore();
  const types = Object.keys(TYPE_COLORS);

  return (
    <div className="w-full overflow-x-auto pb-6 pt-2 scrollbar-hide">
      <div className="flex flex-nowrap md:flex-wrap gap-3 justify-start md:justify-center px-6 min-w-max md:min-w-0 mx-auto max-w-5xl">
        <AnimatePresence>
          {selectedType && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setSelectedType(null)}
              className="neu-btn px-6 py-2 text-sm text-foreground/60 hover:text-primary"
            >
              <X className="w-4 h-4" />
              Clear
            </motion.button>
          )}
        </AnimatePresence>
        
        {types.map((type) => {
          const isActive = selectedType === type;
          const color = TYPE_COLORS[type];
          
          return (
            <button
              key={type}
              onClick={() => setSelectedType(isActive ? null : type)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                isActive 
                  ? "neu-pressed text-foreground" // Enfoncé quand actif
                  : "neu-flat hover:-translate-y-1" // Sorti quand inactif
              )}
              style={{ 
                color: isActive ? color : undefined,
                borderColor: 'transparent' // S'assurer qu'il n'y a pas de bordure
              }}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
