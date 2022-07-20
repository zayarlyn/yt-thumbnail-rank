import {
  setDoc,
  getDocs,
  doc,
  increment,
  query,
  collection,
  orderBy,
  limit,
} from 'firebase/firestore';
import type { QueryDocumentSnapshot, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '../firebaseconfig';

// main functions
export async function updateViewcountOfThumbsAndUsers({ user, id1, id2 }: UVOTAU) {
  return await Promise.all([
    // incrementThumb({ id: id1, clicked: false }), // thumbanail 1
    // incrementThumb({ id: id2, clicked: false }), // thumbnail 2
    // updatePrivateUser({ user, clicked: false }), // logged user
  ]);
}

export async function fetchThumbnails(config: FT) {
  const raw = await getDocs(querytoFetchThumbs(config));
  return transformToThumbNails(raw.docs);
}

// helper functions
const transformToThumbNails = (docs: TTT) => {
  return docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    at: doc.data()?.at.toMillis(),
  })) as ThumbNail[];
};

const incrementThumb = async ({ id, clicked }: { id: string; clicked: boolean }) => {
  return setDoc(
    doc(db, 'thumbnails', id),
    // { seen: 0 },
    { seen: increment(clicked ? 0 : 1), pt: increment(clicked ? 1 : 0) },
    { merge: true }
  );
};

const updatePrivateUser = async ({ user, clicked }: UPU) => {
  if (!user) return null; // cancal update if the user isn't logged in
  return setDoc(
    doc(db, 'users', user.uid, 'private', 'profile'),
    { seen: increment(clicked ? 0 : 2), clicked: increment(clicked ? 1 : 0) },
    { merge: true }
  );
};

const querytoFetchThumbs = ({ type, LIMIT }: FT) => {
  return type === 'RANK'
    ? query(
        collection(db, 'thumbnails'),
        orderBy('pt', 'desc'),
        orderBy('seen', 'desc'),
        limit(LIMIT ?? 5)
      )
    : query(collection(db, 'thumbnails'), orderBy('at', 'desc'));
};

// main types
type FT = {
  type: string;
  LIMIT?: number;
}

type TTT = QueryDocumentSnapshot<DocumentData>[] | DocumentSnapshot<DocumentData>[];

type UVOTAU = {
  user: User | null;
  id1: string;
  id2: string;
};

// helper types
type UPU = {
  user: User | null;
  clicked: boolean;
};

export type ThumbNail = {
  id: string;
  at: number;
  yt_link: string;
  descr?: string;
  by?: string;
  pt: number;
  seen: number;
}
