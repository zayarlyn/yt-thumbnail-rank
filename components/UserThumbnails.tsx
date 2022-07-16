import { Box, Text } from '@chakra-ui/react';
import useThumbnailsFromIds from '../hooks/useThumbnailsFromIds';
import ThumbnailList from './ThumbnailList';
interface Props {
  thumbIds?: string[];
  isPrivate?: boolean;
}
const UserThumbnails: React.FC<Props> = ({ thumbIds, isPrivate }) => {
  const userThumbs = useThumbnailsFromIds(thumbIds);
  // console.log(thumbIds, userThumbs);

  return (
    <Box mt={8}>
      <Text fontSize='xl' mb={8}>
        Uploaded thumbnails
      </Text>
      {userThumbs ? <ThumbnailList isProfile thumbnails={userThumbs} /> : null}
    </Box>
  );
};

export default UserThumbnails;
