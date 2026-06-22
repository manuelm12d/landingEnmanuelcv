import type { Direction, GhostMode, GhostPersonality, GridPos } from '../types';
import type { Maze } from '../maze';
import type { PacMan } from './pacman';
import { COLORS, DIR_VECTORS, OPPOSITE_DIR, SCATTER_CORNERS } from '../constants';
import { getAheadTile, manhattanDistance } from '../input';

const CENTER_THRESHOLD = 0.08;

export interface GhostConfig {
  personality: GhostPersonality;
  color: string;
  startCol: number;
  startRow: number;
  releaseDelay: number;
}

export const GHOST_CONFIGS: GhostConfig[] = [
  { personality: 'blinky', color: COLORS.blinky, startCol: 9, startRow: 8, releaseDelay: 0 },
  { personality: 'pinky', color: COLORS.pinky, startCol: 9, startRow: 10, releaseDelay: 2 },
  { personality: 'inky', color: COLORS.inky, startCol: 8, startRow: 10, releaseDelay: 4 },
  { personality: 'clyde', color: COLORS.clyde, startCol: 10, startRow: 10, releaseDelay: 6 },
];

export class Ghost {
  personality: GhostPersonality;
  color: string;
  col: number;
  row: number;
  dir: Direction = 'up';
  progress = 0;
  mode: GhostMode = 'house';
  releaseDelay: number;
  releaseTimer = 0;
  inHouse = true;
  houseTarget: GridPos;
  doorTarget: GridPos;

  constructor(config: GhostConfig, houseCenter: GridPos, doorPos: GridPos) {
    this.personality = config.personality;
    this.color = config.color;
    this.col = config.startCol;
    this.row = config.startRow;
    this.releaseDelay = config.releaseDelay;
    this.houseTarget = houseCenter;
    this.doorTarget = doorPos;
  }

  reset(config: GhostConfig, houseCenter: GridPos, doorPos: GridPos): void {
    this.col = config.startCol;
    this.row = config.startRow;
    this.dir = 'up';
    this.progress = 0;
    this.mode = 'house';
    this.releaseTimer = 0;
    this.inHouse = true;
    this.houseTarget = houseCenter;
    this.doorTarget = doorPos;
    this.releaseDelay = config.releaseDelay;
  }

  release(): void {
    this.inHouse = false;
    this.mode = 'scatter';
    this.col = this.doorTarget.col;
    this.row = this.doorTarget.row - 1;
    this.dir = 'up';
    this.progress = 0;
  }

  setMode(mode: GhostMode): void {
    if (this.mode === 'eaten') return;
    if (mode === 'frightened' && (this.mode === 'house' || this.inHouse)) return;
    this.mode = mode;
  }

  setEaten(): void {
    this.mode = 'eaten';
    this.inHouse = false;
  }

  update(
    dt: number,
    speed: number,
    frightenedSpeed: number,
    maze: Maze,
    pacman: PacMan,
    blinky: Ghost,
    globalMode: GhostMode,
  ): void {
    if (this.mode === 'house' || this.inHouse) {
      this.releaseTimer += dt;
      if (this.releaseTimer >= this.releaseDelay) {
        this.release();
      }
      return;
    }

    const effectiveMode = this.mode === 'eaten' ? 'eaten' : globalMode === 'frightened' ? 'frightened' : globalMode;
    const moveSpeed = effectiveMode === 'frightened' ? frightenedSpeed : this.mode === 'eaten' ? speed * 1.5 : speed;

    if (this.isAtCenter()) {
      this.dir = this.chooseDirection(maze, pacman, blinky, effectiveMode);
    }

    if (this.dir === 'none') return;

    this.progress += moveSpeed * dt;

    while (this.progress >= 1) {
      this.progress -= 1;
      const vec = DIR_VECTORS[this.dir];
      let nextCol = this.col + vec.col;
      const nextRow = this.row + vec.row;

      if (nextCol < 0 || nextCol >= maze.cols) {
        nextCol = maze.wrapCol(nextCol);
        this.col = nextCol;
        this.row = nextRow;
        continue;
      }

      if (!maze.isGhostWalkable(nextCol, nextRow)) {
        this.progress = 0;
        this.dir = this.chooseDirection(maze, pacman, blinky, effectiveMode);
        break;
      }

      this.col = nextCol;
      this.row = nextRow;

      if (this.mode === 'eaten' && this.col === this.houseTarget.col && this.row === this.houseTarget.row) {
        this.mode = 'house';
        this.inHouse = true;
        this.releaseTimer = 0;
        this.progress = 0;
        break;
      }
    }
  }

  private chooseDirection(
    maze: Maze,
    pacman: PacMan,
    blinky: Ghost,
    mode: GhostMode,
  ): Direction {
    const options = maze.getWalkableDirections(this.col, this.row, this.dir, true);
    if (options.length === 0) {
      const opposite = OPPOSITE_DIR[this.dir];
      if (maze.canMove(this.col, this.row, opposite, true)) return opposite;
      return this.dir;
    }

    if (mode === 'frightened') {
      return options[Math.floor(Math.random() * options.length)];
    }

    const target = this.getTarget(pacman, blinky, mode);
    let bestDir = options[0];
    let bestDist = Infinity;

    for (const dir of options) {
      const vec = DIR_VECTORS[dir];
      const nc = this.col + vec.col;
      const nr = this.row + vec.row;
      const dist = manhattanDistance({ col: nc, row: nr }, target);
      if (dist < bestDist) {
        bestDist = dist;
        bestDir = dir;
      }
    }

    return bestDir;
  }

  private getTarget(pacman: PacMan, blinky: Ghost, mode: GhostMode): GridPos {
    if (mode === 'eaten') return this.houseTarget;

    const pacTile = pacman.getTilePos();
    if (mode === 'scatter') return SCATTER_CORNERS[this.personality];

    switch (this.personality) {
      case 'blinky':
        return pacTile;
      case 'pinky': {
        const ahead = getAheadTile(pacTile.col, pacTile.row, pacman.dir, 4);
        return ahead;
      }
      case 'inky': {
        const ahead = getAheadTile(pacTile.col, pacTile.row, pacman.dir, 2);
        const vec = {
          col: ahead.col - blinky.col,
          row: ahead.row - blinky.row,
        };
        return { col: ahead.col + vec.col, row: ahead.row + vec.row };
      }
      case 'clyde': {
        const dist = manhattanDistance({ col: this.col, row: this.row }, pacTile);
        return dist > 8 ? pacTile : SCATTER_CORNERS.clyde;
      }
      default:
        return pacTile;
    }
  }

  getPixelPos(): { x: number; y: number } {
    const vec = DIR_VECTORS[this.dir];
    return {
      x: this.col + 0.5 + vec.col * this.progress,
      y: this.row + 0.5 + vec.row * this.progress,
    };
  }

  isAtCenter(): boolean {
    return this.progress < CENTER_THRESHOLD || this.progress > 1 - CENTER_THRESHOLD;
  }

  isVulnerable(): boolean {
    return this.mode === 'frightened' || this.mode === 'eaten';
  }

  canBeEaten(): boolean {
    return this.mode === 'frightened';
  }
}
