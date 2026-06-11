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
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { profile } from '../data/profile';
import { gradientText } from '../theme/theme';
import ProfileAvatar from './ProfileAvatar';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="inicio"
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 14, md: 18 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.18), transparent 40%), radial-gradient(circle at 80% 10%, rgba(129, 140, 248, 0.16), transparent 35%), radial-gradient(circle at 50% 80%, rgba(192, 132, 252, 0.1), transparent 45%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Chip
              icon={<WorkHistoryIcon />}
              label="8+ años construyendo software de alto impacto"
              color="primary"
              variant="outlined"
              sx={{ mb: 3, borderColor: 'primary.main' }}
            />

            <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' }, mb: 1 }}>
              {profile.name}
            </Typography>

            <Typography variant="h4" sx={{ ...gradientText, fontSize: { xs: '1.25rem', md: '1.75rem' }, mb: 2 }}>
              {profile.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" fontWeight={500} sx={{ mb: 3 }}>
              {profile.subtitle}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mb: 4, lineHeight: 1.8 }}>
              Especialista en arquitecturas escalables, migraciones legacy, cloud multiplataforma y equipos
              orientados a resultados. De APIs gubernamentales a apps móviles en Play Store — experiencia
              comprobada en sectores financiero, logístico y empresarial.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" size="large" startIcon={<EmailIcon />} onClick={() => scrollTo('#contacto')}>
                Contactar
              </Button>
              <Button variant="text" size="large" onClick={() => scrollTo('#experiencia')}>
                Mi experiencia
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack alignItems="center" spacing={4} sx={{ pt: { xs: 2, md: 0 } }}>
              <ProfileAvatar />

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
                    p: 3,
                    borderRadius: 3,
                    textAlign: 'center',
                    background: 'rgba(17, 24, 39, 0.72)',
                    border: '1px solid rgba(148, 163, 184, 0.12)',
                    transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
                    '@media (hover: hover)': {
                      '&:hover': {
                        transform: 'translateY(-10px) scale(1.02)',
                        borderColor: 'rgba(56, 189, 248, 0.5)',
                        background:
                          'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.12) 0%, transparent 55%), radial-gradient(circle at 50% 100%, rgba(129, 140, 248, 0.1) 0%, transparent 50%), rgba(17, 24, 39, 0.95)',
                        boxShadow:
                          '0 20px 40px rgba(56, 189, 248, 0.22), 0 8px 24px rgba(129, 140, 248, 0.18), 0 0 0 1px rgba(192, 132, 252, 0.25)',
                      },
                      '&:hover .stat-value': {
                        background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      },
                    },
                  }}
                >
                  <Typography className="stat-value" variant="h3" color="primary.main" fontWeight={800} sx={{ transition: 'color 0.35s ease' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
