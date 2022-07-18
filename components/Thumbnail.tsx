import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { parseLinkWithFallback } from '../lib/firebaseUtils';

interface Props {
  yt_link: string;
}

const Thumbnail: React.FC<Props> = ({ yt_link }) => {
  const [src, setSrc] = useState(parseLinkWithFallback(yt_link));

  useEffect(() => {
    setSrc(parseLinkWithFallback(yt_link));
    // record view count
    // if (!id || !active) return;
    // Promise.all([updatePrivateUser({ seen: true }), incrementThumb(id)]);
  }, [yt_link]);


  // const handleError = () => {
  //   setSrc(parseLinkWithFallback(v_link, true));
  // };

  return (
    <AspectRatio
      as={motion.div}
      ratio={16 / 9}
      w='full'
      // cursor={active ? 'pointer' : ''}
      border='1px solid'
      position='relative'
      transitionDuration='.3'
      // initial={{ scale: 0.9 }}
      // animate={{ scale: 1, transition: { duration: 0.3 } }}
      // whileHover={{ scale: active ? 1.04 : 1 }}
      // whileTap={{ scale: active ? 0.95 : 1 }}
    >
      {src ? (
        <Image
          priority
          // onClick={handleClick}
          // onError={handleError}
          src={src}
          layout='fill'
          objectFit='cover'
          draggable={false}
        />
      ) : (
        <></>
      )}
    </AspectRatio>
  );
};

export default Thumbnail;
