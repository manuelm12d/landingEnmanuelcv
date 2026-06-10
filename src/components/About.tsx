import { Box, Container, Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import SpeedIcon from '@mui/icons-material/Speed';
import { profile } from '../data/profile';
import { glassCard } from '../theme/theme';
import SectionTitle from './SectionTitle';

const highlights = [
  {
    icon: <ArchitectureIcon color="primary" fontSize="large" />,
    title: 'Arquitectura Limpia',
    description: 'SOLID, DDD, Feature First y separación de responsabilidades en cada proyecto.',
  },
  {
    icon: <CloudQueueIcon color="primary" fontSize="large" />,
    title: 'Cloud Multiplataforma',
    description: 'AWS, Google Cloud y Azure con despliegues seguros, escalables y automatizados.',
  },
  {
    icon: <SpeedIcon color="primary" fontSize="large" />,
    title: 'Alto Rendimiento',
    description: 'APIs optimizadas, microservicios, CI/CD y soluciones centradas en eficiencia.',
  },
];

export default function About() {
  return (
    <Box id="perfil" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Perfil profesional"
          title="Ingeniero de software con visión de arquitecto"
          subtitle="Formación de posgrado, liderazgo técnico y trayectoria en entornos exigentes."
        />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper elevation={0} sx={{ ...glassCard, p: { xs: 3, md: 4 }, borderRadius: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
                {profile.summary}
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
                {profile.languages.map((lang) => (
                  <Box
                    key={lang.name}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {lang.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
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
                <Paper key={item.title} elevation={0} sx={{ ...glassCard, p: 3, borderRadius: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    {item.icon}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
