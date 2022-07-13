import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';
import React from 'react';
import { IndiceAction, IndiceActionType } from '../pages';
import {
  incrementThumb,
  parseLinkWithFallback,
  parseVideoId,
  updatePrivateUser,
} from '../firebaseUtils';

interface Props {
  id?: string;
  v_link: string;
  active?: boolean;
  dispatch?: React.Dispatch<IndiceAction>;
  type?: IndiceActionType;
}

const Thumbnail: React.FC<Props> = ({ id, v_link, active, dispatch, type }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    setSrc(parseLinkWithFallback(v_link));
    // record view count
    if (!id || !active) return;
    updatePrivateUser({ seen: true });
    // incrementThumb(id);
  }, [v_link]);

  const handleClick = async () => {
    // record click count
    if (!type || !dispatch || !id) return;
    dispatch({ type });
    await Promise.all([incrementThumb(id, true), updatePrivateUser({ clicked: true })]);
  };

  const handleError = () => {
    setSrc(parseLinkWithFallback(v_link, true));
  };

  return (
    <AspectRatio
      w='full'
      cursor={active ? 'pointer' : ''}
      border='3px solid'
      position='relative'
      transitionDuration='300ms'
      _hover={{ transform: active ? 'scale(1.05)' : '' }}
      _active={{ transform: active ? 'scale(.95)' : '' }}
      ratio={16 / 9}
    >
      {src ? (
        <Image
          onClick={handleClick}
          onError={handleError}
          src={src}
          layout='fill'
          objectFit='cover'
        />
      ) : (
        <></>
      )}
    </AspectRatio>
  );
};

export default Thumbnail;
