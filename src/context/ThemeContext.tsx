import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getMarioTheme } from '../theme/theme';

type ThemeMode = 'light' | 'dark';

interface MarioThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const MarioThemeContext = createContext<MarioThemeContextValue>({
  mode: 'dark',
  toggleTheme: () => {},
});

export function useMarioTheme() {
  return useContext(MarioThemeContext);
}

export function MarioThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('mario-theme-mode');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('mario-theme-mode', next);
      } catch {}
      return next;
    });
  };

  const theme = useMemo(() => getMarioTheme(mode), [mode]);

  return (
    <MarioThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MarioThemeContext.Provider>
  );
}
