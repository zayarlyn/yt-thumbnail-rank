import { signOut, getAuth, User } from 'firebase/auth';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { app, db } from '../firebaseconfig';
import { updatePrivateUser } from './firestoreUtils';

export const actionCodeSettings = {
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://yt-thumbnail-rank.vercel.app/signin'
      : 'http://localhost:3000/signin',
  handleCodeInApp: true,
};

export const parseVideoId = (url: string) => {
  return url.match(/(?<=watch\?v=)[\w\-]*/)?.[0] || url.match(/(?<=youtu\.be\/)[\w\-]*/)?.[0];
};

export const signInWithLink = async (email: string, link: string) => {
  return signInWithEmailLink(getAuth(app), email, link);
};

export const sendSignInLink = async (email: string) => {
  return sendSignInLinkToEmail(getAuth(app), email, actionCodeSettings);
};

export const isSignInLink = async () => {
  return isSignInWithEmailLink(getAuth(app), window.location.href);
};

export async function handleLogin(user: User) {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ user });
  const loginPromise = new Promise(() => fetch('/api/login', { method: 'POST', headers, body }));
  const { createdAt, lastLoginAt } = user.metadata as MetaData;
  const newUserPromise =
    createdAt === lastLoginAt ? updatePrivateUser({ email: user.email as string }) : [];
  return Promise.all([loginPromise, newUserPromise]);
}

export const signOutUser = async () => {
  return await signOut(getAuth(app));
};

export const parseLinkWithFallback = (url: string, isErr = false) => {
  return `https://img.youtube.com/vi/${parseVideoId(url)}/hqdefault.jpg`;
};

export interface MetaData {
  createdAt: string;
  lastLoginAt: string;
}
