'use client';

import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function AppContent({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();
  return <>{children}</>;
}
