import { useEffect } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';
import React from 'react';
import { IndiceAction, IndiceActionType } from '../pages';
import { incrementThumb } from '../firebaseUtils';

interface Props {
  id?: string;
  url: string;
  active?: boolean;
  dispatch?: React.Dispatch<IndiceAction>;
  type?: IndiceActionType;
}

const Thumbnail: React.FC<Props> = ({ id, url, active, dispatch, type }) => {
  useEffect(() => {
    console.log('render', id);
    // useeffect is running twice
    if (!id) return;
    incrementThumb(id);
  }, []);

  const handleClick = () => {
    if (!type || !dispatch || !id) return;
    dispatch({ type });
    incrementThumb(id, true);
  };

  return (
    <AspectRatio
      cursor={active ? 'pointer' : ''}
      border='3px solid'
      position='relative'
      transitionDuration='300ms'
      _hover={{ transform: active ? 'scale(1.05)' : '' }}
      _active={{ transform: active ? 'scale(.95)' : '' }}
      ratio={16 / 9}
    >
      <Image onClick={handleClick} src={url} layout='fill' objectFit='cover' />
    </AspectRatio>
  );
};

export default Thumbnail;
