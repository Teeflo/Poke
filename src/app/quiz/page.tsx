'use client';

import Header from '@/components/layout/Header';
import { useQuery } from '@tanstack/react-query';
import { 
  getAllPokemonNames, 
  getPokemonDetail, 
  getPokemonByGeneration, 
  getPokemonByType 
} from '@/lib/api';
import { 
  Gamepad2, 
  Trophy, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Heart,
  Zap,
  Flame,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';
import { PokemonDetail } from '@/types/pokemon';
import { useTranslation } from 'react-i18next';
import { usePokedexStore } from '@/store/pokedex';
import { toast } from 'sonner';
import Image from 'next/image';

type GameMode = 'time-attack' | 'survival' | 'marathon';
type GameState = 'idle' | 'loading' | 'playing' | 'answered' | 'finished';

const GENERATIONS = [
  { id: '1', name: 'Gen 1' },
  { id: '2', name: 'Gen 2' },
  { id: '3', name: 'Gen 3' },
  { id: '4', name: 'Gen 4' },
  { id: '5', name: 'Gen 5' },
  { id: '6', name: 'Gen 6' },
  { id: '7', name: 'Gen 7' },
  { id: '8', name: 'Gen 8' },
  { id: '9', name: 'Gen 9' },
];

const TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export default function QuizPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [gameMode, setGameMode] = useState<GameMode>('time-attack');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonDetail | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedGen, setSelectedGen] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredPool, setFilteredPool] = useState<{ name: string; url: string }[]>([]);
  
  const { t } = useTranslation();
  const { quizHighScores, updateQuizHighScore } = usePokedexStore();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const { data: allNames } = useQuery({
    queryKey: ['allPokemonNames'],
    queryFn: getAllPokemonNames,
    staleTime: 30 * 60 * 1000,
  });

  const startNewRound = useCallback(async () => {
    const pool = filteredPool.length > 0 ? filteredPool : (allNames || []);
    if (pool.length === 0) return;
    
    setGameState('loading');
    setSelectedOption(null);
    setIsCorrect(null);

    const randomIndex = Math.floor(Math.random() * pool.length);
    const pokemon = pool[randomIndex];
    
    const detail = await getPokemonDetail(pokemon.name);
    setCurrentPokemon(detail);

    const otherOptions: string[] = [];
    const mainPool = allNames || [];
    while (otherOptions.length < 3) {
      const idx = Math.floor(Math.random() * mainPool.length);
      const p = mainPool[idx];
      if (p.name !== pokemon.name && !otherOptions.includes(p.name)) {
        otherOptions.push(p.name);
      }
    }

    setOptions([pokemon.name, ...otherOptions].sort(() => Math.random() - 0.5));
    setGameState('playing');
  }, [allNames, filteredPool]);

  const startGame = async (mode: GameMode) => {
    setGameState('loading');
    
    let pool = allNames || [];
    
    if (selectedGen || selectedType) {
      const genPool = selectedGen ? await getPokemonByGeneration(selectedGen) : null;
      const typePool = selectedType ? await getPokemonByType(selectedType) : null;
      
      if (genPool && typePool) {
        pool = genPool.filter(p1 => typePool!.some(p2 => p2.name === p1.name));
      } else if (genPool) {
        pool = genPool;
      } else if (typePool) {
        pool = typePool;
      }
    }

    if (pool.length < 4) {
      toast.error("Not enough Pokémon in this category!");
      setGameState('idle');
      return;
    }

    setFilteredPool(pool);
    setGameMode(mode);
    setScore(0);
    setStreak(0);
    setLives(3);
    setTimeLeft(30);
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    const pokemon = pool[randomIndex];
    
    const detail = await getPokemonDetail(pokemon.name);
    setCurrentPokemon(detail);

    const otherOptions: string[] = [];
    const mainPool = allNames || [];
    while (otherOptions.length < 3) {
      const idx = Math.floor(Math.random() * mainPool.length);
      const p = mainPool[idx];
      if (p.name !== pokemon.name && !otherOptions.includes(p.name)) {
        otherOptions.push(p.name);
      }
    }

    setOptions([pokemon.name, ...otherOptions].sort(() => Math.random() - 0.5));
    setGameState('playing');
  };

  const handleAnswer = (option: string) => {
    if (gameState !== 'playing' || !currentPokemon) return;
    
    setSelectedOption(option);
    const correct = option === currentPokemon.name;
    setIsCorrect(correct);
    setGameState('answered');

    if (correct) {
      setScore(s => s + (gameMode === 'time-attack' ? 10 : 1));
      setStreak(s => s + 1);
      setTimeout(startNewRound, 1500);
    } else {
      setStreak(0);
      if (gameMode === 'survival') {
        setLives(l => {
          if (l <= 1) {
            setGameState('finished');
            return 0;
          }
          return l - 1;
        });
      }
      setTimeout(startNewRound, 2000);
    }
  };

  useEffect(() => {
    if (gameState === 'finished') {
      const modeKey: 'survival' | 'marathon' = gameMode === 'time-attack' ? 'marathon' : gameMode; 
      updateQuizHighScore(modeKey, score);
    }
  }, [gameState, gameMode, score, updateQuizHighScore]);

  useEffect(() => {
    if (gameMode === 'time-attack' && (gameState === 'playing' || gameState === 'answered')) {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setGameState('finished');
            clearInterval(timer);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, gameMode]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10 max-w-4xl text-center">
        <section className="mb-12 pt-10">
          <div className="inline-block p-4 bg-primary/10 rounded-3xl border border-primary/20 mb-6">
            <Gamepad2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-2 uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">{t('quiz.title')}</h2>
          <p className="text-foreground/40 font-bold uppercase tracking-widest text-sm">{t('quiz.subtitle')}</p>
        </section>

        <div className="max-w-2xl mx-auto">
          {gameState === 'idle' || gameState === 'finished' ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel p-8 md:p-12 rounded-[3rem] space-y-8"
            >
              {gameState === 'finished' && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-6 bg-yellow-500/10 rounded-full border border-yellow-500/20 animate-bounce">
                      <Trophy className="w-16 h-16 text-yellow-500" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black">{t('quiz.game_over')}</h3>
                  <p className="text-xl font-bold text-foreground/60">
                    {gameMode === 'marathon' ? t('quiz.streak') : t('quiz.final_score')} 
                    <span className="text-primary text-2xl ml-2">{score}</span>
                  </p>
                </div>
              )}

              {/* Filters */}
              <div className="space-y-6 bg-secondary/20 p-6 rounded-[2rem] border border-white/5 text-center">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black uppercase tracking-widest text-foreground/60">Customize your challenge</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-2">Generation</p>
                    <select 
                      value={selectedGen || ''} 
                      onChange={(e) => setSelectedGen(e.target.value || null)}
                      className="w-full h-12 rounded-xl bg-background/50 border border-white/10 px-4 text-sm font-bold appearance-none cursor-pointer focus:border-primary/50 transition-colors"
                    >
                      <option value="">All Generations</option>
                      {GENERATIONS.map(gen => (
                        <option key={gen.id} value={gen.id}>{gen.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-2">Type</p>
                    <select 
                      value={selectedType || ''} 
                      onChange={(e) => setSelectedType(e.target.value || null)}
                      className="w-full h-12 rounded-xl bg-background/50 border border-white/10 px-4 text-sm font-bold appearance-none cursor-pointer focus:border-primary/50 transition-colors"
                    >
                      <option value="">All Types</option>
                      {TYPES.map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={() => startGame('time-attack')} 
                  className="h-20 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1"
                >
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    {t('quiz.mode_time_attack')}
                  </div>
                  <span className="text-[10px] opacity-50">30s {t('quiz.to_score')}</span>
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => startGame('survival')} 
                    className="h-20 rounded-2xl font-black uppercase tracking-widest text-sm border-white/10 hover:bg-red-500/10 hover:text-red-500 flex flex-col items-center justify-center gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      {t('quiz.mode_survival')}
                    </div>
                    <span className="text-[10px] opacity-50 font-bold">3 {t('quiz.lives')}</span>
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={() => startGame('marathon')} 
                    className="h-20 rounded-2xl font-black uppercase tracking-widest text-sm border-white/10 hover:bg-yellow-500/10 hover:text-yellow-500 flex flex-col items-center justify-center gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      {t('quiz.mode_marathon')}
                    </div>
                    <span className="text-[10px] opacity-50 font-bold">{t('quiz.endless_streak')}</span>
                  </Button>
                </div>
              </div>

              {quizHighScores && (
                <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">High Score Survival</p>
                    <p className="text-xl font-black text-primary">{quizHighScores.survival}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">High Score Time Attack</p>
                    <p className="text-xl font-black text-primary">{quizHighScores.marathon}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center px-6">
                <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3">
                  {gameMode === 'marathon' ? <Flame className="w-5 h-5 text-orange-500" /> : <Trophy className="w-5 h-5 text-yellow-500" />}
                  <span className="font-black text-xl tabular-nums">{score}</span>
                </div>
                
                {gameMode === 'time-attack' && (
                  <div className={cn(
                    "glass-panel px-6 py-3 rounded-2xl flex items-center gap-3 transition-colors",
                    timeLeft < 10 ? "border-red-500/50 bg-red-500/10 text-red-500" : ""
                  )}>
                    <Timer className={cn("w-5 h-5", timeLeft < 10 && "animate-pulse")} />
                    <span className="font-black text-xl tabular-nums">{timeLeft}s</span>
                  </div>
                )}

                {gameMode === 'survival' && (
                  <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Heart 
                          key={i} 
                          className={cn("w-5 h-5", i < lives ? "text-red-500 fill-current" : "text-foreground/10")} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {gameMode === 'marathon' && streak > 0 && (
                  <div className="px-6 py-3 flex items-center gap-2 text-orange-500 animate-bounce">
                    <Zap className="w-5 h-5 fill-current" />
                    <span className="font-black text-xl">x{streak}</span>
                  </div>
                )}
              </div>

              <div className="relative h-80 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] opacity-50" />
                
                <AnimatePresence mode="wait">
                  {gameState === 'loading' ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 className="w-16 h-16 animate-spin text-primary/40" />
                    </motion.div>
                  ) : currentPokemon ? (
                    <motion.div
                      key={currentPokemon.id}
                      initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      className="relative w-64 h-64"
                    >
                      <Image 
                        src={currentPokemon.sprites.other['official-artwork'].front_default || currentPokemon.sprites.front_default} 
                        alt="Mystery Pokemon"
                        width={256}
                        height={256}
                        className={cn(
                          "w-full h-full object-contain transition-all duration-700 drop-shadow-2xl",
                          gameState === 'playing' ? "brightness-0 contrast-100 opacity-80" : "brightness-100"
                        )}
                      />
                      
                      {gameState === 'answered' && (
                        <motion.div 
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute -top-4 -right-4 z-20"
                        >
                          {isCorrect ? (
                            <div className="bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-500/50">
                              <CheckCircle2 className="w-8 h-8" />
                            </div>
                          ) : (
                            <div className="bg-red-500 text-white p-3 rounded-full shadow-lg shadow-red-500/50">
                              <AlertCircle className="w-8 h-8" />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option) => (
                  <button
                    key={option}
                    disabled={gameState !== 'playing'}
                    onClick={() => handleAnswer(option)}
                    className={cn(
                      "h-16 rounded-2xl font-black uppercase tracking-widest text-sm transition-all border-2",
                      gameState === 'playing' 
                        ? "bg-secondary/20 border-white/5 hover:border-primary/50 hover:bg-primary/5 active:scale-95" 
                        : selectedOption === option
                          ? isCorrect 
                            ? "bg-green-500/20 border-green-500 text-green-500" 
                            : "bg-red-500/20 border-red-500 text-red-500"
                          : option === currentPokemon?.name && gameState === 'answered'
                            ? "bg-green-500/20 border-green-500/50 text-green-500 opacity-80"
                            : "bg-secondary/10 border-white/5 opacity-40"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
