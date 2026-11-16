import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { profile } from '../data/profile';
import { accent, fonts } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { tokens: t } = useThemeMode();

  const socials = [
    { label: 'LinkedIn', href: profile.contact.linkedin, Icon: LinkedInIcon },
    { label: 'Correo', href: `mailto:${profile.contact.email}`, Icon: MailOutlineIcon },
    { label: 'Teléfono', href: `tel:${profile.contact.phone.replace(/\s/g, '')}`, Icon: PhoneOutlinedIcon },
  ];

  return (
    <Box component="footer" sx={{ borderTop: `1px solid ${t.border}`, py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.85rem', color: t.text }}>
              <Box component="span" sx={{ color: t.subtle }}>&lt;</Box>ER<Box component="span" sx={{ color: t.subtle }}> /&gt;</Box>
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: t.subtle }}>
              © {year} {profile.name}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            {socials.map(({ label, href, Icon }) => (
              <Tooltip key={label} title={label}>
                <IconButton
                  component="a"
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  size="small"
                  sx={{
                    color: t.subtle,
                    '&:hover': { color: accent.hover, bgcolor: 'transparent', filter: `drop-shadow(0 0 8px ${accent.ring})` },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
