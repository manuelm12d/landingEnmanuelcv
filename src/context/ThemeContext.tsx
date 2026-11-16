import React, { createContext, useContext, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getAppTheme, getTokens, type Tokens } from '../theme/theme';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme-mode';

interface ThemeModeContextValue {
  mode: ThemeMode;
  tokens: Tokens;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'dark',
  tokens: getTokens('dark'),
  toggleTheme: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  };

  const theme = useMemo(() => getAppTheme(mode), [mode]);
  const tokens = useMemo(() => getTokens(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, tokens, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
