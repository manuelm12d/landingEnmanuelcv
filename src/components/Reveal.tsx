import type { ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  sx?: SxProps<Theme>;
}

export default function Reveal({ children, delay = 0, sx }: RevealProps) {
  const { ref, visible } = useScrollAnimation();

  return (
    <Box
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}`}
      sx={[{ transitionDelay: `${delay}ms` }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Box>
  );
}
