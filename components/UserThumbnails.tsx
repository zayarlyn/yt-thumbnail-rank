import { Box, Text} from '@chakra-ui/react';
import useThumbnailsFromIds from '../hooks/useThumbnailsFromIds';
import ThumbnailList from './ThumbnailList';

const UserThumbnails = ({ thumbIds }: { thumbIds: string[] }) => {
  const userThumbs = useThumbnailsFromIds(thumbIds);
  // console.log(thumbIds, userThumbs);

  return (
    <Box mt={8}>
      <Text fontSize='xl' mb={8}>Uploaded thumbnails</Text>
      {userThumbs ? <ThumbnailList thumbnails={userThumbs} /> : null}
    </Box>
  );
};

export default UserThumbnails;
