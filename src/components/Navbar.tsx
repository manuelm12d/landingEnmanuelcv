import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { navItems } from '../data/profile';
import { useThemeMode } from '../context/ThemeContext';
import { accent, fonts } from '../theme/theme';

function Logo({ onClick }: { onClick: () => void }) {
  const { tokens: t } = useThemeMode();
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label="Ir al inicio"
      sx={{
        all: 'unset',
        cursor: 'pointer',
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize: '0.95rem',
        color: t.text,
        letterSpacing: '-0.02em',
        '& .bracket': { color: t.subtle, transition: 'color .2s ease' },
        '&:hover .bracket': { color: accent.main },
      }}
    >
      <span className="bracket">&lt;</span>ER<span className="bracket"> /&gt;</span>
    </Box>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { mode, tokens: t, toggleTheme } = useThemeMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setDrawerOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = navItems.filter((item) => item.href !== '#contacto');
  const contact = navItems.find((item) => item.href === '#contacto');

  const themeToggle = (
    <Tooltip title={isDark ? 'Modo claro' : 'Modo oscuro'}>
      <IconButton
        onClick={toggleTheme}
        size="small"
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        sx={{ color: t.muted, border: `1px solid ${t.border}`, p: '6px', '&:hover': { color: t.text } }}
      >
        {isDark ? <LightModeOutlinedIcon sx={{ fontSize: 16 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 16 }} />}
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? (isDark ? 'rgba(9,9,11,0.72)' : 'rgba(255,255,255,0.72)') : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? t.border : 'transparent'}`,
          transition: 'background-color .25s ease, border-color .25s ease, backdrop-filter .25s ease',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Logo onClick={() => handleNav('#inicio')} />

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {links.map((item) => (
                  <Button
                    key={item.href}
                    variant="text"
                    size="small"
                    onClick={() => handleNav(item.href)}
                    sx={{ color: t.muted, fontSize: '0.85rem', px: 1.5, '&:hover': { color: t.text } }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Box sx={{ width: '1px', height: 20, bgcolor: t.border, mx: 1.5 }} />
                {themeToggle}
                {contact && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleNav(contact.href)}
                    sx={{ ml: 1.5, boxShadow: `0 0 12px ${accent.glow}` }}
                  >
                    Contactar
                  </Button>
                )}
              </Box>
            )}

            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {themeToggle}
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  size="small"
                  aria-label="Abrir menú"
                  sx={{ color: t.text, border: `1px solid ${t.border}`, p: '6px' }}
                >
                  <MenuIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              height: 64,
              px: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${t.border}`,
            }}
          >
            <Logo onClick={() => handleNav('#inicio')} />
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú" size="small" sx={{ color: t.muted }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 1.5, flex: 1 }}>
            {links.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(item.href)}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    color: t.muted,
                    '&:hover': { color: t.text, bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(9,9,11,0.04)' },
                  }}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.92rem', fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {contact && (
            <Box sx={{ p: 2.5, borderTop: `1px solid ${t.border}` }}>
              <Button fullWidth variant="contained" onClick={() => handleNav(contact.href)}>
                Contactar
              </Button>
              <Typography sx={{ mt: 1.5, textAlign: 'center', fontFamily: fonts.mono, fontSize: '0.7rem', color: t.subtle }}>
                Tech Lead · Arquitecto de Soluciones
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}
