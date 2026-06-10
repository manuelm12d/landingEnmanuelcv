import { Box, Container, Divider, Typography } from '@mui/material';
import { profile } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ py: 4, borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" textAlign="center">
          © {year} {profile.name}. Tech Lead & Arquitecto de Soluciones.
        </Typography>
        <Divider sx={{ my: 2, borderColor: 'rgba(148, 163, 184, 0.08)' }} />
        <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
          Desarrollado con React, TypeScript y Material UI.
        </Typography>
      </Container>
    </Box>
  );
}
