import { Box, Container, Grid2 as Grid, Paper, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { education } from '../data/profile';
import { glassCard } from '../theme/theme';
import SectionTitle from './SectionTitle';

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

        <Grid container spacing={3}>
          {education.map((item) => (
            <Grid key={item.degree} size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ ...glassCard, p: 4, height: '100%', borderRadius: 4 }}>
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
