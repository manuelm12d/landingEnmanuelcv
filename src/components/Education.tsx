import { Box, Container, Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { education } from '../data/profile';
import { glassCard } from '../theme/theme';
import SectionTitle from './SectionTitle';
import MomentsCarousel from './MomentsCarousel';

export default function Education() {
  return (
    <Box
      id="educacion"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'rgba(17, 24, 39, 0.35)',
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
              {education.map((item) => (
                <Paper key={item.degree} elevation={0} sx={{ ...glassCard, p: 4, borderRadius: 4, flex: 1 }}>
                  <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="overline" color="primary" fontWeight={700}>
                    {item.period}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, mb: 1.5 }}>
                    {item.degree}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
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
