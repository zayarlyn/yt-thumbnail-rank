import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { A, T } from '../pages';
import { incrementThumb, parseLinkWithFallback, updatePrivateUser } from '../lib/firebaseUtils';

interface Props {
  id?: string;
  v_link: string;
  active?: boolean;
  dispatch?: React.Dispatch<A>;
  type?: T;
}

const Thumbnail: React.FC<Props> = ({ id, v_link, active, dispatch, type }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    setSrc(parseLinkWithFallback(v_link));
    // record view count
    if (!id || !active) return;
    Promise.all([updatePrivateUser({ seen: true }), incrementThumb(id)]);
  }, [v_link]);

  const handleClick = async () => {
    // record click count
    if (!type || !dispatch || !id) return;
    dispatch({ type });
    await Promise.all([incrementThumb(id, true), updatePrivateUser({ clicked: true })]);
  };

  // const handleError = () => {
  //   setSrc(parseLinkWithFallback(v_link, true));
  // };

  return (
    <AspectRatio
      as={motion.div}
      ratio={16 / 9}
      w='full'
      cursor={active ? 'pointer' : ''}
      border='3px solid'
      position='relative'
      transitionDuration='.3'
      initial={{ scale: 0.9 }}
      animate={{ scale: 1, transition: { duration: 0.3 } }}
      whileHover={{ scale: active ? 1.04 : 1 }}
      whileTap={{ scale: active ? 0.95 : 1 }}
    >
      {src ? (
        <Image
          priority
          onClick={handleClick}
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
