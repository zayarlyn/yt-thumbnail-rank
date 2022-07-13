import { useState, useEffect } from 'react';
import { getPrivateUser, getPublicUser } from '../firebaseUtils';

interface USER {
  username: string;
  clicked?: number;
  seen?: number;
  uid?: string
}

const useUserData = ({ PRIVATE, uid }: { PRIVATE?: boolean; uid: string }) => {
  const [data, setData] = useState<USER | null>(null);
  useEffect(() => {
    (async () => {
      const [Public, Private] = await Promise.all([
        getPublicUser(uid),
        PRIVATE ? getPrivateUser(uid) : [],
      ]);
      setData({ ...Public, ...Private } as USER);
    })();
  }, []);
  return data;
};

export default useUserData;
