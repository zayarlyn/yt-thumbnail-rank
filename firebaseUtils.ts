import { signOut, getAuth, updateProfile, User } from 'firebase/auth';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  setDoc,
  increment,
  query,
  orderBy,
  getDoc,
  limit,
  updateDoc,
} from 'firebase/firestore';
import { app, db } from './firebaseconfig';

export const actionCodeSettings = {
  url: 'http://localhost:3000/signin',
  handleCodeInApp: true,
};

export const parseVideoId = (url: string) => {
  return url.match(/(?<=v=)[\w\-]*/)?.[0];
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

export const uploadThumbnail = async ({ yt_link, by }: { yt_link: string; by?: string }) => {
  return addDoc(collection(db, 'thumbnails'), {
    at: serverTimestamp(),
    pt: 0,
    seen: 0,
    yt_link,
    by: by ? by : 'a contributer',
  });
};

export const fetchThumbnails = async ({ type, LIMIT }: FetchThumbnails) => {
  const q =
    type === 'RANK'
      ? query(
          collection(db, 'thumbnails'),
          orderBy('pt', 'desc'),
          orderBy('seen', 'desc'),
          limit(LIMIT ?? 5)
        )
      : query(collection(db, 'thumbnails'), orderBy('at', 'desc'));
  const raw = await getDocs(q);
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
// https://www.youtube.com/watch?v=nROvY9uiYYk
export const parseLinkWithFallback = (url: string, isErr = false) => {
  const vId = parseVideoId(url);
  return isErr
    ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${vId}/maxresdefault.jpg`;
};

export const updateUserInfo = async (new_data: User) => {
  const user = getAuth(app).currentUser;
  if (!user) return;
  return updateProfile(user, new_data);
};

export const getPublicUser = async (id: string) => {
  const raw = await getDoc(doc(db, 'users', id));
  return { ...raw.data() };
};

export const updatePublicUser = async (public_data: Public_data) => {
  const user = getAuth(app).currentUser;
  if (!user) return;
  return updateDoc(doc(db, 'users', user?.uid), { ...public_data });
};

export const updatePrivateUser = async ({ seen, clicked }: Private_data) => {
  const user = getAuth(app).currentUser;
  if (!user) return;
  return setDoc(
    doc(db, 'users', user?.uid, 'private', 'profile'),
    { seen: increment(seen ? 1 : 0), clicked: increment(clicked ? 1 : 0) },
    { merge: true }
  );
};

export const FisherYatesRandomize = (thumbnails: ThumbNail[]) => {
  for (let i = thumbnails.length - 1; i > 0; i--) {
    const j = Math.round(Math.random() * i);
    [thumbnails[i], thumbnails[j]] = [thumbnails[j], thumbnails[i]];
  }
  return thumbnails
};

export interface ThumbNail {
  id: string;
  at: number;
  yt_link: string;
  by?: string;
  pt?: number;
  seen?: number;
}

export enum TFType {
  RANK = 'RANK',
  NORM = 'NORM',
}

export interface FetchThumbnails {
  type: TFType;
  LIMIT?: number;
}

interface Public_data {
  username?: string;
}

interface Private_data {
  seen?: boolean;
  clicked?: boolean;
}
