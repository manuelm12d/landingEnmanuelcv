import { createTheme, type PaletteMode } from '@mui/material/styles';

// ============================================================
//  Mario Bros Theme — landingenma
//  Dos modos: 'light' (World 1-1 / Día) · 'dark' (Castillo / Noche)
// ============================================================

export function getMarioTheme(mode: PaletteMode) {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary: {
        main:  '#E52521',   // Rojo Mario
        light: '#FF6B6B',
        dark:  '#8B0000',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main:  '#FBD000',   // Moneda/Estrella dorada
        light: '#FFE566',
        dark:  '#C8821A',   // Tierra
        contrastText: '#1A0A00',
      },
      background: {
        default: isLight ? '#5C94FC' : '#0D0D1A',   // Cielo / Noche castillo
        paper:   isLight ? '#E8D5A3' : '#1A1A2E',   // Tierra / Piedra castillo
      },
      text: {
        primary:   isLight ? '#1A0A00' : '#F5F5F5',
        secondary: isLight ? '#5C3317' : '#A0A0C0',
      },
      divider: isLight ? '#C8821A' : '#3A2A5A',
      success: { main: '#4CAF22' },   // Verde tubería Luigi
      warning: { main: '#FF6600' },   // Bola de fuego
      error:   { main: '#E52521' },
    },

    typography: {
      fontFamily: '"Press Start 2P", "Roboto", "Arial", sans-serif',
      h1: { fontFamily: '"Press Start 2P", monospace', fontWeight: 400, fontSize: '2rem',   letterSpacing: '0.02em', lineHeight: 1.6 },
      h2: { fontFamily: '"Press Start 2P", monospace', fontWeight: 400, fontSize: '1.5rem', letterSpacing: '0.02em', lineHeight: 1.6 },
      h3: { fontFamily: '"Press Start 2P", monospace', fontWeight: 400, fontSize: '1.2rem', letterSpacing: '0.02em', lineHeight: 1.6 },
      h4: { fontFamily: '"Press Start 2P", monospace', fontWeight: 400, fontSize: '1rem',   letterSpacing: '0.02em', lineHeight: 1.6 },
      h5: { fontFamily: '"Press Start 2P", monospace', fontWeight: 400, fontSize: '0.85rem', lineHeight: 1.7 },
      h6: { fontFamily: '"Press Start 2P", monospace', fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.7 },
      body1: { fontFamily: '"Roboto", "Arial", sans-serif', fontSize: '1rem',   lineHeight: 1.8 },
      body2: { fontFamily: '"Roboto", "Arial", sans-serif', fontSize: '0.875rem', lineHeight: 1.7 },
      caption: { fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', letterSpacing: '0.05em' },
      overline: { fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', letterSpacing: '0.1em', lineHeight: 2 },
      button: { fontFamily: '"Press Start 2P", monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    },

    shape: { borderRadius: 0 },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: isLight
              ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%235C94FC'/%3E%3Crect x='0' y='48' width='64' height='16' fill='%234CAF22'/%3E%3C/svg%3E")`
              : 'none',
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: '3px solid transparent',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 0 rgba(0,0,0,0.4)' },
            '&:active': { transform: 'translateY(1px)',  boxShadow: '0 2px 0 rgba(0,0,0,0.4)' },
          },
          contained: {
            backgroundColor: '#E52521',
            color: '#FFFFFF',
            border: '3px solid #8B0000',
            boxShadow: '0 4px 0 #8B0000',
            '&:hover': { backgroundColor: '#FF4441', boxShadow: '0 6px 0 #8B0000' },
          },
          outlined: {
            borderColor: '#FBD000',
            color: isLight ? '#1A0A00' : '#FBD000',
            borderWidth: '3px',
            '&:hover': { borderWidth: '3px', backgroundColor: 'rgba(251,208,0,0.12)' },
          },
          text: {
            color: isLight ? '#1A0A00' : '#F5F5F5',
            '&:hover': { backgroundColor: 'rgba(251,208,0,0.15)', color: '#FBD000' },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.5rem',
            border: '2px solid',
          },
          colorPrimary: {
            backgroundColor: '#E52521',
            borderColor: '#8B0000',
            color: '#FFFFFF',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `3px solid ${isLight ? '#C8821A' : '#3A2A5A'}`,
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isLight ? '#8B0000' : '#1A0A1A',
            borderLeft: '4px solid #FBD000',
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isLight ? '#C8821A' : '#3A2A5A',
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            transition: 'transform 0.15s ease',
            '&:hover': { transform: 'scale(1.15)', backgroundColor: 'rgba(251,208,0,0.2)' },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.5rem',
            backgroundColor: '#1A0A00',
            border: '2px solid #FBD000',
            borderRadius: 0,
          },
        },
      },
    },
  });
}

// ── Helpers de estilo reutilizables ──────────────────────────

export const marioGradientText = {
  background: 'linear-gradient(135deg, #E52521 0%, #FBD000 60%, #FF6600 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const marioCard = (isLight: boolean) => ({
  background: isLight ? 'rgba(232, 213, 163, 0.92)' : 'rgba(26, 26, 46, 0.92)',
  border: `3px solid ${isLight ? '#C8821A' : '#3A2A5A'}`,
  boxShadow: `4px 4px 0 ${isLight ? '#8B4513' : '#000000'}`,
  borderRadius: 0,
});

export const marioBrick = (isLight: boolean) => ({
  background: isLight
    ? 'repeating-linear-gradient(90deg, #C8821A 0px, #C8821A 30px, #A0621A 30px, #A0621A 32px), repeating-linear-gradient(180deg, transparent 0px, transparent 14px, #A0621A 14px, #A0621A 16px)'
    : 'repeating-linear-gradient(90deg, #2A1A3E 0px, #2A1A3E 30px, #1A0A2E 30px, #1A0A2E 32px), repeating-linear-gradient(180deg, transparent 0px, transparent 14px, #1A0A2E 14px, #1A0A2E 16px)',
  border: `3px solid ${isLight ? '#8B4513' : '#3A2A5A'}`,
  boxShadow: `4px 4px 0 ${isLight ? '#5C2E0A' : '#000'}`,
});

export const questionBlock = {
  background: 'linear-gradient(135deg, #FFE566 0%, #FBD000 50%, #C8821A 100%)',
  border: '4px solid #8B4513',
  boxShadow: '4px 4px 0 #5C2E0A, inset 0 2px 0 rgba(255,255,255,0.3)',
  borderRadius: 0,
};

// Mantener compatibilidad con importaciones antiguas
export const glassCard = {
  background: 'rgba(26, 26, 46, 0.92)',
  border: '3px solid #3A2A5A',
  boxShadow: '4px 4px 0 #000000',
};

export const gradientText = marioGradientText;

// Tema estático de respaldo (dark)
export const theme = getMarioTheme('dark');
