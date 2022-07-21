import { Grid, Flex, Text, Spinner } from '@chakra-ui/react';
import { ThumbNail } from '../lib/firestoreUtils';
import SpinningLoader from './SpinningLoader';
import ThumbNailStats from './ThumbNailStats';

interface Props {
  thumbnails: ThumbNail[];
  isProfile?: boolean;
}

const ThumbnailList: React.FC<Props> = ({ thumbnails, isProfile }) => {
  return (
    <Grid {...gridProps}>
      {thumbnails.map((thumbnail, i) => (
        <ThumbNailStats isProfile={isProfile} key={thumbnail.id} {...thumbnail} idx={i} />
      ))}
    </Grid>
  );
};

export default ThumbnailList;

const gridProps = {
  flexGrow: 1,
  fontSize: 'lg',
  rowGap: 16,
  mb: 20,
  mx: 'auto',
  maxW: ['27rem', '27rem', 'none'],
  w: ['90%', '90%', '41rem', '47rem'],
};
