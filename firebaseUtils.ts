import { signOut, getAuth } from 'firebase/auth';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  setDoc,
  increment,
} from 'firebase/firestore';
import { app, db } from './firebaseconfig';

export const actionCodeSettings = {
  url: 'http://localhost:3000/signin',
  handleCodeInApp: true,
};

export const parseVideoId = (url: string) => {
  return url.match(/(?<=v=).*/)?.[0];
};

export const isAuthenticated = () => {
  return getAuth(app).currentUser;
};

export const signOutUser = async () => {
  return await signOut(getAuth(app));
};

export const isSignInLink = (link: string) => {
  return link.startsWith('http://localhost:3000/signin?apiKey');
};

export const uploadThumbnail = async (yt_link: string, by?: string) => {
  return addDoc(collection(db, 'thumbnails'), {
    yt_link,
    at: serverTimestamp(),
    pt: 0,
    seen: 0,
    ...(by && { by }),
  });
};

export const fetchThumbnails = async () => {
  const raw = await getDocs(collection(db, 'thumbnails'));
  return raw.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    at: doc.data().at.toMillis(),
  })) as ThumbNail[];
};

export const incrementThumb = async (id: string, incre_pt = false) => {
  return setDoc(
    doc(db, 'thumbnails', id),
    { seen: increment(1), pt: increment(incre_pt ? 1 : 0) },
    { merge: true }
  );
};

export interface ThumbNail {
  id: string;
  by?: string;
  at: number;
  yt_link: string;
}
