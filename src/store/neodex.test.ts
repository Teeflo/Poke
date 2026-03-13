import { describe, it, expect, beforeEach } from 'vitest';
import { useNeoDexStore } from '../store/pokedex';

describe('useNeoDexStore', () => {
  beforeEach(() => {
    useNeoDexStore.getState().resetFilters();
    useNeoDexStore.getState().clearTeam();
    useNeoDexStore.getState().clearCompare();
  });

  it('should add and remove favorites', () => {
    const { addFavorite, removeFavorite, isFavorite } = useNeoDexStore.getState();
    
    addFavorite(1);
    expect(isFavorite(1)).toBe(true);
    
    removeFavorite(1);
    expect(isFavorite(1)).toBe(false);
  });

  it('should add to team up to 6 members', () => {
    const { addToTeam } = useNeoDexStore.getState();
    
    for (let i = 1; i <= 7; i++) {
      addToTeam(i);
    }
    
    expect(useNeoDexStore.getState().team.length).toBe(6);
  });

  it('should update quiz high scores', () => {
    const { updateQuizHighScore } = useNeoDexStore.getState();
    
    updateQuizHighScore('survival', 50);
    expect(useNeoDexStore.getState().quizHighScores.survival).toBe(50);
    
    updateQuizHighScore('survival', 30); // Should keep the highest
    expect(useNeoDexStore.getState().quizHighScores.survival).toBe(50);
  });

  it('should add badges and check for them', () => {
    const { addBadge, hasBadge } = useNeoDexStore.getState();
    
    addBadge('quiz-master');
    expect(hasBadge('quiz-master')).toBe(true);
    expect(hasBadge('non-existent')).toBe(false);
  });
});
