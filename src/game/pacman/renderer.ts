import { COLORS, TILE_SIZE, COLS, ROWS } from './constants';
import { TileType, type Direction, type GamePhase } from './types';
import type { Maze } from './maze';
import type { PacMan } from './entities/pacman';
import type { Ghost } from './entities/ghost';

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private frightenedFlash = false;
  private flashTimer = 0;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D not supported');
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  resize(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  updateFlash(dt: number, frightenedTimeLeft: number): void {
    if (frightenedTimeLeft > 0 && frightenedTimeLeft < 2) {
      this.flashTimer += dt;
      if (this.flashTimer > 0.2) {
        this.flashTimer = 0;
        this.frightenedFlash = !this.frightenedFlash;
      }
    } else {
      this.frightenedFlash = false;
      this.flashTimer = 0;
    }
  }

  clear(): void {
    this.ctx.fillStyle = COLORS.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawMaze(maze: Maze): void {
    const grid = maze.getRawGrid();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const tile = grid[row][col];
        const x = col * TILE_SIZE;
        const y = row * TILE_SIZE;

        if (tile === TileType.Wall) {
          this.ctx.fillStyle = COLORS.wall;
          this.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
          this.ctx.strokeStyle = COLORS.wallBorder;
          this.ctx.lineWidth = 1;
          this.ctx.strokeRect(x + 0.5, y + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);
        } else if (tile === TileType.Pellet) {
          this.ctx.fillStyle = COLORS.pellet;
          this.ctx.beginPath();
          this.ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (tile === TileType.PowerPellet) {
          this.ctx.fillStyle = COLORS.powerPellet;
          const pulse = 4 + Math.sin(Date.now() / 200) * 1.5;
          this.ctx.beginPath();
          this.ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, pulse, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  drawPacman(pacman: PacMan, dyingProgress = 0): void {
    const pos = pacman.getPixelPos();
    const cx = pos.x * TILE_SIZE;
    const cy = pos.y * TILE_SIZE;
    const radius = TILE_SIZE * 0.42;

    if (dyingProgress > 0) {
      const scale = 1 - dyingProgress;
      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.scale(scale, scale);
      this.drawPacmanShape(0, 0, radius, pacman.dir, 0.2);
      this.ctx.restore();
      return;
    }

    this.drawPacmanShape(cx, cy, radius, pacman.dir, pacman.mouthAngle);
  }

  private drawPacmanShape(cx: number, cy: number, radius: number, dir: Direction, mouthAngle: number): void {
    const rotation = directionToAngle(dir);
    this.ctx.fillStyle = COLORS.pacman;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.arc(cx, cy, radius, rotation + mouthAngle, rotation + Math.PI * 2 - mouthAngle);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawGhost(ghost: Ghost): void {
    const pos = ghost.getPixelPos();
    const cx = pos.x * TILE_SIZE;
    const cy = pos.y * TILE_SIZE;
    const w = TILE_SIZE * 0.85;
    const h = TILE_SIZE * 0.85;

    if (ghost.mode === 'eaten') {
      this.drawGhostEyes(cx, cy, ghost.dir);
      return;
    }

    let color = ghost.color;
    if (ghost.mode === 'frightened') {
      color = this.frightenedFlash ? COLORS.frightenedFlash : COLORS.frightened;
    }

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy - h * 0.1, w / 2, Math.PI, 0);
    this.ctx.lineTo(cx + w / 2, cy + h * 0.35);
    const segments = 3;
    const segW = w / segments;
    for (let i = segments; i >= 0; i--) {
      const sx = cx + w / 2 - i * segW;
      const sy = cy + h * 0.35 + (i % 2 === 0 ? 4 : 0);
      this.ctx.lineTo(sx, sy);
    }
    this.ctx.lineTo(cx - w / 2, cy - h * 0.1);
    this.ctx.closePath();
    this.ctx.fill();

    if (ghost.mode !== 'frightened' || !this.frightenedFlash) {
      this.drawGhostEyes(cx, cy, ghost.dir);
    }
  }

  private drawGhostEyes(cx: number, cy: number, dir: Direction): void {
    const pupilOffset = directionToPupil(dir);
    const eyeY = cy - 2;
    const eyeSpacing = 5;

    for (const side of [-1, 1]) {
      const ex = cx + side * eyeSpacing;
      this.ctx.fillStyle = COLORS.eyes;
      this.ctx.beginPath();
      this.ctx.arc(ex, eyeY, 4, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = COLORS.eyePupil;
      this.ctx.beginPath();
      this.ctx.arc(ex + pupilOffset.x, eyeY + pupilOffset.y, 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawOverlayText(phase: GamePhase, level: number): void {
    if (phase === 'ready') {
      this.drawCenteredText('¡LISTO!', 28);
    } else if (phase === 'paused') {
      this.drawCenteredText('PAUSA', 28);
    } else if (phase === 'levelComplete') {
      this.drawCenteredText(`NIVEL ${level} COMPLETO`, 20);
    }
  }

  private drawCenteredText(text: string, fontSize: number): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#ffff00';
    this.ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, this.width / 2, this.height / 2);
  }
}

function directionToAngle(dir: Direction): number {
  switch (dir) {
    case 'right':
      return 0;
    case 'down':
      return Math.PI / 2;
    case 'left':
      return Math.PI;
    case 'up':
      return -Math.PI / 2;
    default:
      return 0;
  }
}

function directionToPupil(dir: Direction): { x: number; y: number } {
  switch (dir) {
    case 'up':
      return { x: 0, y: -1 };
    case 'down':
      return { x: 0, y: 1 };
    case 'left':
      return { x: -1, y: 0 };
    case 'right':
      return { x: 1, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}
