import {
  Avatar,
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
            <Stack alignItems="center" spacing={3}>
              <Avatar
                sx={{
                  width: { xs: 140, md: 180 },
                  height: { xs: 140, md: 180 },
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
                  border: '4px solid rgba(56, 189, 248, 0.35)',
                  boxShadow: '0 20px 40px rgba(56, 189, 248, 0.2)',
                }}
              >
                ER
              </Avatar>

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
                  }}
                >
                  <Typography variant="h3" color="primary.main" fontWeight={800}>
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
