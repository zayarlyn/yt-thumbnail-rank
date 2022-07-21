import { useState, useEffect } from 'react';
import { getThumbnailsFromIds, ThumbNail } from '../lib/firestoreUtils';

const useThumbnailsFromIds = (ids?: string[]) => {
  const [thumbnails, setThumbnails] = useState<ThumbNail[]|null>(null);
  useEffect(() => {
    if (!ids) return;
    (async () => {
      const data = await getThumbnailsFromIds(ids);
      setThumbnails(data);
    })();
  }, [ids]);
  return thumbnails;
};

export default useThumbnailsFromIds;
