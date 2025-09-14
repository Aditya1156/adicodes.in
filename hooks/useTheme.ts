
// Simplified theme hook for fixed dark theme
import { useCallback } from 'react';

type Theme = 'dark';

export const useTheme = (): [Theme, () => void] => {
  const theme: Theme = 'dark';
  
  // No-op function since theme is fixed
  const toggleTheme = useCallback(() => {
    // Theme is fixed to dark, no action needed
  }, []);

  return [theme, toggleTheme];
};