import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getFirebaseEnv } from '../config/env';

const firebaseEnv = getFirebaseEnv();

const firebaseConfig = firebaseEnv
  ? {
      apiKey: firebaseEnv.apiKey,
      authDomain: firebaseEnv.authDomain,
      projectId: firebaseEnv.projectId,
      storageBucket: firebaseEnv.storageBucket,
      messagingSenderId: firebaseEnv.messagingSenderId,
      appId: firebaseEnv.appId,
      ...(firebaseEnv.measurementId ? { measurementId: firebaseEnv.measurementId } : {}),
    }
  : null;

export const app: FirebaseApp | null = firebaseConfig ? initializeApp(firebaseConfig) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;
export const db: Firestore | null = app
  ? getFirestore(app, firebaseEnv?.databaseId ?? 'reyeslanding')
  : null;

let analyticsInstance: Analytics | null = null;

if (app && typeof window !== 'undefined' && import.meta.env.PROD && firebaseEnv?.measurementId) {
  analyticsInstance = getAnalytics(app);
}

export const analytics = analyticsInstance;
