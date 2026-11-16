import { Box, Typography } from '@mui/material';
import { useMarioTheme } from '../context/ThemeContext';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) {
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: align }}>
      {/* Eyebrow estilo WORLD X-X */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: '#E52521',
            color: '#FFFFFF',
            px: 1.5,
            py: 0.5,
            border: '2px solid #8B0000',
            boxShadow: '3px 3px 0 #5C0000',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '0.5rem',
              lineHeight: 1.5,
            }}
          >
            ► {eyebrow.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      {/* Título principal con sombra pixel */}
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontSize: { xs: '0.9rem', md: '1.15rem' },
          mb: subtitle ? 1.5 : 0,
          color: isLight ? '#1A0A00' : '#F5F5F5',
          textShadow: isLight ? '3px 3px 0 #C8821A' : '3px 3px 0 #E52521',
          lineHeight: 1.8,
        }}
      >
        {title}
      </Typography>

      {/* Separador decorativo de bloques */}
      <Box
        aria-hidden
        sx={{
          display: 'flex',
          gap: 0.5,
          mt: 1.5,
          mb: subtitle ? 2 : 0,
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        {['#E52521', '#FBD000', '#4CAF22', '#FBD000', '#E52521'].map((color, i) => (
          <Box
            key={i}
            sx={{
              width: 12,
              height: 12,
              bgcolor: color,
              border: '2px solid rgba(0,0,0,0.3)',
            }}
          />
        ))}
      </Box>

      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: align === 'center' ? 720 : 640,
            mx: align === 'center' ? 'auto' : 0,
            fontFamily: '"Roboto", sans-serif',
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
