import { useState, useEffect } from 'react';
import { getPublicUser } from '../firebaseUtils';

interface Public {
  username: string;
}

const useUserData = ({ PRIVATE }: { PRIVATE?: boolean }) => {
  const [data, setData] = useState<Public|null>(null);
  useEffect(() => {
    (async () => {
      const res = await getPublicUser('u0B7XAIUSHUUg1pWqLW1atuyv2w2');
      setData(res as Public)
    })();
  }, []);
  return data;
};

export default useUserData;
