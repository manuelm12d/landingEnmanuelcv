import { Box, Typography } from '@mui/material';
import { useThemeMode } from '../context/ThemeContext';
import { accent, fonts } from '../theme/theme';
import Reveal from './Reveal';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) {
  const { tokens: t } = useThemeMode();
  const centered = align === 'center';

  return (
    <Reveal sx={{ mb: { xs: 5, md: 7 }, textAlign: align }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
          fontFamily: fonts.mono,
          fontSize: '0.78rem',
          color: accent.main,
          letterSpacing: '0.02em',
        }}
      >
        <Box component="span" sx={{ color: t.subtle }}>
          //
        </Box>
        {eyebrow.toLowerCase()}
      </Box>

      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontSize: 'clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)',
          color: t.text,
          maxWidth: centered ? 780 : 720,
          mx: centered ? 'auto' : 0,
          mb: subtitle ? 2 : 0,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: t.muted,
            fontSize: '1.05rem',
            maxWidth: centered ? 640 : 600,
            mx: centered ? 'auto' : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Reveal>
  );
}
