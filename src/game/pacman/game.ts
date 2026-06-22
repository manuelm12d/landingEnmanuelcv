import { LEVELS } from './levels';
import { Maze } from './maze';
import { PacMan } from './entities/pacman';
import { Ghost, GHOST_CONFIGS } from './entities/ghost';
import { InputManager } from './input';
import { CanvasRenderer } from './renderer';
import {
  COLS,
  ROWS,
  TILE_SIZE,
  INITIAL_LIVES,
  POWER_PELLET_SCORE,
  GHOST_SCORE,
  DYING_DURATION,
  LEVEL_COMPLETE_DELAY,
} from './constants';
import type { GamePhase, GameSnapshot, GhostMode } from './types';

export type GameStateListener = (snapshot: GameSnapshot) => void;

export class Game {
  private canvas: HTMLCanvasElement;
  private renderer: CanvasRenderer;
  private input: InputManager;
  private maze: Maze;
  private pacman: PacMan;
  private ghosts: Ghost[] = [];
  private phase: GamePhase = 'menu';
  private score = 0;
  private lives = INITIAL_LIVES;
  private levelIndex = 0;
  private frightenedTimeLeft = 0;
  private ghostMode: GhostMode = 'scatter';
  private modeTimer = 0;
  private modeIsScatter = true;
  private dyingTimer = 0;
  private levelCompleteTimer = 0;
  private readyTimer = 0;
  private rafId = 0;
  private lastTime = 0;
  private running = false;
  private visible = true;
  private listener: GameStateListener | null = null;
  private listenerThrottle = 0;
  private houseCenter = { col: 9, row: 10 };
  private doorPos = { col: 9, row: 8 };
  private pacStart = { col: 9, row: 18 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new CanvasRenderer(canvas);
    this.input = new InputManager(() => this.togglePause());
    this.maze = new Maze(LEVELS[0].map);
    this.pacman = new PacMan(9, 18);
    this.initLevel();
    this.resize();
  }

  onStateChange(listener: GameStateListener): void {
    this.listener = listener;
    this.emitState();
  }

  getSnapshot(): GameSnapshot {
    return {
      phase: this.phase,
      score: this.score,
      lives: this.lives,
      level: this.levelIndex + 1,
      pelletsRemaining: this.maze.pelletsRemaining,
      frightenedTimeLeft: this.frightenedTimeLeft,
    };
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  pause(): void {
    if (this.phase === 'playing') {
      this.phase = 'paused';
      this.emitState();
    }
  }

  resume(): void {
    if (this.phase === 'paused') {
      this.phase = 'playing';
      this.lastTime = performance.now();
      this.emitState();
    }
  }

  togglePause(): void {
    if (this.phase === 'playing') this.pause();
    else if (this.phase === 'paused') this.resume();
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    if (!visible && this.phase === 'playing') {
      this.pause();
    }
  }

  beginGame(): void {
    this.score = 0;
    this.lives = INITIAL_LIVES;
    this.levelIndex = 0;
    this.loadLevel(0);
    this.phase = 'menu';
    this.emitState();
  }

  startPlaying(): void {
    if (this.phase === 'menu' || this.phase === 'gameOver' || this.phase === 'victory') {
      if (this.phase !== 'menu') {
        this.score = 0;
        this.lives = INITIAL_LIVES;
        this.levelIndex = 0;
        this.loadLevel(0);
      }
      this.phase = 'ready';
      this.readyTimer = 2;
      this.lastTime = performance.now();
      this.emitState();
    }
  }

  restart(): void {
    this.beginGame();
  }

  nextLevel(): void {
    if (this.levelIndex < LEVELS.length - 1) {
      this.levelIndex++;
      this.loadLevel(this.levelIndex);
      this.phase = 'ready';
      this.readyTimer = 2;
      this.emitState();
    }
  }

  queueDirection(dir: Parameters<InputManager['queueDirection']>[0]): void {
    this.input.queueDirection(dir);
  }

  resize(): void {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = COLS * TILE_SIZE;
    const displayHeight = ROWS * TILE_SIZE;
    this.canvas.width = displayWidth * dpr;
    this.canvas.height = displayHeight * dpr;
    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;
    const ctx = this.canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.renderer.resize(this.canvas);
  }

  destroy(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.input.destroy();
  }

  private loop = (time: number): void => {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(this.loop);

    const dt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;

    if (this.visible) {
      this.update(dt);
      this.render(dt);
    }

    this.listenerThrottle += dt;
    if (this.listenerThrottle >= 0.25) {
      this.listenerThrottle = 0;
      this.emitState();
    }
  };

  private update(dt: number): void {
    if (this.phase === 'ready') {
      this.readyTimer -= dt;
      if (this.readyTimer <= 0) {
        this.phase = 'playing';
        this.emitState();
      }
      return;
    }

    if (this.phase === 'paused' || this.phase === 'gameOver' || this.phase === 'victory' || this.phase === 'menu') return;

    if (this.phase === 'levelComplete') {
      this.levelCompleteTimer -= dt;
      if (this.levelCompleteTimer <= 0) {
        if (this.levelIndex >= LEVELS.length - 1) {
          this.phase = 'victory';
          this.emitState(true);
        } else {
          this.levelIndex++;
          this.loadLevel(this.levelIndex);
          this.phase = 'ready';
          this.readyTimer = 2;
        }
        this.emitState();
      }
      return;
    }

    if (this.phase === 'dying') {
      this.dyingTimer -= dt;
      if (this.dyingTimer <= 0) {
        if (this.lives <= 0) {
          this.phase = 'gameOver';
          this.emitState(true);
        } else {
          this.resetPositions();
          this.phase = 'ready';
          this.readyTimer = 2;
        }
        this.emitState();
      }
      return;
    }

    if (this.phase !== 'playing') return;

    const level = LEVELS[this.levelIndex];
    const queued = this.input.consumeDirection();
    if (queued !== 'none') this.pacman.queueDirection(queued);

    this.pacman.update(dt, level.pacmanSpeed, this.maze);

    const pelletValue = this.maze.eatPellet(this.pacman.col, this.pacman.row);
    if (pelletValue > 0) {
      this.score += pelletValue;
      if (pelletValue === POWER_PELLET_SCORE) {
        this.activateFrightened(level.frightenedDuration);
      }
      if (this.maze.pelletsRemaining <= 0) {
        this.phase = 'levelComplete';
        this.levelCompleteTimer = LEVEL_COMPLETE_DELAY;
        this.emitState();
        return;
      }
    }

    if (this.frightenedTimeLeft > 0) {
      this.frightenedTimeLeft -= dt;
      if (this.frightenedTimeLeft <= 0) {
        this.ghostMode = this.modeIsScatter ? 'scatter' : 'chase';
        for (const ghost of this.ghosts) {
          if (ghost.mode === 'frightened') ghost.setMode(this.ghostMode);
        }
      }
    } else {
      this.modeTimer += dt;
      const duration = this.modeIsScatter ? level.scatterDuration : level.chaseDuration;
      if (this.modeTimer >= duration) {
        this.modeTimer = 0;
        this.modeIsScatter = !this.modeIsScatter;
        this.ghostMode = this.modeIsScatter ? 'scatter' : 'chase';
        for (const ghost of this.ghosts) {
          if (ghost.mode !== 'eaten' && !ghost.inHouse) ghost.setMode(this.ghostMode);
        }
      }
    }

    const blinky = this.ghosts[0];
    for (const ghost of this.ghosts) {
      ghost.update(
        dt,
        level.ghostSpeed,
        level.frightenedGhostSpeed,
        this.maze,
        this.pacman,
        blinky,
        this.ghostMode,
      );
    }

    this.checkGhostCollisions();
  }

  private checkGhostCollisions(): void {
    const pacPos = this.pacman.getPixelPos();
    for (const ghost of this.ghosts) {
      if (ghost.inHouse || ghost.mode === 'house') continue;
      const gPos = ghost.getPixelPos();
      const dist = Math.hypot(pacPos.x - gPos.x, pacPos.y - gPos.y);
      if (dist < 0.6) {
        if (ghost.canBeEaten()) {
          ghost.setEaten();
          this.score += GHOST_SCORE;
        } else if (!ghost.isVulnerable()) {
          this.lives--;
          this.phase = 'dying';
          this.dyingTimer = DYING_DURATION;
          this.emitState();
          return;
        }
      }
    }
  }

  private activateFrightened(duration: number): void {
    this.frightenedTimeLeft = duration;
    this.ghostMode = 'frightened';
    for (const ghost of this.ghosts) {
      if (!ghost.inHouse && ghost.mode !== 'eaten') {
        ghost.setMode('frightened');
      }
    }
  }

  private initLevel(): void {
    this.houseCenter = this.maze.findGhostHouseCenter();
    this.doorPos = this.maze.findGhostDoor();
    this.pacStart = this.maze.findPacmanStart();
    this.pacman.reset(this.pacStart.col, this.pacStart.row);
    this.ghosts = GHOST_CONFIGS.map(
      (cfg) => new Ghost(cfg, this.houseCenter, this.doorPos),
    );
    this.modeTimer = 0;
    this.modeIsScatter = true;
    this.ghostMode = 'scatter';
    this.frightenedTimeLeft = 0;
  }

  private loadLevel(index: number): void {
    const level = LEVELS[index];
    this.maze.reset(level.map);
    this.initLevel();
  }

  private resetPositions(): void {
    this.pacman.reset(this.pacStart.col, this.pacStart.row);
    this.ghosts = GHOST_CONFIGS.map(
      (cfg) => new Ghost(cfg, this.houseCenter, this.doorPos),
    );
    this.modeTimer = 0;
    this.modeIsScatter = true;
    this.ghostMode = 'scatter';
    this.frightenedTimeLeft = 0;
  }

  private render(dt: number): void {
    this.renderer.updateFlash(dt, this.frightenedTimeLeft);
    this.renderer.clear();
    this.renderer.drawMaze(this.maze);

    for (const ghost of this.ghosts) {
      if (!ghost.inHouse || ghost.mode !== 'house') {
        this.renderer.drawGhost(ghost);
      }
    }

    const dyingProgress =
      this.phase === 'dying' ? 1 - this.dyingTimer / DYING_DURATION : 0;
    this.renderer.drawPacman(this.pacman, dyingProgress);

    if (this.phase === 'ready' || this.phase === 'paused' || this.phase === 'levelComplete') {
      this.renderer.drawOverlayText(this.phase, this.levelIndex + 1);
    }
  }

  private emitState(force = false): void {
    if (force) this.listenerThrottle = 0;
    this.listener?.(this.getSnapshot());
  }
}

export { COLS, ROWS, TILE_SIZE };
