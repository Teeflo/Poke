'use client';

import { usePokedexStore } from '@/store/pokedex';
import { X, Volume2, VolumeX, Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal() {
  const { isSettingsOpen, toggleSettings, soundEnabled, toggleSound, theme, setTheme } = usePokedexStore();

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={toggleSettings}
          role="dialog"
          aria-modal="true"
          aria-label="Settings"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="neu-flat p-8 w-full max-w-sm rounded-[2rem] bg-card"
            style={{ boxShadow: 'none' }}
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-foreground/10">
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Settings</h2>
              <button
                onClick={toggleSettings}
                className="neu-btn-icon w-10 h-10 text-foreground/60 hover:text-primary transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Sound Toggle */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-colors ${soundEnabled ? 'text-primary bg-primary/10' : 'text-foreground/40 bg-background'}`}
                    style={{ boxShadow: 'var(--neu-shadow-sm-inset-dark), var(--neu-shadow-sm-inset-light)' }}
                  >
                    {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </div>
                  <span className="font-bold text-foreground/80">Sound Effects</span>
                </div>
                <button
                  onClick={toggleSound}
                  className="relative w-16 h-8 rounded-full transition-all duration-300"
                  style={{ boxShadow: 'var(--neu-shadow-sm-inset-dark), var(--neu-shadow-sm-inset-light)' }}
                  aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
                  role="switch"
                  aria-checked={soundEnabled}
                >
                  <span className={`absolute top-1 w-6 h-6 rounded-full bg-primary shadow-md transition-all duration-300 ${soundEnabled ? 'left-9' : 'left-1'}`} />
                </button>
              </div>

              {/* Theme Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl text-foreground/60 bg-background"
                    style={{ boxShadow: 'var(--neu-shadow-sm-inset-dark), var(--neu-shadow-sm-inset-light)' }}
                  >
                    <Monitor className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-foreground/80">Theme</span>
                </div>
                <div className="flex gap-3">
                  {themeOptions.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={`flex-1 flex flex-col items-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold transition-all duration-300 ${theme === value
                          ? 'text-primary neu-pressed'
                          : 'text-foreground/50 hover:text-foreground/80 neu-flat'
                        }`}
                      style={theme === value ? {} : { borderRadius: '1rem' }}
                      aria-pressed={theme === value}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-foreground/10 text-center">
                <p className="text-xs text-foreground/40 font-bold tracking-widest">v2.0.0 — SOFT UI</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
