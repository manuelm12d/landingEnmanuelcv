import { createTheme, type PaletteMode } from '@mui/material/styles';

// ============================================================
//  Deep Tech · Vercel / Stripe / Linear
//  Dark:  Zinc #09090B + Surface #121214 + Blue #2563EB
//  Light: White #FFFFFF + Surface #FAFAFA + Blue #2563EB
// ============================================================

export const accent = {
  main: '#2563EB',
  hover: '#3B82F6',
  soft: 'rgba(37,99,235,0.12)',
  glow: 'rgba(37,99,235,0.15)',
  ring: 'rgba(37,99,235,0.4)',
  success: '#22C55E',
};

export const fonts = {
  sans: '"Inter", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", "Menlo", "Consolas", monospace',
};

export interface Tokens {
  isDark: boolean;
  bg: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderStrong: string;
  text: string;
  muted: string;
  subtle: string;
}

export function getTokens(mode: PaletteMode): Tokens {
  const isDark = mode === 'dark';
  return isDark
    ? {
        isDark,
        bg: '#09090B',
        surface: '#121214',
        surfaceHover: '#18181B',
        border: 'rgba(255,255,255,0.08)',
        borderStrong: 'rgba(255,255,255,0.16)',
        text: '#F8FAFC',
        muted: '#A1A1AA',
        subtle: '#71717A',
      }
    : {
        isDark,
        bg: '#FFFFFF',
        surface: '#FAFAFA',
        surfaceHover: '#F4F4F5',
        border: 'rgba(9,9,11,0.08)',
        borderStrong: 'rgba(9,9,11,0.16)',
        text: '#09090B',
        muted: '#52525B',
        subtle: '#A1A1AA',
      };
}

export function getAppTheme(mode: PaletteMode) {
  const t = getTokens(mode);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: accent.main,
        light: accent.hover,
        dark: '#1D4ED8',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: t.text,
        contrastText: t.bg,
      },
      background: {
        default: t.bg,
        paper: t.surface,
      },
      text: {
        primary: t.text,
        secondary: t.muted,
        disabled: t.subtle,
      },
      divider: t.border,
      success: { main: accent.success },
      warning: { main: '#F59E0B' },
      error: { main: '#EF4444' },
    },

    typography: {
      fontFamily: fonts.sans,
      h1: { fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05 },
      h2: { fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1 },
      h3: { fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2 },
      h4: { fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.25 },
      h5: { fontWeight: 600, letterSpacing: '-0.02em' },
      h6: { fontWeight: 600, letterSpacing: '-0.015em' },
      body1: { lineHeight: 1.7 },
      body2: { lineHeight: 1.6 },
      overline: { fontFamily: fonts.mono, letterSpacing: '0.08em', fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 500, letterSpacing: '-0.01em' },
    },

    shape: { borderRadius: 8 },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--bg': t.bg,
            '--surface': t.surface,
            '--border': t.border,
            '--border-strong': t.borderStrong,
            '--text': t.text,
            '--muted': t.muted,
            '--accent': accent.main,
            '--accent-hover': accent.hover,
          },
          html: { scrollBehavior: 'smooth' },
          body: {
            backgroundColor: t.bg,
            overflowX: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: '"cv11", "ss01", "ss03"',
          },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '9px 18px',
            fontSize: '0.9rem',
            transition: 'background-color .2s ease, box-shadow .2s ease, border-color .2s ease, color .2s ease',
          },
          sizeLarge: { padding: '11px 22px', fontSize: '0.95rem' },
          sizeSmall: { padding: '6px 12px', fontSize: '0.82rem' },
          contained: {
            backgroundColor: accent.main,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: accent.hover,
              boxShadow: `0 0 20px ${accent.ring}`,
            },
          },
          outlined: {
            borderColor: t.borderStrong,
            color: t.text,
            backgroundColor: 'transparent',
            '&:hover': {
              borderColor: t.isDark ? 'rgba(255,255,255,0.32)' : 'rgba(9,9,11,0.32)',
              backgroundColor: t.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(9,9,11,0.03)',
            },
          },
          text: {
            color: t.muted,
            '&:hover': { color: t.text, backgroundColor: 'transparent' },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
            fontSize: '0.75rem',
            fontFamily: fonts.mono,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: t.surface,
            border: `1px solid ${t.border}`,
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: 'none', backgroundColor: 'transparent', border: 'none' },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: t.bg,
            border: 'none',
            borderLeft: `1px solid ${t.border}`,
          },
        },
      },

      MuiDivider: {
        styleOverrides: { root: { borderColor: t.border } },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'color .2s ease, background-color .2s ease',
            '&:hover': { backgroundColor: t.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(9,9,11,0.05)' },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: t.isDark ? '#18181B' : '#09090B',
            color: '#F8FAFC',
            border: `1px solid ${t.isDark ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
            borderRadius: 6,
            fontSize: '0.75rem',
            fontWeight: 500,
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: { borderColor: t.border },
          head: { color: t.muted, fontFamily: fonts.mono, fontSize: '0.72rem', textTransform: 'uppercase' },
        },
      },
    },
  });
}

// ── Helpers de estilo reutilizables ──────────────────────────

export const surfaceCard = (t: Tokens) => ({
  position: 'relative' as const,
  backgroundColor: t.surface,
  border: `1px solid ${t.border}`,
  borderRadius: '12px',
  transition: 'border-color .25s ease, box-shadow .25s ease, background-color .25s ease',
});

export const glowCard = (t: Tokens) => ({
  ...surfaceCard(t),
  '&:hover': {
    borderColor: accent.ring,
    boxShadow: `0 0 0 1px ${accent.soft}, 0 8px 32px ${accent.glow}`,
  },
});

export const radialTint = (position = '0% 0%', strength = 0.08) =>
  `radial-gradient(circle at ${position}, rgba(37,99,235,${strength}) 0%, transparent 60%)`;

export const monoLabel = (t: Tokens) => ({
  fontFamily: fonts.mono,
  fontSize: '0.75rem',
  color: t.subtle,
  letterSpacing: '0.02em',
});
