import { Box, IconButton } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Direction } from '../../game/pacman';

interface TouchControlsProps {
  onDirection: (dir: Direction) => void;
  disabled?: boolean;
}

const btnSx = {
  bgcolor: 'background.default',
  border: '1px solid',
  borderColor: 'divider',
  color: 'text.primary',
  width: 52,
  height: 52,
  touchAction: 'none',
  '&:active': { bgcolor: 'rgba(37, 99, 235, 0.2)', borderColor: 'primary.main' },
};

export default function TouchControls({ onDirection, disabled }: TouchControlsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isMobile) return null;

  const handleTouch = (dir: Direction) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) onDirection(dir);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 52px)',
        gridTemplateRows: 'repeat(2, 52px)',
        gap: 1,
        justifyContent: 'center',
        mt: 2,
        touchAction: 'none',
      }}
      onTouchStart={(e) => e.preventDefault()}
    >
      <Box />
      <IconButton sx={btnSx} aria-label="Arriba" onTouchStart={handleTouch('up')} onClick={handleTouch('up')}>
        <ArrowUpwardIcon />
      </IconButton>
      <Box />
      <IconButton sx={btnSx} aria-label="Izquierda" onTouchStart={handleTouch('left')} onClick={handleTouch('left')}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton sx={btnSx} aria-label="Abajo" onTouchStart={handleTouch('down')} onClick={handleTouch('down')}>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton sx={btnSx} aria-label="Derecha" onTouchStart={handleTouch('right')} onClick={handleTouch('right')}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}
