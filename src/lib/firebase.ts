import { initializeApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { firebaseEnv } from '../config/env';

const firebaseConfig = {
  apiKey: firebaseEnv.apiKey,
  authDomain: firebaseEnv.authDomain,
  projectId: firebaseEnv.projectId,
  storageBucket: firebaseEnv.storageBucket,
  messagingSenderId: firebaseEnv.messagingSenderId,
  appId: firebaseEnv.appId,
  ...(firebaseEnv.measurementId ? { measurementId: firebaseEnv.measurementId } : {}),
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

let analyticsInstance: Analytics | null = null;

if (typeof window !== 'undefined' && import.meta.env.PROD && firebaseEnv.measurementId) {
  analyticsInstance = getAnalytics(app);
}

export const analytics = analyticsInstance;
