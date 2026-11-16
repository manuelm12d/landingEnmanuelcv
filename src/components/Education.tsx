import { Box, Container, Grid2 as Grid, Stack, Typography } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { education } from '../data/profile';
import { accent, fonts, glowCard, radialTint } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';
import MomentsCarousel from './MomentsCarousel';
import Reveal from './Reveal';

export default function Education() {
  const { tokens: t } = useThemeMode();

  return (
    <Box id="educacion" component="section" sx={{ py: { xs: 10, md: 14 }, borderTop: `1px solid ${t.border}` }}>
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Formación académica"
          title="Educación"
          subtitle="Formación universitaria y posgrado en ingeniería de software."
        />

        <Grid container spacing={2} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              {education.map((item, index) => (
                <Reveal key={item.degree} delay={index * 90} sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      ...glowCard(t),
                      backgroundImage: index === 0 ? radialTint('100% 0%', 0.08) : 'none',
                      p: { xs: 3, md: 4 },
                      height: '100%',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '10px',
                          border: `1px solid ${t.border}`,
                          bgcolor: accent.soft,
                          color: accent.hover,
                        }}
                      >
                        <SchoolOutlinedIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Box
                        sx={{
                          fontFamily: fonts.mono,
                          fontSize: '0.72rem',
                          color: t.muted,
                          px: 1,
                          py: 0.25,
                          borderRadius: '999px',
                          border: `1px solid ${t.border}`,
                        }}
                      >
                        {item.period}
                      </Box>
                    </Stack>

                    <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, color: t.text, mb: 1 }}>
                      {item.degree}
                    </Typography>
                    <Typography variant="body2" sx={{ color: t.muted }}>
                      {item.institution}
                    </Typography>
                  </Box>
                </Reveal>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Reveal delay={180} sx={{ height: '100%' }}>
              <MomentsCarousel />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
