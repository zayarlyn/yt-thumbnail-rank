import { signOut, getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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

export const uploadThumbnail = async (url: string, by?: string) => {
  return addDoc(collection(db, 'thumbnails'), { url, at: serverTimestamp(), ...(by && { by }) });
};
