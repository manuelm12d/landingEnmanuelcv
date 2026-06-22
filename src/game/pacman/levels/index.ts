import type { LevelConfig } from '../types';
import { level1Map } from './level1';
import { level2Map } from './level2';
import { level3Map } from './level3';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: 'Nivel 1',
    map: level1Map,
    pacmanSpeed: 5.5,
    ghostSpeed: 4.5,
    frightenedDuration: 6,
    frightenedGhostSpeed: 3,
    scatterDuration: 7,
    chaseDuration: 20,
  },
  {
    id: 2,
    name: 'Nivel 2',
    map: level2Map,
    pacmanSpeed: 5.8,
    ghostSpeed: 5,
    frightenedDuration: 5,
    frightenedGhostSpeed: 3.2,
    scatterDuration: 5,
    chaseDuration: 20,
  },
  {
    id: 3,
    name: 'Nivel 3',
    map: level3Map,
    pacmanSpeed: 6.2,
    ghostSpeed: 5.5,
    frightenedDuration: 4,
    frightenedGhostSpeed: 3.5,
    scatterDuration: 4,
    chaseDuration: 25,
  },
];
