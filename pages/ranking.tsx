import { Box, Grid } from '@chakra-ui/react';
import { fetchThumbnails, TFType, ThumbNail } from '../firebaseUtils';
import { NextPage } from 'next';
import ThumbNailStats from '../components/ThumbNailStats';
import useUserData from '../hooks/useUserData';

const ranking: NextPage<{ rankings: ThumbNail[] }> = ({ rankings }) => {
  return (
    <Box
      display='flex'
      flexDir='column'
      alignItems='center'
      h='calc(100vh - 60px)'
      overflowY='scroll'
    >
      <Box w='min(90%, 27rem)' py={4} fontSize='lg'>
        <span>Top</span>
        <select className='mx-2 w-14 px-1'>
          {[5, 10, 15].map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
        <span>thumbnail</span>
      </Box>
      <Grid
        as='main'
        maxW={['27rem', '27rem', 'none']}
        w={['90%', '90%', '41rem', '47rem']}
        flexGrow={1}
        fontSize='lg'
        rowGap={16}
        mb={20}
      >
        {rankings.map((thumbnail, i) => (
          <ThumbNailStats key={thumbnail.id} {...thumbnail} idx={i} />
        ))}
      </Grid>
    </Box>
  );
};

export default ranking;

export async function getServerSideProps() {
  const rankings = await fetchThumbnails({ type: TFType.RANK });
  return { props: { rankings } };
}
