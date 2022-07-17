import { Box, Progress, Text } from '@chakra-ui/react';
import useThumbnailsFromIds from '../hooks/useThumbnailsFromIds';
import ThumbnailList from './ThumbnailList';
interface Props {
  thumbIds?: string[];
  isPrivate?: boolean;
}
const UserThumbnails: React.FC<Props> = ({ thumbIds }) => {
  const userThumbs = useThumbnailsFromIds(thumbIds);

  return (
    <Box mt={8}>
      <Text fontSize='xl' mb={8}>
        Uploaded thumbnails
      </Text>
      {!thumbIds ? (
        <Text my={8} textAlign='center' textColor='gray.600'>
          no uploaded thumbnails
        </Text>
      ) : userThumbs ? (
        <ThumbnailList isProfile thumbnails={userThumbs} />
      ) : (
        <Progress mt={20} borderRadius='sm' colorScheme='cyan' mx='auto' width='min(90%, 12rem)' size='xs' isIndeterminate />
      )}
    </Box>
  );
};

export default UserThumbnails;
