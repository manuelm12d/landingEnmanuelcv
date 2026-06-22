import type { Direction, GridPos } from './types';

export const TILE_SIZE = 16;
export const COLS = 19;
export const ROWS = 21;

export const INITIAL_LIVES = 3;
export const PELLET_SCORE = 10;
export const POWER_PELLET_SCORE = 50;
export const GHOST_SCORE = 200;
export const DYING_DURATION = 1.2;
export const LEVEL_COMPLETE_DELAY = 2;
export const GHOST_RELEASE_INTERVAL = 4;

export const SCATTER_CORNERS: Record<string, GridPos> = {
  blinky: { col: COLS - 2, row: 0 },
  pinky: { col: 0, row: 0 },
  inky: { col: COLS - 2, row: ROWS - 1 },
  clyde: { col: 0, row: ROWS - 1 },
};

export const COLORS = {
  background: '#000000',
  wall: '#2121de',
  wallBorder: '#3434ff',
  pellet: '#ffb897',
  powerPellet: '#ffb897',
  pacman: '#ffff00',
  blinky: '#ff0000',
  pinky: '#ffb8ff',
  inky: '#00ffff',
  clyde: '#ffb852',
  frightened: '#2121de',
  frightenedFlash: '#ffffff',
  eyes: '#ffffff',
  eyePupil: '#2121de',
};

export const DIR_VECTORS: Record<Direction, GridPos> = {
  up: { col: 0, row: -1 },
  down: { col: 0, row: 1 },
  left: { col: -1, row: 0 },
  right: { col: 1, row: 0 },
  none: { col: 0, row: 0 },
};

export const OPPOSITE_DIR: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
  none: 'none',
};

export const ALL_DIRS: Direction[] = ['up', 'down', 'left', 'right'];
