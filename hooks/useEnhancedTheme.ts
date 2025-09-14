import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
}

export const useEnhancedTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(resolvedTheme);
    
    // Add smooth transition class for theme changes
    root.classList.add('theme-transition');
    
    // Remove transition class after animation completes
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timeout);
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    systemTheme,
  };
};

// Theme transition styles to be added to global CSS
export const themeTransitionStyles = `
  .theme-transition,
  .theme-transition *,
  .theme-transition *:before,
  .theme-transition *:after {
    transition: background-color 300ms ease-in-out, 
                border-color 300ms ease-in-out, 
                color 300ms ease-in-out !important;
  }
`;

// Custom theme configurations
export const themeConfig = {
  light: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
    },
    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
    },
  },
  dark: {
    primary: {
      50: '#1e1b4b',
      100: '#312e81',
      200: '#3730a3',
      300: '#4338ca',
      400: '#4f46e5',
      500: '#6366f1',
      600: '#7c3aed',
      700: '#8b5cf6',
      800: '#a78bfa',
      900: '#c4b5fd',
    },
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
    },
    border: {
      light: '#334155',
      medium: '#475569',
      dark: '#64748b',
    },
  },
};

// Utility function to get theme-aware colors
export const getThemeColor = (
  colorPath: string,
  theme: 'light' | 'dark' = 'light'
): string => {
  const pathArray = colorPath.split('.');
  let color: any = themeConfig[theme];
  
  for (const path of pathArray) {
    color = color?.[path];
  }
  
  return color || '#000000';
};
