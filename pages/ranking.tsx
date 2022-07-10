import { Box, Grid } from '@chakra-ui/react';
import { fetchThumbnails, TFType, ThumbNail } from '../firebaseUtils';
import { NextPage } from 'next';
import ThumbNailStats from '../components/ThumbNailStats';

const videos = [
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    pt: 20,
    view: 23,
    yt_link: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    by: 'mira yoshi',
    at: 2327439493489,
  },
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    pt: 4,
    view: 34,
    yt_link: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    by: 'mira yoshi',
    at: 58490398,
  },
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    pt: 3,
    view: 34,
    yt_link: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    by: 'mira yoshi',
    at: 95845847,
  },
];

const ranking: NextPage<{ rankings: ThumbNail[] }> = ({ rankings }) => {
  return (
    <Box
      display='flex'
      flexDir='column'
      alignItems='center'
      h='calc(100vh - 60px)'
      overflowY='scroll'
    >
      <Box w='90%' py={4} fontSize='lg'>
        <span>Top</span>
        <select className='mx-2 w-14 px-1'>
          {[5, 10, 15].map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
        <span>thumbnail</span>
      </Box>
      <Grid as='main' w='90%' flexGrow={1} fontSize='lg' rowGap={16} mb={20}>
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
