import { useState, useEffect } from 'react';
import { getPrivateUser, getPublicUser } from '../lib/firebaseUtils';

export interface UserData {
  username: string;
  thumbnails: string [];
  clicked?: number;
  seen?: number;
  uid?: string
}

const useUserData = ({ PRIVATE, uid }: { PRIVATE?: boolean; uid?: string }) => {
  const [data, setData] = useState<UserData | null>(null);
  
  useEffect(() => {
    if (!uid) return;
    (async () => {
      const [Public, Private] = await Promise.all([
        getPublicUser(uid),
        PRIVATE ? getPrivateUser(uid) : [],
      ]);
      setData({ ...Public, ...Private } as UserData);
    })();
  }, [uid]);
  return data;
};

export default useUserData;
