import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { parseLinkWithFallback } from '../lib/firebaseUtils';

interface Props {
  yt_link: string;
  isLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const Thumbnail: React.FC<Props> = ({ yt_link, isLoaded }) => {
  const [src, setSrc] = useState(parseLinkWithFallback(yt_link));

  useEffect(() => setSrc(parseLinkWithFallback(yt_link)), [yt_link]);

  return (
    <AspectRatio
      as={motion.div}
      ratio={16 / 9}
      w='full'
      border='1px solid'
      position='relative'
      transitionDuration='.3'
    >
      {src ? (
        <Image
          priority
          onLoadingComplete={() => isLoaded(true)}
          src={src}
          layout='fill'
          objectFit='cover'
          draggable={false}
        />
      ) : null}
    </AspectRatio>
  );
};

export default Thumbnail;
