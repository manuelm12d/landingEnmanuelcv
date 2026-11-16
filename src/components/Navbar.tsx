import { useState } from 'react';
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
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { navItems } from '../data/profile';
import { useMarioTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { mode, toggleTheme } = useMarioTheme();
  const isLight = mode === 'light';

  const handleNav = (href: string) => {
    setOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navBg = isLight
    ? 'rgba(229, 37, 33, 0.97)'
    : 'rgba(139, 0, 0, 0.97)';

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: navBg,
          borderBottom: '4px solid #FBD000',
          boxShadow: '0 4px 0 #8B4513',
          backgroundImage: 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0.5 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.4rem' },
                  lineHeight: 1,
                  filter: 'drop-shadow(2px 2px 0 #8B0000)',
                  cursor: 'default',
                  userSelect: 'none',
                }}
                aria-hidden
              >
                🍄
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: '#FBD000',
                  textShadow: '2px 2px 0 #8B0000',
                  fontSize: '0.6rem',
                  letterSpacing: '0.05em',
                }}
              >
                E. REYES
              </Typography>
            </Box>

            {/* Desktop Nav */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={item.href === '#contacto' ? 'contained' : 'text'}
                    onClick={() => handleNav(item.href)}
                    sx={
                      item.href === '#contacto'
                        ? {
                            bgcolor: '#FBD000',
                            color: '#1A0A00',
                            border: '2px solid #8B4513',
                            boxShadow: '0 3px 0 #8B4513',
                            fontSize: '0.5rem',
                            px: 1.5,
                            '&:hover': {
                              bgcolor: '#FFE566',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 5px 0 #8B4513',
                            },
                          }
                        : {
                            color: '#FFFFFF',
                            fontSize: '0.5rem',
                            px: 1,
                            '&:hover': {
                              bgcolor: 'rgba(251,208,0,0.2)',
                              color: '#FBD000',
                            },
                          }
                    }
                  >
                    {item.label}
                  </Button>
                ))}

                {/* Toggle tema */}
                <Tooltip title={isLight ? 'Modo Noche 🌙' : 'Modo Día ☀️'}>
                  <IconButton
                    onClick={toggleTheme}
                    sx={{
                      ml: 1,
                      color: '#FBD000',
                      border: '2px solid #FBD000',
                      p: '6px',
                      '&:hover': { bgcolor: 'rgba(251,208,0,0.2)' },
                    }}
                    aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
                  >
                    {isLight ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            {/* Mobile: toggle + hamburger */}
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title={isLight ? 'Modo Noche' : 'Modo Día'}>
                  <IconButton
                    onClick={toggleTheme}
                    size="small"
                    sx={{ color: '#FBD000', border: '2px solid #FBD000', p: '4px' }}
                    aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
                  >
                    {isLight ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                <IconButton color="inherit" onClick={() => setOpen(true)} aria-label="Abrir menú">
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 280,
            height: '100%',
            bgcolor: isLight ? '#8B0000' : '#1A0A1A',
            borderLeft: '4px solid #FBD000',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ color: '#FBD000' }}
              aria-label="Cerrar menú"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Logo en drawer */}
          <Box sx={{ px: 3, pb: 2, borderBottom: '2px solid #FBD000' }}>
            <Typography sx={{ fontSize: '1.5rem' }}>🍄</Typography>
            <Typography variant="caption" sx={{ color: '#FBD000', display: 'block', mt: 0.5 }}>
              E. REYES PORTFOLIO
            </Typography>
          </Box>

          <List sx={{ pt: 1 }}>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(item.href)}
                  sx={
                    item.href === '#contacto'
                      ? {
                          mx: 2,
                          my: 1,
                          bgcolor: '#FBD000',
                          color: '#1A0A00',
                          border: '2px solid #8B4513',
                          '&:hover': { bgcolor: '#FFE566' },
                        }
                      : {
                          color: '#FFFFFF',
                          '&:hover': { bgcolor: 'rgba(251,208,0,0.15)', color: '#FBD000' },
                        }
                  }
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: '0.6rem',
                      fontWeight: item.href === '#contacto' ? 400 : 400,
                      textAlign: item.href === '#contacto' ? 'center' : 'left',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ p: 2, mt: 'auto', borderTop: '2px solid #FBD000', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', textAlign: 'center' }}>
              INSERT COIN ▶
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
