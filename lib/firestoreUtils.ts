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
import { getAuth } from 'firebase/auth';
import type { QueryDocumentSnapshot, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db, app } from '../firebaseconfig';

// main functions
export async function updateViewcountOfThumbsAndUser({ thumb1_id, thumb2_id }: UVOTAU) {
  return await Promise.all([
    incrementThumb({ id: thumb1_id, clicked: false }), // thumbanail 1
    incrementThumb({ id: thumb2_id, clicked: false }), // thumbnail 2
    updatePrivateUser({ clicked: false }), // logged user
  ]);
}

export async function updateClickcountOfThumbsAndUser({ thumb_id }: { thumb_id: string }) {
  return await Promise.all([
    incrementThumb({ id: thumb_id, clicked: true }), // clicked thumbnail
    updatePrivateUser({ clicked: true }), // logged user
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

const updatePrivateUser = async ({ clicked }: { clicked: boolean }) => {
  const user = getAuth(app).currentUser;
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
};

type TTT = QueryDocumentSnapshot<DocumentData>[] | DocumentSnapshot<DocumentData>[];

type UVOTAU = {
  thumb1_id: string;
  thumb2_id: string;
};

// helper types

export type ThumbNail = {
  id: string;
  at: number;
  yt_link: string;
  descr?: string;
  by?: string;
  pt: number;
  seen: number;
};
