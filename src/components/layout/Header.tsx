'use client';

import Link from 'next/link';
import { Gamepad2, Settings, Github, Sun, Moon } from 'lucide-react';
import { usePokedexStore } from '@/store/pokedex';
import SettingsModal from './SettingsModal';
import { useEffect, useState } from 'react';

export default function Header() {
  const { toggleSettings, theme, setTheme } = usePokedexStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (
    theme === 'dark' ||
    (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md py-4 px-6 flex justify-between items-center"
        style={{ boxShadow: 'var(--header-shadow)' }}
      >
        <Link href="/" className="flex items-center gap-3 group" aria-label="Go to Pokédex Home">
          <div className="neu-btn-icon text-primary group-hover:text-primary/80 transition-colors">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
            <span className="text-primary">POKÉ</span>DEX
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={cycleTheme}
            className="neu-btn-icon text-foreground hover:text-primary transition-colors"
            title={`Theme: ${theme}`}
            aria-label={`Switch theme (currently ${theme})`}
          >
            {mounted && isDark ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <a
            href="https://github.com/topics/pokedex"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn-icon text-foreground hover:text-primary transition-colors"
            title="View Source"
            aria-label="View source code on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            onClick={toggleSettings}
            className="neu-btn-icon text-foreground hover:text-primary transition-colors"
            title="Settings"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
      <SettingsModal />
    </>
  );
}
