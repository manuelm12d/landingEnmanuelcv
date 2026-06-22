export enum TileType {
  Path = 0,
  Wall = 1,
  Pellet = 2,
  PowerPellet = 3,
  GhostHouse = 4,
  GhostDoor = 5,
}

export type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

export type GamePhase =
  | 'menu'
  | 'ready'
  | 'playing'
  | 'paused'
  | 'dying'
  | 'levelComplete'
  | 'gameOver'
  | 'victory';

export type GhostMode = 'scatter' | 'chase' | 'frightened' | 'eaten' | 'house';

export type GhostPersonality = 'blinky' | 'pinky' | 'inky' | 'clyde';

export interface GridPos {
  col: number;
  row: number;
}

export interface LevelConfig {
  id: number;
  name: string;
  map: number[][];
  pacmanSpeed: number;
  ghostSpeed: number;
  frightenedDuration: number;
  frightenedGhostSpeed: number;
  scatterDuration: number;
  chaseDuration: number;
}

export interface GameSnapshot {
  phase: GamePhase;
  score: number;
  lives: number;
  level: number;
  pelletsRemaining: number;
  frightenedTimeLeft: number;
}

export interface EntityState {
  col: number;
  row: number;
  dir: Direction;
  progress: number;
}
