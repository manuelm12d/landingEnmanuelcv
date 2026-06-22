import type { Direction } from './types';
import { DIR_VECTORS } from './constants';

export class InputManager {
  private queuedDirection: Direction = 'none';
  private enabled = true;
  private keyHandler: (e: KeyboardEvent) => void;
  private pauseHandler: (e: KeyboardEvent) => void;
  private onPause?: () => void;

  constructor(onPause?: () => void) {
    this.onPause = onPause;
    this.keyHandler = (e: KeyboardEvent) => this.handleKeyDown(e);
    this.pauseHandler = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        this.onPause?.();
      }
    };
    window.addEventListener('keydown', this.keyHandler);
    window.addEventListener('keydown', this.pauseHandler);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (!this.enabled) return;
    const dir = keyToDirection(e.key);
    if (dir) {
      e.preventDefault();
      this.queueDirection(dir);
    }
  }

  queueDirection(dir: Direction): void {
    if (dir !== 'none') this.queuedDirection = dir;
  }

  consumeDirection(): Direction {
    const dir = this.queuedDirection;
    this.queuedDirection = 'none';
    return dir;
  }

  peekDirection(): Direction {
    return this.queuedDirection;
  }

  setEnabled(value: boolean): void {
    this.enabled = value;
  }

  destroy(): void {
    window.removeEventListener('keydown', this.keyHandler);
    window.removeEventListener('keydown', this.pauseHandler);
  }
}

function keyToDirection(key: string): Direction | null {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return 'up';
    case 'ArrowDown':
    case 's':
    case 'S':
      return 'down';
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return 'left';
    case 'ArrowRight':
    case 'd':
    case 'D':
      return 'right';
    default:
      return null;
  }
}

export function manhattanDistance(a: { col: number; row: number }, b: { col: number; row: number }): number {
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
}

export function getTileCenter(col: number, row: number): { x: number; y: number } {
  return { x: col + 0.5, y: row + 0.5 };
}

export function directionFromDelta(dc: number, dr: number): Direction {
  if (Math.abs(dc) > Math.abs(dr)) {
    return dc > 0 ? 'right' : 'left';
  }
  if (dr !== 0) return dr > 0 ? 'down' : 'up';
  return 'none';
}

export function getAheadTile(col: number, row: number, dir: Direction, tiles: number): { col: number; row: number } {
  const vec = DIR_VECTORS[dir];
  return { col: col + vec.col * tiles, row: row + vec.row * tiles };
}
