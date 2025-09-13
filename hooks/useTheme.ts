
import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // The initial theme is set by an inline script in index.html to prevent FOUC.
    // This effect just syncs the React state with the DOM state on initial mount.
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      
      const lightPrismLink = document.getElementById('prism-light-theme') as HTMLLinkElement | null;
      const darkPrismLink = document.getElementById('prism-dark-theme') as HTMLLinkElement | null;

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        if(lightPrismLink) lightPrismLink.disabled = true;
        if(darkPrismLink) darkPrismLink.disabled = false;
      } else {
        document.documentElement.classList.remove('dark');
        if(lightPrismLink) lightPrismLink.disabled = false;
        if(darkPrismLink) darkPrismLink.disabled = true;
      }
      return newTheme;
    });
  }, []);

  return [theme, toggleTheme];
};