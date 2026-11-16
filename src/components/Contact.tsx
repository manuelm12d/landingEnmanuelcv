import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { profile } from '../data/profile';
import { marioCard } from '../theme/theme';
import SectionTitle from './SectionTitle';
import { useMarioTheme } from '../context/ThemeContext';

const contactItems = [
  {
    emoji: '📧',
    label: 'Correo electrónico',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
  },
  {
    emoji: '📞',
    label: 'Teléfono',
    value: profile.contact.phone,
    href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
  },
  {
    emoji: '📍',
    label: 'Ubicación',
    value: profile.contact.location,
  },
];

export default function Contact() {
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

  return (
    <Box
      id="contacto"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isLight ? 'rgba(92,148,252,0.15)' : 'rgba(13,13,26,0.7)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Estrellas decorativas */}
      {[...Array(5)].map((_, i) => (
        <Typography
          key={i}
          aria-hidden
          sx={{
            position: 'absolute',
            fontSize: { xs: '1rem', md: '1.5rem' },
            opacity: 0.4,
            animation: `star-blink ${1.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
            top: `${10 + i * 15}%`,
            left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
            right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ⭐
        </Typography>
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <SectionTitle
          eyebrow="Contacto"
          title="¿Listo para impulsar tu próximo proyecto?"
          subtitle="Disponible para oportunidades como Tech Lead, Arquitecto de Soluciones o Ingeniero Senior Full-Stack."
          align="center"
        />

        <Paper
          elevation={0}
          sx={{
            ...marioCard(isLight),
            p: { xs: 3, md: 5 },
            maxWidth: 960,
            mx: 'auto',
            border: `4px solid #FBD000`,
            boxShadow: '6px 6px 0 #8B4513',
          }}
        >
          {/* Título parpadeante estilo GAME COMPLETE */}
          <Box
            sx={{
              bgcolor: '#E52521',
              mx: { xs: -3, md: -5 },
              mt: { xs: -3, md: -5 },
              mb: 4,
              px: 3,
              py: 2,
              borderBottom: '4px solid #FBD000',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#FBD000',
                textShadow: '2px 2px 0 #8B0000',
                fontSize: { xs: '0.7rem', md: '0.9rem' },
              }}
            >
              🎮 Hablemos
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#FFFFFF',
                display: 'block',
                mt: 0.5,
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '0.45rem',
              }}
              className="blink-text"
            >
              ★ PRESS START TO CONNECT ★
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {contactItems.map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Typography sx={{ fontSize: '1.3rem', lineHeight: 1, flexShrink: 0, mt: 0.5 }} aria-hidden>
                    {item.emoji}
                  </Typography>
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: 'text.secondary', fontSize: '0.5rem' }}
                    >
                      {item.label}
                    </Typography>
                    {item.href ? (
                      <Typography
                        component="a"
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        variant="body1"
                        fontWeight={600}
                        sx={{
                          display: 'block',
                          color: 'text.primary',
                          textDecoration: 'none',
                          fontFamily: '"Roboto", sans-serif',
                          '&:hover': { color: '#FBD000' },
                        }}
                      >
                        {item.value}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ fontFamily: '"Roboto", sans-serif' }}
                      >
                        {item.value}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<EmailIcon />}
              href={`mailto:${profile.contact.email}`}
            >
              ► Enviar correo
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LinkedInIcon />}
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver LinkedIn
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
