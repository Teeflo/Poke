'use client';

import React, { useState } from 'react';
import { usePokedexStore } from '@/store/pokedex';
import { 
  Dialog, 
  DialogContent, 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  BarChart3, 
  Users, 
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  LucideProps
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Onboarding() {
  const { hasCompletedOnboarding, setHasCompletedOnboarding } = usePokedexStore();
  const [step, setStep] = useState(0);
  const { t } = useTranslation();

  if (hasCompletedOnboarding) return null;

  const steps = [
    {
      title: "Bienvenue sur le Pokédex !",
      desc: "Explorez le monde des Pokémon avec des outils avancés.",
      icon: <Search className="w-12 h-12 text-primary" />,
    },
    {
      title: "Filtres Avancés",
      desc: "Utilisez les filtres pour trouver exactement ce que vous cherchez par type, génération, et plus encore.",
      icon: <LayoutGridIcon className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Team Builder",
      desc: "Créez votre équipe idéale et analysez ses forces et faiblesses.",
      icon: <Users className="w-12 h-12 text-green-500" />,
    },
    {
      title: "Comparaison",
      desc: "Comparez jusqu'à 3 Pokémon pour voir leurs différences de stats.",
      icon: <BarChart3 className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Mini-Jeux",
      desc: "Testez vos connaissances avec nos différents modes de Quiz.",
      icon: <Gamepad2 className="w-12 h-12 text-purple-500" />,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setHasCompletedOnboarding(true);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={!hasCompletedOnboarding} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-background/80 backdrop-blur-xl border-white/10 rounded-[2.5rem]">
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="p-6 bg-secondary/30 rounded-3xl border border-white/5 shadow-inner">
                {steps[step].icon}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">{steps[step].title}</h3>
                <p className="text-foreground/60 font-medium leading-relaxed">
                  {steps[step].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-1.5 mt-10">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300", 
                  i === step ? "w-8 bg-primary" : "w-1.5 bg-foreground/10"
                )} 
              />
            ))}
          </div>
        </div>

        <div className="p-6 bg-secondary/20 border-t border-white/5 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={handlePrev} 
            disabled={step === 0}
            className="rounded-xl font-black uppercase tracking-widest text-[10px]"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t('common.prev')}
          </Button>
          
          <Button 
            onClick={handleNext}
            className="rounded-xl font-black uppercase tracking-widest text-[10px] px-6 h-10 shadow-lg shadow-primary/20"
          >
            {step === steps.length - 1 ? t('common.finish') : t('common.next')}
            {step !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LayoutGridIcon(props: LucideProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}
