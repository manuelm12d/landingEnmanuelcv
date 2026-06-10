import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { experiences } from '../data/profile';
import { glassCard } from '../theme/theme';
import SectionTitle from './SectionTitle';

export default function Experience() {
  return (
    <Box id="experiencia" component="section" sx={{ py: { xs: 8, md: 12 } }}>
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
                ...glassCard,
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                borderLeft: '4px solid',
                borderLeftColor: index === 0 ? 'primary.main' : 'rgba(56, 189, 248, 0.35)',
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
                    <WorkOutlineIcon color="primary" fontSize="small" />
                    <Typography variant="h5" component="h3">
                      {exp.role}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" color="primary.light" fontWeight={600}>
                    {exp.company}
                  </Typography>
                </Box>
                <Chip label={exp.period} color="primary" variant="outlined" />
              </Stack>

              <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
                {exp.highlights.map((item) => (
                  <Typography component="li" key={item} variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                    {item}
                  </Typography>
                ))}
              </Box>

              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                {exp.technologies.map((tech) => (
                  <Chip key={tech} label={tech} size="small" sx={{ bgcolor: 'rgba(56, 189, 248, 0.1)' }} />
                ))}
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
