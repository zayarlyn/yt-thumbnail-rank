import { useEffect } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';
import React from 'react';
import { IndiceAction, IndiceActionType } from '../pages';
import { incrementThumb, parseVideoId } from '../firebaseUtils';

interface Props {
  id?: string;
  v_link: string;
  active?: boolean;
  dispatch?: React.Dispatch<IndiceAction>;
  type?: IndiceActionType;
}

const Thumbnail: React.FC<Props> = ({ id, v_link, active, dispatch, type }) => {
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
      <Image onClick={handleClick} src={`https://img.youtube.com/vi/${parseVideoId(v_link)}/maxresdefault.jpg`} layout='fill' objectFit='cover' />
    </AspectRatio>
  );
};

export default Thumbnail;
