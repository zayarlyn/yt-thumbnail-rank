import { initializeApp } from 'firebase';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

export const app = initializeApp(config);

export const db = getFirestore(app);
