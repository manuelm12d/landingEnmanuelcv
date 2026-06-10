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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import { navItems } from '../data/profile';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNav = (href: string) => {
    setOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'rgba(11, 17, 32, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CodeIcon color="primary" />
              <Typography variant="h6" fontWeight={700} sx={{ display: { xs: 'none', sm: 'block' } }}>
                E. Reyes
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton color="inherit" onClick={() => setOpen(true)} aria-label="Abrir menú">
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={item.href === '#contacto' ? 'contained' : 'text'}
                    color={item.href === '#contacto' ? 'primary' : 'inherit'}
                    onClick={() => handleNav(item.href)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, bgcolor: 'background.paper', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setOpen(false)} aria-label="Cerrar menú">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(item.href)}
                  sx={
                    item.href === '#contacto'
                      ? {
                          mx: 2,
                          my: 1,
                          borderRadius: 2,
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          '&:hover': { bgcolor: 'primary.dark' },
                        }
                      : undefined
                  }
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={
                      item.href === '#contacto' ? { fontWeight: 600, textAlign: 'center' } : undefined
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
