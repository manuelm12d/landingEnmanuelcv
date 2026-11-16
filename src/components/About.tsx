import { Box, Container, Grid2 as Grid, Stack, Typography } from '@mui/material';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import { profile } from '../data/profile';
import { accent, fonts, glowCard, radialTint } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

const highlights = [
  {
    Icon: AccountTreeOutlinedIcon,
    title: 'Arquitectura limpia',
    description: 'SOLID, DDD, Feature First y separación de responsabilidades en cada proyecto.',
  },
  {
    Icon: CloudOutlinedIcon,
    title: 'Cloud multiplataforma',
    description: 'AWS, Google Cloud y Azure con despliegues seguros, escalables y automatizados.',
  },
  {
    Icon: BoltOutlinedIcon,
    title: 'Alto rendimiento',
    description: 'APIs optimizadas, microservicios, CI/CD y soluciones centradas en eficiencia.',
  },
];

export default function About() {
  const { tokens: t } = useThemeMode();

  return (
    <Box id="perfil" component="section" sx={{ py: { xs: 10, md: 14 }, borderTop: `1px solid ${t.border}` }}>
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Perfil profesional"
          title="Ingeniero de software con visión de arquitecto"
          subtitle="Formación de posgrado, liderazgo técnico y trayectoria en entornos exigentes."
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Reveal sx={{ height: '100%' }}>
              <Box
                sx={{
                  ...glowCard(t),
                  backgroundImage: radialTint('0% 0%', 0.07),
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.75rem', color: t.subtle, mb: 2 }}>
                  README.md
                </Typography>
                <Typography sx={{ color: t.muted, fontSize: '1.05rem', lineHeight: 1.85, flex: 1 }}>
                  {profile.summary}
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3, pt: 3, borderTop: `1px solid ${t.border}` }}>
                  {profile.languages.map((lang) => (
                    <Box
                      key={lang.name}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.25,
                        py: 0.5,
                        borderRadius: '6px',
                        border: `1px solid ${t.border}`,
                        fontFamily: fonts.mono,
                        fontSize: '0.75rem',
                      }}
                    >
                      <Box component="span" sx={{ color: t.text }}>{lang.name}</Box>
                      <Box component="span" sx={{ color: accent.main }}>{lang.level}</Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              {highlights.map(({ Icon, title, description }, i) => (
                <Reveal key={title} delay={i * 90} sx={{ flex: 1 }}>
                  <Box sx={{ ...glowCard(t), p: 3, height: '100%', display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        border: `1px solid ${t.border}`,
                        bgcolor: accent.soft,
                        color: accent.hover,
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '1rem', color: t.text, mb: 0.5 }}>
                        {title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: t.muted }}>
                        {description}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
