import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
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

let analyticsInstance: Analytics | null = null;

if (app && typeof window !== 'undefined' && import.meta.env.PROD && firebaseEnv?.measurementId) {
  analyticsInstance = getAnalytics(app);
}

export const analytics = analyticsInstance;
