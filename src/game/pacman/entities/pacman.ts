import type { Direction } from '../types';
import type { Maze } from '../maze';
import { DIR_VECTORS } from '../constants';

const CENTER_THRESHOLD = 0.08;

export class PacMan {
  col: number;
  row: number;
  dir: Direction = 'left';
  nextDir: Direction = 'left';
  progress = 0;
  mouthAngle = 0.2;
  mouthOpen = true;
  mouthTimer = 0;

  constructor(startCol: number, startRow: number) {
    this.col = startCol;
    this.row = startRow;
  }

  reset(startCol: number, startRow: number): void {
    this.col = startCol;
    this.row = startRow;
    this.dir = 'left';
    this.nextDir = 'left';
    this.progress = 0;
    this.mouthAngle = 0.2;
    this.mouthOpen = true;
    this.mouthTimer = 0;
  }

  queueDirection(dir: Direction): void {
    if (dir !== 'none') this.nextDir = dir;
  }

  update(dt: number, speed: number, maze: Maze): void {
    if (this.isAtCenter()) {
      if (this.nextDir !== 'none' && maze.canMove(this.col, this.row, this.nextDir)) {
        this.dir = this.nextDir;
      } else if (!maze.canMove(this.col, this.row, this.dir)) {
        this.dir = 'none';
      }
    }

    if (this.dir === 'none') return;

    this.progress += speed * dt;
    this.mouthTimer += dt;
    if (this.mouthTimer > 0.08) {
      this.mouthTimer = 0;
      this.mouthOpen = !this.mouthOpen;
      this.mouthAngle = this.mouthOpen ? 0.45 : 0.08;
    }

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

      if (!maze.canMove(this.col, this.row, this.dir)) {
        this.progress = 0;
        break;
      }

      this.col = nextCol;
      this.row = nextRow;

      if (this.isAtCenter() && this.nextDir !== 'none' && maze.canMove(this.col, this.row, this.nextDir)) {
        this.dir = this.nextDir;
      }
    }
  }

  getPixelPos(): { x: number; y: number } {
    const vec = DIR_VECTORS[this.dir];
    return {
      x: this.col + 0.5 + vec.col * this.progress,
      y: this.row + 0.5 + vec.row * this.progress,
    };
  }

  getTilePos(): { col: number; row: number } {
    return { col: this.col, row: this.row };
  }

  isAtCenter(): boolean {
    return this.progress < CENTER_THRESHOLD || this.progress > 1 - CENTER_THRESHOLD;
  }
}
