import { Grid } from "@chakra-ui/react";
import { ThumbNail } from "../firebaseUtils";
import ThumbNailStats from "./ThumbNailStats";

const ThumbnailList = ({thumbnails}: {thumbnails: ThumbNail[]}) => {
  console.log('thumbnails', thumbnails);
  return (
    <Grid flexGrow={1} fontSize='lg' rowGap={16} mb={20} mx='auto' {...dimension}>
      {thumbnails?.map((thumbnail, i) => (
        <ThumbNailStats key={thumbnail.id} {...thumbnail} idx={i} />
      ))}
    </Grid>
  );
};

export default ThumbnailList;

const dimension = {
  maxW: ['27rem', '27rem', 'none'],
  w: ['90%', '90%', '41rem', '47rem'],
};
