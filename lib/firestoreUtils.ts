import {
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  doc,
  increment,
  query,
  collection,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import type { QueryDocumentSnapshot, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db, app } from '../firebaseconfig';

// main functions
export async function updateViewcountOfThumbsAndUser({ thumb1_id, thumb2_id }: UVOTAU) {
  return await Promise.all([
    incrementThumb({ id: thumb1_id, clicked: false }), // thumbanail 1
    incrementThumb({ id: thumb2_id, clicked: false }), // thumbnail 2
    incrementUser({ clicked: false }), // logged user
  ]);
}

export async function updateClickcountOfThumbsAndUser({ thumb_id }: { thumb_id: string }) {
  return await Promise.all([
    incrementThumb({ id: thumb_id, clicked: true }), // clicked thumbnail
    incrementUser({ clicked: true }), // logged user
  ]);
}

export async function fetchThumbnails(config: FT) {
  const raw = await getDocs(querytoFetchThumbs(config));
  return transformToThumbNails(raw.docs);
}

export async function uploadThumbnail(thumb_data: UT) {
  return addDoc(collection(db, 'thumbnails'), thumbDataToUpload(thumb_data));
}

export async function recordUploadedThumbInUser(thumbId: string) {
  const user = getUserAuth();
  return user
    ? setDoc(doc(db, 'users', user?.uid), { thumbnails: arrayUnion(thumbId) }, { merge: true })
    : null;
}

export async function getThumbnailsFromIds(thumbIds: string[]) {
  const raw = await Promise.all(thumbIds.map((id) => getDoc(doc(db, 'thumbnails', id))));
  return transformToThumbNails(raw);
}

export function shuffleThumbnails(thumbnails: ThumbNail[]) {
  const len = thumbnails.length;
  const shuffle = [...FisherYatesRandomize(thumbnails), ...FisherYatesRandomize(thumbnails)]; // shuffle and merge
  if (shuffle[len].id === shuffle[len - 1].id) {
    shuffle[len] = shuffle[2]; // handle the case where the end of the first array is equal to the start of the second array
  }
  return shuffle;
}

export async function getUserDetails(uid: string) {
  const [publicData, privateData] = await Promise.all([
    await getPublicUser(uid),
    await getPrivateUser(uid),
  ]);
  return { ...publicData, ...privateData } as UserDetails;
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

const incrementUser = async ({ clicked }: { clicked: boolean }) => {
  const user = getUserAuth();
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

const thumbDataToUpload = ({ yt_link, descr }: UT) => {
  const user = getUserAuth();
  return {
    ...(user && { by: user.uid }),
    ...(descr && { descr }),
    at: serverTimestamp(),
    yt_link,
    seen: 0,
    pt: 0,
  };
};

const FisherYatesRandomize = (thumbnails: ThumbNail[]) => {
  // Learn more https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
  for (let i = thumbnails.length - 1; i > 0; i--) {
    const j = Math.round(Math.random() * i);
    [thumbnails[i], thumbnails[j]] = [thumbnails[j], thumbnails[i]];
  }
  return thumbnails;
};
const getUserAuth = () => getAuth(app).currentUser;

export const getPublicUser = async (uid: string) => {
  const raw = await getDoc(doc(db, 'users', uid));
  return { uid, ...raw.data() } as PublicData;
};

export const getPrivateUser = async (uid: string) => {
  const raw = await getDoc(doc(db, 'users', uid, 'private', 'profile'));
  return { ...raw.data() };
};

export const updatePublicUser = async (data: {[key: string]: string}) => {
  return setDoc(doc(db, 'users', getUserAuth()!.uid), data, { merge: true });
};

export const updatePrivateUser = async (data: UPU) => {
  return setDoc(doc(db, 'users', getUserAuth()!.uid, 'private', 'profile'), data, { merge: true });
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

type UT = { yt_link: string; descr?: string };

// helper types
type UPU = {
  email?: string;
};

export type ThumbNail = {
  id: string;
  at: number;
  yt_link: string;
  descr?: string;
  by?: string;
  pt: number;
  seen: number;
};

export interface PublicData {
  uid: string;
  username: string;
  photoUrl?: string;
  thumbnails?: string[];
}

export interface UserDetails {
  uid: string;
  username: string;
  photoUrl?: string;
  thumbnails?: string[];
  email: string;
  seen: number;
  clicked: number;
}
