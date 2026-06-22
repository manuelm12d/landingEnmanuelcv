import { Box, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { GameSnapshot } from '../../game/pacman';

interface GameHUDProps {
  snapshot: GameSnapshot;
  onPause: () => void;
}

export default function GameHUD({ snapshot, onPause }: GameHUDProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2, px: 1 }}
    >
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          Puntaje
        </Typography>
        <Typography variant="h6" color="primary.main" fontWeight={800}>
          {snapshot.score.toLocaleString()}
        </Typography>
      </Box>

      <Box textAlign="center">
        <Typography variant="caption" color="text.secondary" display="block">
          Nivel
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {snapshot.level}
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography variant="caption" color="text.secondary" display="block">
          Vidas
        </Typography>
        <Stack direction="row" spacing={0.25} justifyContent="flex-end">
          {Array.from({ length: snapshot.lives }).map((_, i) => (
            <FavoriteIcon key={i} sx={{ color: '#ff0000', fontSize: 20 }} />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography
          component="button"
          type="button"
          onClick={onPause}
          sx={{
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            bgcolor: 'transparent',
            color: 'text.secondary',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontFamily: 'inherit',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
          }}
        >
          {snapshot.phase === 'paused' ? '▶' : '⏸'}
        </Typography>
      </Box>
    </Stack>
  );
}
