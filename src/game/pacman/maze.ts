import { COLS, ROWS } from './constants';
import { TileType, type Direction, type GridPos } from './types';
import { DIR_VECTORS } from './constants';

export class Maze {
  private grid: number[][];
  pelletsRemaining = 0;

  constructor(map: number[][]) {
    this.grid = map.map((row) => [...row]);
    this.countPellets();
  }

  reset(map: number[][]): void {
    this.grid = map.map((row) => [...row]);
    this.countPellets();
  }

  get cols(): number {
    return COLS;
  }

  get rows(): number {
    return ROWS;
  }

  getTile(col: number, row: number): number {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
      return TileType.Wall;
    }
    return this.grid[row][col];
  }

  isWall(col: number, row: number): boolean {
    const tile = this.getTile(col, row);
    return tile === TileType.Wall;
  }

  isWalkable(col: number, row: number, allowGhostHouse = false): boolean {
    if (row < 0 || row >= ROWS) return false;
    if (col < 0 || col >= COLS) return true;
    const tile = this.grid[row][col];
    if (tile === TileType.Wall) return false;
    if (!allowGhostHouse && (tile === TileType.GhostHouse || tile === TileType.GhostDoor)) {
      return false;
    }
    return true;
  }

  isGhostWalkable(col: number, row: number): boolean {
    if (row < 0 || row >= ROWS) return false;
    if (col < 0 || col >= COLS) return true;
    const tile = this.grid[row][col];
    return tile !== TileType.Wall;
  }

  eatPellet(col: number, row: number): number {
    const tile = this.getTile(col, row);
    if (tile === TileType.Pellet) {
      this.grid[row][col] = TileType.Path;
      this.pelletsRemaining--;
      return 10;
    }
    if (tile === TileType.PowerPellet) {
      this.grid[row][col] = TileType.Path;
      this.pelletsRemaining--;
      return 50;
    }
    return 0;
  }

  isPowerPellet(col: number, row: number): boolean {
    return this.getTile(col, row) === TileType.PowerPellet;
  }

  wrapCol(col: number): number {
    if (col < 0) return COLS - 1;
    if (col >= COLS) return 0;
    return col;
  }

  getCenter(col: number, row: number): GridPos {
    return { col: col + 0.5, row: row + 0.5 };
  }

  canMove(fromCol: number, fromRow: number, dir: Direction, forGhost = false): boolean {
    const vec = DIR_VECTORS[dir];
    const nextCol = fromCol + vec.col;
    const nextRow = fromRow + vec.row;
    if (forGhost) return this.isGhostWalkable(nextCol, nextRow);
    return this.isWalkable(nextCol, nextRow);
  }

  getWalkableDirections(col: number, row: number, currentDir: Direction, forGhost = false): Direction[] {
    const dirs: Direction[] = [];
    for (const dir of ['up', 'down', 'left', 'right'] as Direction[]) {
      if (dir === currentDir) continue;
      const opposite =
        (currentDir === 'up' && dir === 'down') ||
        (currentDir === 'down' && dir === 'up') ||
        (currentDir === 'left' && dir === 'right') ||
        (currentDir === 'right' && dir === 'left');
      if (opposite) continue;
      if (this.canMove(col, row, dir, forGhost)) dirs.push(dir);
    }
    if (dirs.length === 0 && currentDir !== 'none') {
      if (this.canMove(col, row, currentDir, forGhost)) dirs.push(currentDir);
    }
    return dirs;
  }

  findGhostHouseCenter(): GridPos {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (this.grid[row][col] === TileType.GhostHouse) {
          return { col, row };
        }
      }
    }
    return { col: 9, row: 10 };
  }

  findGhostDoor(): GridPos {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (this.grid[row][col] === TileType.GhostDoor) {
          return { col, row };
        }
      }
    }
    return { col: 9, row: 8 };
  }

  findPacmanStart(): GridPos {
    for (let row = ROWS - 1; row >= 0; row--) {
      for (let col = 0; col < COLS; col++) {
        if (this.grid[row][col] === TileType.Path || this.grid[row][col] === TileType.Pellet) {
          if (row > ROWS - 4) return { col, row };
        }
      }
    }
    return { col: 9, row: 18 };
  }

  getRawGrid(): number[][] {
    return this.grid.map((row) => [...row]);
  }

  private countPellets(): void {
    this.pelletsRemaining = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const tile = this.grid[row][col];
        if (tile === TileType.Pellet || tile === TileType.PowerPellet) {
          this.pelletsRemaining++;
        }
      }
    }
  }
}
