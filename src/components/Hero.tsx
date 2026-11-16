import {
  Box,
  Button,
  Chip,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { profile } from '../data/profile';
import { marioGradientText, questionBlock } from '../theme/theme';
import ProfileAvatar from './ProfileAvatar';
import { useMarioTheme } from '../context/ThemeContext';

// Sprites flotantes decorativos
const FloatingSprite = ({ emoji, style }: { emoji: string; style: React.CSSProperties }) => (
  <Box
    component="span"
    aria-hidden
    sx={{
      position: 'absolute',
      fontSize: { xs: '1.2rem', md: '1.5rem' },
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 0,
      lineHeight: 1,
      ...style,
    }}
    className="mario-float"
  >
    {emoji}
  </Box>
);

export default function Hero() {
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skyBg = isLight
    ? 'linear-gradient(180deg, #5C94FC 0%, #7CB4FF 60%, #98CBF8 100%)'
    : 'linear-gradient(180deg, #0D0D1A 0%, #1A1A2E 70%, #0D0D1A 100%)';

  return (
    <Box
      id="inicio"
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 14, md: 18 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
        background: skyBg,
      }}
    >
      {/* Nubes decorativas (modo claro) / Estrellas (modo oscuro) */}
      {isLight ? (
        <>
          <FloatingSprite emoji="☁️" style={{ top: '15%', left: '5%', fontSize: '2rem' }} />
          <FloatingSprite emoji="☁️" style={{ top: '10%', left: '25%', fontSize: '1.5rem' }} />
          <FloatingSprite emoji="☁️" style={{ top: '20%', right: '15%', fontSize: '2.5rem' }} />
          <FloatingSprite emoji="☁️" style={{ top: '8%',  right: '35%', fontSize: '1.2rem' }} />
        </>
      ) : (
        <>
          <FloatingSprite emoji="⭐" style={{ top: '12%', left: '8%',  animationDelay: '0s' }} />
          <FloatingSprite emoji="⭐" style={{ top: '20%', left: '30%', animationDelay: '0.5s' }} />
          <FloatingSprite emoji="⭐" style={{ top: '8%',  right: '20%', animationDelay: '1s' }} />
          <FloatingSprite emoji="🌙" style={{ top: '5%',  right: '5%',  fontSize: '2rem', animationDelay: '0.3s' }} />
        </>
      )}

      {/* Sprites de items flotantes */}
      <FloatingSprite emoji="🍄" style={{ top: '55%', left: '2%',   animationDelay: '0.8s', fontSize: '1rem' }} />
      <FloatingSprite emoji="🪙" style={{ top: '30%', right: '3%',  animationDelay: '1.2s', fontSize: '1rem' }} />
      <FloatingSprite emoji="🌟" style={{ bottom: '20%', left: '6%', animationDelay: '0.4s', fontSize: '1rem' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Badge estilo moneda */}
            <Chip
              label="⭐  8+ años construyendo software de alto impacto"
              sx={{
                mb: 3,
                bgcolor: '#FBD000',
                color: '#1A0A00',
                border: '2px solid #8B4513',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '0.45rem',
                height: 'auto',
                py: 0.8,
                '& .MuiChip-label': { whiteSpace: 'normal' },
              }}
            />

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '1rem', md: '1.5rem' },
                mb: 1.5,
                color: isLight ? '#1A0A00' : '#F5F5F5',
                textShadow: isLight ? '2px 2px 0 #C8821A' : '2px 2px 0 #E52521',
              }}
            >
              {profile.name}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                ...marioGradientText,
                fontSize: { xs: '0.7rem', md: '0.9rem' },
                mb: 2,
              }}
            >
              {profile.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '0.6rem', md: '0.7rem' },
                mb: 2,
                color: isLight ? '#5C3317' : '#A0A0C0',
              }}
            >
              {profile.subtitle}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 620, mb: 4, lineHeight: 1.8, fontFamily: '"Roboto", sans-serif' }}
            >
              Especialista en arquitecturas escalables, migraciones legacy, cloud multiplataforma y equipos
              orientados a resultados. De APIs gubernamentales a apps móviles en Play Store — experiencia
              comprobada en sectores financiero, logístico y empresarial.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<EmailIcon />}
                onClick={() => scrollTo('#contacto')}
              >
                ► Contactar
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollTo('#experiencia')}
              >
                Mi experiencia
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack alignItems="center" spacing={4} sx={{ pt: { xs: 2, md: 0 } }}>
              <ProfileAvatar />

              {/* Stat cards — Bloques ? de Mario */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2,
                  width: '100%',
                }}
              >
                {profile.stats.map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{
                      ...questionBlock,
                      p: 2.5,
                      textAlign: 'center',
                      cursor: 'default',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      '@media (hover: hover)': {
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '4px 12px 0 #5C2E0A, inset 0 2px 0 rgba(255,255,255,0.4)',
                          animation: 'shake 0.4s ease',
                        },
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: '#E52521',
                        textShadow: '2px 2px 0 #8B0000',
                        fontSize: { xs: '1rem', md: '1.3rem' },
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#5C2E0A',
                        display: 'block',
                        fontFamily: '"Press Start 2P", monospace',
                        fontSize: '0.4rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Suelo/Plataforma decorativa */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 12,
          background: isLight
            ? 'repeating-linear-gradient(90deg, #C8821A 0px, #C8821A 30px, #A0621A 30px, #A0621A 32px)'
            : 'repeating-linear-gradient(90deg, #2A1A3E 0px, #2A1A3E 30px, #1A0A2E 30px, #1A0A2E 32px)',
          borderTop: '3px solid #FBD000',
        }}
      />
    </Box>
  );
}
