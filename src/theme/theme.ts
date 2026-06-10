import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#38bdf8',
      light: '#7dd3fc',
      dark: '#0284c7',
    },
    secondary: {
      main: '#818cf8',
    },
    background: {
      default: '#0b1120',
      paper: '#111827',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export const gradientText = {
  background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const glassCard = {
  background: 'rgba(17, 24, 39, 0.72)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(148, 163, 184, 0.12)',
  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
};
