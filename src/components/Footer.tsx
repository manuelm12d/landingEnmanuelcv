import { Box, Container, Typography } from '@mui/material';
import { profile } from '../data/profile';
import { useMarioTheme } from '../context/ThemeContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isLight ? '#C8821A' : '#0D0D1A',
        borderTop: '4px solid #FBD000',
        pt: 0,
        overflow: 'hidden',
      }}
    >
      {/* Bloque de tierra decorativo */}
      <Box
        aria-hidden
        sx={{
          height: 12,
          background: isLight
            ? 'repeating-linear-gradient(90deg, #C8821A 0px, #C8821A 30px, #A0621A 30px, #A0621A 32px)'
            : 'repeating-linear-gradient(90deg, #2A1A3E 0px, #2A1A3E 30px, #1A0A2E 30px, #1A0A2E 32px)',
          borderBottom: '3px solid #8B4513',
        }}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Separador bloques */}
        <Box
          aria-hidden
          sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 3 }}
        >
          {['#E52521', '#FBD000', '#4CAF22', '#FBD000', '#E52521', '#FBD000', '#4CAF22'].map((color, i) => (
            <Box
              key={i}
              sx={{
                width: 14,
                height: 14,
                bgcolor: color,
                border: '2px solid rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: isLight ? '#1A0A00' : '#A0A0C0',
            mb: 1,
            fontSize: '0.5rem',
          }}
        >
          © {year} {profile.name}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: isLight ? '#5C3317' : '#6060A0',
            mb: 2,
            fontSize: '0.45rem',
          }}
        >
          Tech Lead · Arquitecto de Soluciones · Desarrollador Full-Stack
        </Typography>

        {/* INSERT COIN */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#FBD000',
            fontSize: '0.5rem',
            textShadow: '1px 1px 0 #8B4513',
          }}
          className="blink-text"
        >
          ► INSERT COIN TO CONTINUE ◄
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 1.5,
            color: isLight ? '#5C3317' : '#3A3A5A',
            fontSize: '0.4rem',
          }}
        >
          Desarrollado con React · TypeScript · Material UI · 🍄
        </Typography>
      </Container>
    </Box>
  );
}
