import { Box, Container, Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';
import { education } from '../data/profile';
import { marioCard } from '../theme/theme';
import SectionTitle from './SectionTitle';
import MomentsCarousel from './MomentsCarousel';
import { useMarioTheme } from '../context/ThemeContext';

export default function Education() {
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  return (
    <Box
      id="educacion"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isLight ? 'rgba(76,175,34,0.1)' : 'rgba(26,26,46,0.5)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Formación académica"
          title="Educación"
          subtitle="Formación universitaria y posgrado en ingeniería de software."
        />

        <Grid container spacing={3} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              {education.map((item, index) => (
                <Paper
                  key={item.degree}
                  elevation={0}
                  sx={{
                    ...marioCard(isLight),
                    p: 4,
                    flex: 1,
                    borderLeft: '6px solid #FBD000',
                    transition: 'transform 0.15s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  {/* Icono castillo */}
                  <Typography sx={{ fontSize: '2rem', mb: 1.5, lineHeight: 1 }} aria-hidden>
                    {index === 0 ? '🏰' : '🎓'}
                  </Typography>

                  {/* Periodo — LEVEL COMPLETE */}
                  <Box
                    sx={{
                      display: 'inline-block',
                      bgcolor: '#FBD000',
                      color: '#1A0A00',
                      px: 1.5,
                      py: 0.5,
                      mb: 1.5,
                      border: '2px solid #8B4513',
                      boxShadow: '2px 2px 0 #5C2E0A',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.45rem' }}
                    >
                      ★ LEVEL COMPLETE: {item.period}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      mb: 1.5,
                      color: isLight ? '#1A0A00' : '#F5F5F5',
                      fontSize: { xs: '0.7rem', md: '0.8rem' },
                      lineHeight: 1.8,
                    }}
                  >
                    {item.degree}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontFamily: '"Roboto", sans-serif' }}
                  >
                    {item.institution}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <MomentsCarousel />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
