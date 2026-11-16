import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid2 as Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { profile } from '../data/profile';
import { accent, fonts, glowCard } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

function legacyCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  if (!ok) throw new Error('copy failed');
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    legacyCopy(text);
  }
}

function EmailCard() {
  const { tokens: t } = useThemeMode();
  const [copied, setCopied] = useState(false);
  const email = profile.contact.email;

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await copyText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Box
      sx={{
        ...glowCard(t),
        p: { xs: 2.5, md: 3 },
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        background: t.isDark
          ? `linear-gradient(135deg, rgba(37,99,235,0.14) 0%, ${t.surface} 70%)`
          : `linear-gradient(135deg, rgba(37,99,235,0.08) 0%, ${t.surface} 70%)`,
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          bgcolor: accent.main,
          color: '#FFFFFF',
          boxShadow: `0 0 20px ${accent.ring}`,
        }}
      >
        <MailOutlineIcon sx={{ fontSize: 22 }} />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.72rem', color: t.subtle, mb: 0.25 }}>
          email
        </Typography>
        <Typography
          component="a"
          href={`mailto:${email}`}
          sx={{
            display: 'block',
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: t.text,
            textDecoration: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '&:hover': { color: accent.hover },
          }}
        >
          {email}
        </Typography>
      </Box>
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        {copied && (
          <Box
            className="pop-in"
            role="status"
            sx={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              right: 0,
              px: 1,
              py: 0.5,
              borderRadius: '6px',
              bgcolor: accent.success,
              color: '#04130A',
              fontSize: '0.72rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            ¡Copiado!
          </Box>
        )}
        <Tooltip title={copied ? '' : 'Copiar correo'}>
          <IconButton
            onClick={handleCopy}
            aria-label="Copiar correo al portapapeles"
            sx={{
              border: `1px solid ${copied ? accent.success : t.borderStrong}`,
              color: copied ? accent.success : t.text,
              transition: 'all .2s ease',
            }}
          >
            {copied ? <CheckIcon sx={{ fontSize: 18 }} /> : <ContentCopyIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default function Contact() {
  const { tokens: t } = useThemeMode();

  const items = [
    {
      Icon: PhoneOutlinedIcon,
      label: 'teléfono',
      value: profile.contact.phone,
      href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
    },
    {
      Icon: LinkedInIcon,
      label: 'linkedin',
      value: 'enmanuel-reyes',
      href: profile.contact.linkedin,
    },
    {
      Icon: PlaceOutlinedIcon,
      label: 'ubicación',
      value: 'Managua, Nicaragua',
    },
  ];

  return (
    <Box
      id="contacto"
      component="section"
      sx={{ position: 'relative', py: { xs: 10, md: 16 }, overflow: 'hidden', borderTop: `1px solid ${t.border}` }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: { xs: -300, md: -420 },
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 700, md: 1200 },
          height: { xs: 500, md: 720 },
          borderRadius: '50%',
          background: `radial-gradient(closest-side, rgba(37,99,235,${t.isDark ? 0.35 : 0.18}), ${accent.glow} 50%, transparent 100%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <SectionTitle
          eyebrow="Contacto"
          title="¿Listo para impulsar tu próximo proyecto?"
          subtitle="Disponible para oportunidades como Tech Lead, Arquitecto de Soluciones o Ingeniero Senior Full-Stack."
          align="center"
        />

        <Reveal>
          <EmailCard />
        </Reveal>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {items.map(({ Icon, label, value, href }, i) => {
            const external = href?.startsWith('http');
            return (
              <Grid key={label} size={{ xs: 12, sm: 4 }}>
                <Reveal delay={80 + i * 80} sx={{ height: '100%' }}>
                  <Box
                    component={href ? 'a' : 'div'}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    sx={{
                      ...glowCard(t),
                      p: 2.5,
                      height: '100%',
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover .contact-icon': { color: accent.hover },
                    }}
                  >
                    <Icon className="contact-icon" sx={{ fontSize: 20, color: t.muted, mb: 1.5, transition: 'color .2s ease' }} />
                    <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.72rem', color: t.subtle }}>{label}</Typography>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 500, color: t.text, wordBreak: 'break-word' }}>
                      {value}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid>
            );
          })}
        </Grid>

        <Reveal delay={200}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              href={`mailto:${profile.contact.email}`}
              endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
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
              Conectar en LinkedIn
            </Button>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
