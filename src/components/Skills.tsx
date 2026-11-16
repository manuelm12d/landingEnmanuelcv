import { Box, Container, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { skillCategories } from '../data/profile';
import { marioCard } from '../theme/theme';
import SectionTitle from './SectionTitle';
import { useMarioTheme } from '../context/ThemeContext';

function TechIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        p: 1.5,
        cursor: 'default',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.1)',
          animation: 'mario-bounce 0.5s ease',
        },
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={`Logo de ${name}`}
        loading="lazy"
        sx={{
          width: 52,
          height: 52,
          objectFit: 'contain',
          filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.4))',
          imageRendering: 'pixelated',
        }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      <Typography
        variant="caption"
        sx={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.4rem',
          textAlign: 'center',
          lineHeight: 1.4,
          color: 'text.primary',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default function Skills() {
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  return (
    <Box
      id="habilidades"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isLight ? 'rgba(76,175,34,0.15)' : 'rgba(26,26,46,0.6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoración de tubería */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 20,
          width: 48,
          height: 80,
          bgcolor: '#4CAF22',
          border: '4px solid #2E7D32',
          boxShadow: '4px 0 0 #1B5E20, -4px 0 0 #1B5E20',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 76,
          right: 10,
          width: 68,
          height: 20,
          bgcolor: '#4CAF22',
          border: '4px solid #2E7D32',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <SectionTitle
          eyebrow="Stack tecnológico"
          title="Habilidades y tecnologías dominadas"
          subtitle="Experiencia práctica en cloud, DevOps, backend, frontend, móvil y bases de datos."
        />

        <Grid container spacing={3}>
          {skillCategories.map((category) => (
            <Grid key={category.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  ...marioCard(isLight),
                  p: 3,
                  height: '100%',
                }}
              >
                {/* Título de categoría estilo panel Mario */}
                <Box
                  sx={{
                    bgcolor: '#E52521',
                    mx: -3,
                    mt: -3,
                    mb: 2.5,
                    px: 2,
                    py: 1,
                    borderBottom: '3px solid #8B0000',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#FFFFFF',
                      textShadow: '2px 2px 0 #5C0000',
                      fontSize: '0.6rem',
                    }}
                  >
                    ► {category.title}
                  </Typography>
                </Box>

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
