import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { glassCard } from '../../theme/theme';
import {
  getTopScores,
  isLeaderboardAvailable,
  type ScoreEntry,
} from '../../services/leaderboardService';

interface LeaderboardProps {
  refreshKey?: number;
}

function formatDate(date: Date | null): string {
  if (!date) return '—';
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function Leaderboard({ refreshKey = 0 }: LeaderboardProps) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isLeaderboardAvailable()) {
      setLoading(false);
      setError('Ranking no disponible en este entorno');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getTopScores(10);
      setScores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar el ranking');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  return (
    <Paper elevation={0} sx={{ ...glassCard, p: 3, borderRadius: 4, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <EmojiEventsIcon color="primary" />
        <Typography variant="h6" fontWeight={700}>
          Top 10
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {!loading && error && (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && scores.length === 0 && (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
          Sé el primero en el ranking
        </Typography>
      )}

      {!loading && !error && scores.length > 0 && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Jugador</TableCell>
                <TableCell align="right">Pts</TableCell>
                <TableCell align="center">Nivel</TableCell>
                <TableCell align="right">Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((entry, index) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={index < 3 ? 800 : 400}
                      color={index === 0 ? 'primary.main' : 'text.primary'}
                    >
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>{entry.playerName}</TableCell>
                  <TableCell align="right">{entry.score.toLocaleString()}</TableCell>
                  <TableCell align="center">{entry.levelReached}</TableCell>
                  <TableCell align="right">{formatDate(entry.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
