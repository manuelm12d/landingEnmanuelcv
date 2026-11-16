import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { experiences } from '../data/profile';
import { marioCard } from '../theme/theme';
import SectionTitle from './SectionTitle';
import { useMarioTheme } from '../context/ThemeContext';

export default function Experience() {
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  return (
    <Box
      id="experiencia"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isLight ? 'rgba(92,148,252,0.1)' : 'rgba(13,13,26,0.5)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Trayectoria profesional"
          title="Experiencia laboral destacada"
          subtitle="Más de 8 años liderando desarrollo, migraciones y despliegues en sectores críticos."
        />

        <Stack spacing={3}>
          {experiences.map((exp, index) => (
            <Paper
              key={`${exp.company}-${exp.period}`}
              elevation={0}
              sx={{
                ...marioCard(isLight),
                p: { xs: 3, md: 4 },
                borderLeft: `6px solid ${index === 0 ? '#FBD000' : '#E52521'}`,
                boxShadow: index === 0
                  ? '4px 4px 0 #8B4513, inset 0 0 0 1px rgba(251,208,0,0.2)'
                  : `4px 4px 0 ${isLight ? '#8B4513' : '#000'}`,
                transition: 'transform 0.15s ease',
                '&:hover': { transform: 'translateY(-3px)' },
              }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    {/* Icono de nivel */}
                    <Typography sx={{ fontSize: '1rem', lineHeight: 1 }} aria-hidden>
                      {index === 0 ? '🕹️' : '✅'}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: isLight ? '#1A0A00' : '#F5F5F5',
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                      }}
                    >
                      {exp.role}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#E52521',
                      fontSize: { xs: '0.6rem', md: '0.65rem' },
                      textShadow: '1px 1px 0 #8B0000',
                    }}
                  >
                    {exp.company}
                  </Typography>
                </Box>

                {/* Chip periodo estilo STAGE CLEAR */}
                <Box
                  sx={{
                    bgcolor: index === 0 ? '#FBD000' : '#E52521',
                    color: index === 0 ? '#1A0A00' : '#FFFFFF',
                    px: 1.5,
                    py: 0.5,
                    border: `2px solid ${index === 0 ? '#8B4513' : '#8B0000'}`,
                    boxShadow: `2px 2px 0 ${index === 0 ? '#5C2E0A' : '#5C0000'}`,
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: '0.45rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {index === 0 ? '▶ ' : '✔ '}{exp.period}
                  </Typography>
                </Box>
              </Stack>

              <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
                {exp.highlights.map((item) => (
                  <Typography
                    component="li"
                    key={item}
                    variant="body2"
                    sx={{ mb: 1, lineHeight: 1.7, fontFamily: '"Roboto", sans-serif' }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>

              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                {exp.technologies.map((tech, i) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: i % 2 === 0 ? 'rgba(229,37,33,0.15)' : 'rgba(251,208,0,0.15)',
                      border: `2px solid ${i % 2 === 0 ? '#E52521' : '#C8821A'}`,
                      color: isLight ? '#1A0A00' : '#F5F5F5',
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: '0.4rem',
                      height: 'auto',
                      py: 0.4,
                    }}
                  />
                ))}
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
