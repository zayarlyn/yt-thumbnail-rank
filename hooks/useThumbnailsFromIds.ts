import { useState, useEffect } from 'react';
import { getThumbnailsFromIds, ThumbNail } from '../lib/firebaseUtils';

const useThumbnailsFromIds = (ids: string[]) => {
  const [thumbnails, setThumbnails] = useState<ThumbNail[]>();
  useEffect(() => {
    (async () => {
      const data = await getThumbnailsFromIds(ids);
      setThumbnails([...data as ThumbNail[]]);
    })();
  }, []);
  return thumbnails;
};

export default useThumbnailsFromIds;
