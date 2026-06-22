import { useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { Game, type GameSnapshot } from '../../game/pacman';

interface GameCanvasProps {
  onStateChange: (snapshot: GameSnapshot) => void;
  onGameReady: (game: Game) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function GameCanvas({ onStateChange, onGameReady, sectionRef }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);

  const handleStateChange = useCallback(
    (snapshot: GameSnapshot) => {
      onStateChange(snapshot);
    },
    [onStateChange],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const game = new Game(canvas);
    gameRef.current = game;
    game.onStateChange(handleStateChange);
    game.beginGame();
    game.start();
    onGameReady(game);

    const handleResize = () => game.resize();
    window.addEventListener('resize', handleResize);

    const section = sectionRef.current;
    let observer: IntersectionObserver | null = null;
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => {
          game.setVisible(entry.isIntersecting);
        },
        { threshold: 0.2 },
      );
      observer.observe(section);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
      game.destroy();
      gameRef.current = null;
    };
  }, [handleStateChange, onGameReady, sectionRef]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Tablero del juego Pac-Man"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  );
}
