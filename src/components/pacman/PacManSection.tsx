import { useCallback, useRef, useState } from 'react';
import { Box, Container, Grid2 as Grid, Paper } from '@mui/material';
import SectionTitle from '../SectionTitle';
import { glassCard } from '../../theme/theme';
import type { Game } from '../../game/pacman';
import { type GameSnapshot } from '../../game/pacman';
import GameCanvas from './GameCanvas';
import GameHUD from './GameHUD';
import GameOverlay from './GameOverlay';
import TouchControls from './TouchControls';
import Leaderboard from './Leaderboard';

const INITIAL_SNAPSHOT: GameSnapshot = {
  phase: 'menu',
  score: 0,
  lives: 3,
  level: 1,
  pelletsRemaining: 0,
  frightenedTimeLeft: 0,
};

export default function PacManSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(INITIAL_SNAPSHOT);
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  const handleGameReady = useCallback((game: Game) => {
    gameRef.current = game;
  }, []);

  const handleStateChange = useCallback((state: GameSnapshot) => {
    setSnapshot(state);
  }, []);

  const handleStart = () => {
    gameRef.current?.startPlaying();
  };

  const handleRestart = () => {
    gameRef.current?.startPlaying();
  };

  const handleResume = () => {
    gameRef.current?.resume();
  };

  const handlePause = () => {
    const game = gameRef.current;
    if (!game) return;
    const phase = game.getSnapshot().phase;
    if (phase === 'playing') game.pause();
    else if (phase === 'paused') game.resume();
  };

  const handleDirection = (dir: Parameters<Game['queueDirection']>[0]) => {
    gameRef.current?.queueDirection(dir);
  };

  const handleScoreSaved = () => {
    setLeaderboardKey((k) => k + 1);
  };

  const controlsDisabled = snapshot.phase !== 'playing';

  return (
    <Box
      id="pacman"
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'rgba(17, 24, 39, 0.35)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Easter egg"
          title="Pac-Man"
          subtitle="Mini juego arcade con 3 niveles. Compite por el top 10 del ranking global."
          align="center"
        />

        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                ...glassCard,
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                position: 'relative',
              }}
            >
              <GameHUD snapshot={snapshot} onPause={handlePause} />
              <Box sx={{ position: 'relative' }}>
                <GameCanvas
                  onStateChange={handleStateChange}
                  onGameReady={handleGameReady}
                  sectionRef={sectionRef}
                />
                <GameOverlay
                  snapshot={snapshot}
                  onStart={handleStart}
                  onRestart={handleRestart}
                  onResume={handleResume}
                  onScoreSaved={handleScoreSaved}
                />
              </Box>
              <TouchControls onDirection={handleDirection} disabled={controlsDisabled} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Leaderboard refreshKey={leaderboardKey} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
