import { useState, useEffect } from 'react';
import { getPrivateUser, getPublicUser, Public_data, Private_data, UserData } from '../lib/firebaseUtils';

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
