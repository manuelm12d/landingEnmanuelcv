import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { isFirebaseConfigured } from '../config/env';

const COLLECTION = 'pacman_scores';
const NAME_PATTERN = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/;

export interface ScoreEntry {
  id: string;
  playerName: string;
  score: number;
  levelReached: number;
  createdAt: Date | null;
}

export interface SubmitScoreInput {
  playerName: string;
  score: number;
  levelReached: number;
}

function requireDb(): Firestore {
  if (!db) {
    throw new Error(
      import.meta.env.DEV
        ? 'Firebase no disponible. Usa: npm run dev:firebase'
        : 'Firebase no está configurado.',
    );
  }
  return db;
}

export function isLeaderboardAvailable(): boolean {
  return isFirebaseConfigured() && db !== null;
}

export function validatePlayerName(name: string): { valid: boolean; name?: string; error?: string } {
  const trimmed = name.trim();
  if (trimmed.length < 2) return { valid: false, error: 'Mínimo 2 caracteres' };
  if (trimmed.length > 20) return { valid: false, error: 'Máximo 20 caracteres' };
  if (!NAME_PATTERN.test(trimmed)) return { valid: false, error: 'Solo letras, números y espacios' };
  return { valid: true, name: trimmed };
}

export async function submitScore(input: SubmitScoreInput): Promise<void> {
  const validation = validatePlayerName(input.playerName);
  if (!validation.valid || !validation.name) {
    throw new Error(validation.error ?? 'Nombre inválido');
  }

  const score = Math.floor(input.score);
  const levelReached = Math.min(3, Math.max(1, Math.floor(input.levelReached)));

  if (score < 0 || score > 99999) {
    throw new Error('Puntaje fuera de rango');
  }

  await addDoc(collection(requireDb(), COLLECTION), {
    playerName: validation.name,
    score,
    levelReached,
    createdAt: serverTimestamp(),
  });
}

export async function getTopScores(maxResults = 10): Promise<ScoreEntry[]> {
  const database = requireDb();
  const q = query(
    collection(database, COLLECTION),
    orderBy('score', 'desc'),
    limit(maxResults),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      playerName: data.playerName as string,
      score: data.score as number,
      levelReached: data.levelReached as number,
      createdAt: data.createdAt?.toDate?.() ?? null,
    };
  });
}
