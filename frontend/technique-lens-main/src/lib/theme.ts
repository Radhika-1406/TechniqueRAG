// Theme management utilities for dark/black mode toggle
// Saves preference to localStorage

export type Theme = 'dark' | 'black';

const THEME_KEY = 'techniquerag-theme';

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  
  const stored = localStorage.getItem(THEME_KEY);
  return (stored === 'black' ? 'black' : 'dark') as Theme;
};

export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.remove('dark', 'black');
  document.documentElement.classList.add(theme);
};

export const initTheme = (): void => {
  const theme = getTheme();
  setTheme(theme);
};
