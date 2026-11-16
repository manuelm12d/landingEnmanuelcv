import { Box, Button, Container, Grid2 as Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { profile } from '../data/profile';
import { accent, fonts, glowCard } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';
import { useTypewriter } from '../hooks/useTypewriter';
import ProfileAvatar from './ProfileAvatar';
import Reveal from './Reveal';

const ROLES = [
  'Tech Lead',
  'Arquitecto de Soluciones',
  'Ingeniero Full-Stack',
  'Especialista Cloud & DevOps',
];

export default function Hero() {
  const { tokens: t } = useThemeMode();
  const role = useTypewriter(ROLES);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="inicio"
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 16, md: 22 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
        bgcolor: t.bg,
      }}
    >
      {/* Grid de fondo con máscara */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />
      {/* Glow azul tipo "sol" */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: { xs: -260, md: -360 },
          left: '50%',
          width: { xs: 600, md: 1100 },
          height: { xs: 500, md: 720 },
          borderRadius: '50%',
          background: `radial-gradient(closest-side, rgba(37,99,235,${t.isDark ? 0.45 : 0.25}), ${accent.glow} 45%, transparent 100%)`,
          filter: 'blur(40px)',
          animation: 'glowPulse 8s ease-in-out infinite',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.25,
                  mb: 4,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 999,
                  border: `1px solid ${t.border}`,
                  bgcolor: t.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(9,9,11,0.02)',
                  fontSize: '0.8rem',
                  color: t.muted,
                }}
              >
                <span className="status-dot" />
                Disponible para nuevos proyectos
              </Box>
            </Reveal>

            <Reveal delay={80}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: 'clamp(2.5rem, 1.6rem + 4vw, 4.5rem)',
                  color: t.text,
                  mb: 2.5,
                }}
              >
                Enmanuel Reyes
                <Box component="span" sx={{ display: 'block', color: t.subtle }}>
                  Molina.
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={160}>
              <Typography
                component="p"
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: t.text,
                  mb: 3,
                  minHeight: '1.6em',
                }}
                aria-label={ROLES.join(', ')}
              >
                <Box component="span" sx={{ color: accent.main }}>
                  &gt;
                </Box>{' '}
                {role}
                <span className="typewriter-caret" aria-hidden />
              </Typography>
            </Reveal>

            <Reveal delay={240}>
              <Typography variant="body1" sx={{ color: t.muted, maxWidth: 560, mb: 5, fontSize: '1.08rem' }}>
                {profile.title}. Diseño arquitecturas escalables, lidero migraciones legacy y despliego en AWS, Google
                Cloud y Azure — con experiencia en sectores financiero, logístico, gubernamental y empresarial.
              </Typography>
            </Reveal>

            <Reveal delay={320}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                  onClick={() => scrollTo('#contacto')}
                >
                  Hablemos
                </Button>
                <Button variant="outlined" size="large" onClick={() => scrollTo('#experiencia')}>
                  Ver experiencia
                </Button>
              </Stack>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delay={200}>
              <ProfileAvatar />
            </Reveal>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {profile.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <Box
                sx={{
                  ...glowCard(t),
                  p: { xs: 2.5, md: 3 },
                  height: '100%',
                  bgcolor: t.isDark ? 'rgba(18,18,20,0.6)' : 'rgba(250,250,250,0.8)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: t.text,
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ mt: 0.75, fontSize: '0.85rem', color: t.muted }}>{stat.label}</Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
