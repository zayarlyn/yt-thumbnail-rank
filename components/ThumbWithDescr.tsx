import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Thumbnail from './Thumbnail';

interface Props {
  thumb_id: string;
  yt_link: string;
  descr?: string;
  onClick: () => void;
}
const ThumbWithDescr = ({ thumb_id, yt_link, descr, onClick }: Props) => {
  const handleClick = async () => {
    onClick();
    // record click count
    // if (!type || !dispatch || !thumb_id) return;
    // dispatch({ type });
    // await Promise.all([incrementThumb(id, true), updatePrivateUser({ clicked: true })]);
  };

  return (
    <Box
      onClick={handleClick}
      as={motion.div}
      w={{ lg: '45%' }}
      cursor='pointer'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.975 }}
    >
      <Thumbnail yt_link={yt_link} />
      {descr ? (
        <Text mt={3} fontSize='lg' noOfLines={2}>
          {descr}
        </Text>
      ) : null}
    </Box>
  );
};

export default ThumbWithDescr;
