import { Box, Container, Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';
import { profile } from '../data/profile';
import { marioCard } from '../theme/theme';
import SectionTitle from './SectionTitle';
import { useMarioTheme } from '../context/ThemeContext';

const highlights = [
  {
    emoji: '🏰',
    title: 'Arquitectura Limpia',
    description: 'SOLID, DDD, Feature First y separación de responsabilidades en cada proyecto.',
  },
  {
    emoji: '☁️',
    title: 'Cloud Multiplataforma',
    description: 'AWS, Google Cloud y Azure con despliegues seguros, escalables y automatizados.',
  },
  {
    emoji: '⭐',
    title: 'Alto Rendimiento',
    description: 'APIs optimizadas, microservicios, CI/CD y soluciones centradas en eficiencia.',
  },
];

export default function About() {
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  return (
    <Box
      id="perfil"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isLight ? 'rgba(92,148,252,0.15)' : 'rgba(13,13,26,0.6)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Perfil profesional"
          title="Ingeniero de software con visión de arquitecto"
          subtitle="Formación de posgrado, liderazgo técnico y trayectoria en entornos exigentes."
        />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                ...marioCard(isLight),
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.9, fontSize: '1.05rem', fontFamily: '"Roboto", sans-serif' }}
              >
                {profile.summary}
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
                {profile.languages.map((lang) => (
                  <Box
                    key={lang.name}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: '#FBD000',
                      border: '2px solid #8B4513',
                      boxShadow: '2px 2px 0 #5C2E0A',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: '#1A0A00', display: 'block', fontFamily: '"Press Start 2P", monospace', fontSize: '0.5rem' }}
                    >
                      {lang.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#5C3317', display: 'block', fontFamily: '"Roboto", sans-serif', fontSize: '0.75rem' }}
                    >
                      {lang.level}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={2}>
              {highlights.map((item) => (
                <Paper
                  key={item.title}
                  elevation={0}
                  sx={{
                    ...marioCard(isLight),
                    p: 3,
                    transition: 'transform 0.15s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Typography
                      sx={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}
                      aria-hidden
                    >
                      {item.emoji}
                    </Typography>
                    <Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          color: isLight ? '#1A0A00' : '#F5F5F5',
                          textShadow: isLight ? '1px 1px 0 #C8821A' : '1px 1px 0 #E52521',
                          fontSize: '0.65rem',
                          mb: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: '"Roboto", sans-serif' }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
