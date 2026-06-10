import { Box, Container, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { skillCategories } from '../data/profile';
import { glassCard } from '../theme/theme';
import SectionTitle from './SectionTitle';

function TechIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        p: 2,
        borderRadius: 3,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(56, 189, 248, 0.12)',
        },
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={`Logo de ${name}`}
        loading="lazy"
        sx={{
          width: 58,
          height: 58,
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
        }}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
        }}
      />
      <Typography variant="caption" fontWeight={600} textAlign="center">
        {name}
      </Typography>
    </Box>
  );
}

export default function Skills() {
  return (
    <Box
      id="habilidades"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'rgba(17, 24, 39, 0.35)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Stack tecnológico"
          title="Habilidades y tecnologías dominadas"
          subtitle="Experiencia práctica en cloud, DevOps, backend, frontend, móvil y bases de datos."
        />

        <Grid container spacing={3}>
          {skillCategories.map((category) => (
            <Grid key={category.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Paper elevation={0} sx={{ ...glassCard, p: 3, height: '100%', borderRadius: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  {category.title}
                </Typography>
                <Grid container spacing={1}>
                  {category.skills.map((skill) => (
                    <Grid key={skill.name} size={{ xs: 6, sm: category.skills.length === 1 ? 12 : 6 }}>
                      <TechIcon name={skill.name} icon={skill.icon} />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
