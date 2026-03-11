'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { usePokedexStore } from '@/store/pokedex';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { getAllPokemonDetailed } from '@/lib/api';

function CacheInitializer() {
  useEffect(() => {
    // Check if we already have the data in IndexedDB before preloading
    const checkAndPreload = async () => {
      try {
        const { get } = await import('idb-keyval');
        const cached = await get('all-pokemon-detailed');
        if (!cached) {
          await getAllPokemonDetailed();
        }
      } catch (error) {
        console.error('Failed to check cache:', error);
        getAllPokemonDetailed().catch(console.error);
      }
    };
    
    checkAndPreload();
  }, []);

  return null;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setSystemLanguage, language, systemLanguage } = usePokedexStore();

  useEffect(() => {
    // Detect system language
    if (navigator.language) {
      const baseLang = navigator.language.split('-')[0];
      setSystemLanguage(baseLang);
    }

    const root = document.documentElement;

    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);

      const listener = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches);
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, setSystemLanguage]);

  useEffect(() => {
    const resolvedLang = language === 'auto' ? systemLanguage : language;
    i18n.changeLanguage(resolvedLang);
  }, [language, systemLanguage]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CacheInitializer />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
