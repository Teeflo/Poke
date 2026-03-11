'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePokedexStore } from '@/store/pokedex';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { toggleSettings, setShowFavoritesOnly, showFavoritesOnly, compareList, team } = usePokedexStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement).blur();
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case '/':
          e.preventDefault();
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          searchInput?.focus();
          break;
        case 'f':
          setShowFavoritesOnly(!showFavoritesOnly);
          break;
        case 'c':
          if (compareList.length > 0) {
            router.push('/compare');
          }
          break;
        case 't':
          router.push('/team');
          break;
        case 'q':
          router.push('/quiz');
          break;
        case 's':
          toggleSettings();
          break;
        case 'h':
          router.push('/');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, toggleSettings, setShowFavoritesOnly, showFavoritesOnly, compareList, team]);
}
