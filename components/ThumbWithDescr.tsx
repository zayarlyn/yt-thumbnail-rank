import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Thumbnail from './Thumbnail';
import { updateClickcountOfThumbsAndUser } from '../lib/firestoreUtils';

interface Props {
  thumb_id: string;
  yt_link: string;
  descr?: string;
  onClick: () => void;
}
const ThumbWithDescr = ({ thumb_id, yt_link, descr, onClick }: Props) => {
  const [imgIsLoaded, setImgIsLoaded] = useState(false);

  useEffect(() => setImgIsLoaded(false), [thumb_id]);

  const handleClick = async () => {
    if (!imgIsLoaded) return;
    onClick();
    updateClickcountOfThumbsAndUser({thumb_id});
  };

  return (
    <Box
      onClick={handleClick}
      as={motion.div}
      w={{ lg: '45%' }}
      cursor={imgIsLoaded ? 'pointer' : 'not-allowed'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.975 }}
    >
      <Thumbnail yt_link={yt_link} isLoaded={setImgIsLoaded} />
      {descr ? (
        <Text mt={3} fontSize='lg' noOfLines={2}>
          {descr}
        </Text>
      ) : null}
    </Box>
  );
};

export default ThumbWithDescr;
