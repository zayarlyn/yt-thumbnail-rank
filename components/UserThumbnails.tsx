import { Box, Progress, Text } from '@chakra-ui/react';
import useThumbnailsFromIds from '../hooks/useThumbnailsFromIds';
import SpinningLoader from './SpinningLoader';
import ThumbnailList from './ThumbnailList';
interface Props {
  thumbIds?: string[];
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
      <SpinningLoader msg='fetching thumbnails' styling={{mt: 12}}/>)}
    </Box>
  );
};

export default UserThumbnails;
