import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';
import React from 'react';
import { IndiceAction, IndiceActionType } from '../pages';

interface ThumbNail {
  url: string;
  active?: boolean;
  dispatch?: React.Dispatch<IndiceAction>;
  type?: IndiceActionType;
}

const Thumbnail = ({ url, active, dispatch, type }: ThumbNail) => {
  console.log(url);

  return (
    <AspectRatio
      w='60vh'
      cursor='pointer'
      outline='3px solid'
      position='relative'
      transitionDuration='300ms'
      _hover={{ transform: active ? 'scale(1.05)' : '' }}
      _active={{ transform: active ? 'scale(.95)' : '' }}
      ratio={16 / 9}
    >
      <Image
        onClick={() => type && dispatch?.({ type })}
        src={url}
        layout='fill'
        objectFit='cover'
      />
    </AspectRatio>
  );
};

export default Thumbnail;
