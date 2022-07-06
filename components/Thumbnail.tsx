import { useState } from 'react';
import Image from 'next/image';

const cn = (...classes: string[]) => {
  return classes.join(' ');
};

const Thumbnail = ({ url, active }: { url: string; active?: boolean }) => {
  const [points, setPoints] = useState(0);

  return (
    <div
      className={cn(
        'relative aspect-video w-[60vh] outline duration-300',
        active ? 'hover:scale-110 active:scale-100' : ''
      )}
    >
      <Image src={url} layout='fill' objectFit='cover' />
    </div>
  );
};

export default Thumbnail;
