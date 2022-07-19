import { signOut, getAuth } from 'firebase/auth';
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
  arrayUnion,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { app, db } from '../firebaseconfig';

export const actionCodeSettings = {
  url: 'https://yt-thumbnail-rank.vercel.app/signin',
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

export const isSignInLink = async (link: string) => {
  return isSignInWithEmailLink(getAuth(app), link);
};

export const signOutUser = async () => {
  return await signOut(getAuth(app));
};

export const uploadThumbnail = async ({ yt_link, descr }: { yt_link: string; descr?: string }) => {
  const user = getAuth(app).currentUser;
  return addDoc(collection(db, 'thumbnails'), {
    ...(user && { by: user.uid }),
    at: serverTimestamp(),
    ...(descr && { descr }),
    seen: 0,
    pt: 0,
    yt_link,
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
  return transformToThumbNails(raw.docs);
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
  // return isErr
  // ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg`
  // : `https://img.youtube.com/vi/${vId}/maxresdefault.jpg`;
  return `https://img.youtube.com/vi/${vId}/hqdefault.jpg`;
};

export const isNewUser = ({ createdAt, lastLoginAt }: MetaData) => {
  // return createdAt, lastLoginAt;
};

export const getPublicUser = async (uid: string) => {
  const raw = await getDoc(doc(db, 'users', uid));
  return { uid, ...raw.data() };
};
export const getPrivateUser = async (uid: string) => {
  const raw = await getDoc(doc(db, 'users', uid, 'private', 'profile'));
  return { ...raw.data() };
};

export const getUser = async (uid: string) => {
  const [publicData, privateData] = await Promise.all([
    await getPublicUser(uid),
    await getPrivateUser(uid),
  ]);
  return { ...publicData, ...privateData };
};

export const updatePublicUser = async (public_data: Public_data) => {
  const user = getAuth(app).currentUser;
  return user ? setDoc(doc(db, 'users', user.uid), { ...public_data }, { merge: true }) : null;
};

export const updatePrivateUser = async ({ seen, clicked }: Private_data) => {
  const user = getAuth(app).currentUser;
  return user
    ? setDoc(
        doc(db, 'users', user?.uid, 'private', 'profile'),
        { seen: increment(seen ? 1 : 0), clicked: increment(clicked ? 1 : 0) },
        { merge: true }
      )
    : null;
};

export const AddToUserThumbnails = (thumbId: string) => {
  const user = getAuth(app).currentUser;
  return user
    ? setDoc(doc(db, 'users', user?.uid), { thumbnails: arrayUnion(thumbId) }, { merge: true })
    : null;
};

export const getThumbnailsFromIds = async (thumbnails: string[]) => {
  const raw = await Promise.all(thumbnails.map((id) => getDoc(doc(db, 'thumbnails', id))));
  return transformToThumbNails(raw);
};

const transformToThumbNails = (
  docs: QueryDocumentSnapshot<DocumentData>[] | DocumentSnapshot<DocumentData>[]
) => {
  return docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    at: doc.data()?.at.toMillis(),
  })) as ThumbNail[];
};

export const FisherYatesRandomize = (thumbnails: ThumbNail[]) => {
  // Learn more https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
  for (let i = thumbnails.length - 1; i > 0; i--) {
    const j = Math.round(Math.random() * i);
    [thumbnails[i], thumbnails[j]] = [thumbnails[j], thumbnails[i]];
  }
  return thumbnails;
};

export function shuffleThumbs (thumbnails: ThumbNail[]) {
  const len = thumbnails.length;
  const shuffle = [...FisherYatesRandomize(thumbnails), ...FisherYatesRandomize(thumbnails)]; // shuffle and merge
  if (shuffle[len].id === shuffle[len - 1].id) {
    shuffle[len] = shuffle[2]; // handle the case where the end of the first array is equal to the start of the second array
  }
  return shuffle;
}

export interface ThumbNail {
  id: string;
  at: number;
  yt_link: string;
  descr?: string;
  by?: string;
  pt: number;
  seen: number;
}

export enum TFType {
  RANK = 'RANK',
  NORM = 'NORM',
}

export interface FetchThumbnails {
  type: TFType;
  LIMIT?: number;
}

export interface Public_data {
  uid?: string;
  email?: string;
  username?: string;
  photoUrl?: string;
  thumbnails?: string[];
}

export interface Private_data {
  email?: string;
  seen?: boolean;
  clicked?: boolean;
}

export type UserData = Public_data & Private_data;

export interface MetaData {
  createdAt: string;
  lastLoginAt: string;
}
