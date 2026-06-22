import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { GameSnapshot } from '../../game/pacman';
import { isLeaderboardAvailable, submitScore, validatePlayerName } from '../../services/leaderboardService';

const PLAYER_NAME_KEY = 'pacman_player_name';

interface GameOverlayProps {
  snapshot: GameSnapshot;
  onStart: () => void;
  onRestart: () => void;
  onResume: () => void;
  onScoreSaved?: () => void;
}

export default function GameOverlay({
  snapshot,
  onStart,
  onRestart,
  onResume,
  onScoreSaved,
}: GameOverlayProps) {
  const { phase, score, level } = snapshot;
  const [playerName, setPlayerName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastEndPhase = useRef<string | null>(null);

  const isEndScreen = phase === 'gameOver' || phase === 'victory';
  const leaderboardAvailable = isLeaderboardAvailable();

  useEffect(() => {
    if (!isEndScreen) return;

    if (lastEndPhase.current !== phase) {
      lastEndPhase.current = phase;
      setSaved(false);
      setError(null);
      setSaving(false);
      const stored = localStorage.getItem(PLAYER_NAME_KEY);
      if (stored) setPlayerName(stored);
    }
  }, [phase, isEndScreen]);

  const handleSave = async () => {
    const validation = validatePlayerName(playerName);
    if (!validation.valid) {
      setError(validation.error ?? 'Nombre inválido');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await submitScore({
        playerName: validation.name!,
        score,
        levelReached: level,
      });
      localStorage.setItem(PLAYER_NAME_KEY, validation.name!);
      setSaved(true);
      onScoreSaved?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el puntaje');
    } finally {
      setSaving(false);
    }
  };

  const handleRestart = () => {
    lastEndPhase.current = null;
    setSaved(false);
    setError(null);
    onRestart();
  };

  if (phase === 'playing' || phase === 'dying' || phase === 'levelComplete') return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 3,
        zIndex: 2,
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3, maxWidth: 320, width: '100%' }}>
        {phase === 'menu' && (
          <>
            <Typography variant="h5" fontWeight={800} color="primary.main">
              ¡Pac-Man!
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Come todos los pellets, evita fantasmas y usa las power pellets a tu favor.
            </Typography>
            <Button variant="contained" size="large" onClick={onStart}>
              Jugar
            </Button>
          </>
        )}

        {phase === 'paused' && (
          <>
            <Typography variant="h5" fontWeight={800}>
              Pausa
            </Typography>
            <Button variant="contained" onClick={onResume}>
              Continuar
            </Button>
          </>
        )}

        {isEndScreen && (
          <>
            <Typography variant="h5" fontWeight={800} color={phase === 'victory' ? 'primary.main' : 'error.main'}>
              {phase === 'victory' ? '¡Victoria!' : 'Game Over'}
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              {score.toLocaleString()} pts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nivel alcanzado: {level}
            </Typography>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              {phase === 'victory'
                ? '¡Completaste los 3 niveles! Guarda tu puntaje en el ranking.'
                : 'Perdiste, pero tu puntaje cuenta. Guárdalo en el top 10.'}
            </Typography>

            <TextField
              label="Tu nombre"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              size="small"
              fullWidth
              inputProps={{ maxLength: 20 }}
              error={Boolean(error)}
              helperText={
                error ??
                (leaderboardAvailable
                  ? '2–20 caracteres para el ranking'
                  : 'Ranking no disponible en este entorno')
              }
              disabled={saved}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={saving || saved || !leaderboardAvailable}
              onClick={handleSave}
              startIcon={saving ? <CircularProgress size={18} color="inherit" /> : undefined}
            >
              {saving ? 'Guardando...' : saved ? 'Guardado' : 'Guardar en ranking'}
            </Button>

            {saved && (
              <Typography variant="body2" color="success.main">
                ¡Puntaje guardado en el ranking!
              </Typography>
            )}

            <Button variant="outlined" fullWidth onClick={handleRestart}>
              Jugar de nuevo
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
