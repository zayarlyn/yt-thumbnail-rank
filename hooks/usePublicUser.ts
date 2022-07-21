import { useState, useEffect } from 'react';
import type { PublicData } from '../lib/firestoreUtils';
import { getPublicUser } from '../lib/firestoreUtils';

const usePublicUser = ({ uid }: { uid: string }) => {
  const [data, setData] = useState<PublicData | null>(null);

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const data = await getPublicUser(uid);
      setData(data);
    })();
  }, [uid]);

  return data;
};

export default usePublicUser;
