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
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { profile } from '../data/profile';
import { glassCard, gradientText } from '../theme/theme';
import SectionTitle from './SectionTitle';

const contactItems = [
  {
    icon: <EmailIcon color="primary" />,
    label: 'Correo electrónico',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
  },
  {
    icon: <PhoneIcon color="primary" />,
    label: 'Teléfono',
    value: profile.contact.phone,
    href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <LocationOnIcon color="primary" />,
    label: 'Ubicación',
    value: profile.contact.location,
  },
];

export default function Contact() {
  return (
    <Box id="contacto" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Contacto"
          title="¿Listo para impulsar tu próximo proyecto?"
          subtitle="Disponible para oportunidades como Tech Lead, Arquitecto de Soluciones o Ingeniero Senior Full-Stack."
          align="center"
        />

        <Paper
          elevation={0}
          sx={{
            ...glassCard,
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            maxWidth: 960,
            mx: 'auto',
          }}
        >
          <Typography variant="h4" textAlign="center" sx={{ ...gradientText, mb: 4 }}>
            Hablemos
          </Typography>

          <Grid container spacing={3}>
            {contactItems.map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  {item.icon}
                  <Box>
                    <Typography variant="overline" color="text.secondary">
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
                        sx={{ display: 'block', color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                      >
                        {item.value}
                      </Typography>
                    ) : (
                      <Typography variant="body1" fontWeight={600}>
                        {item.value}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<EmailIcon />}
              href={`mailto:${profile.contact.email}`}
            >
              Enviar correo
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LinkedInIcon />}
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver perfil de LinkedIn
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
