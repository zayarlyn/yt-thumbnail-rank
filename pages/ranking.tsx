import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Thumbnail from '../components/Thumbnail';

const videos = [
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    charisma: 2340,
    video_url: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    owner_id: 'mira yoshi',
  },
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    charisma: 2340,
    video_url: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    owner_id: 'mira yoshi',
  },
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    charisma: 2340,
    video_url: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    owner_id: 'mira yoshi',
  },
];

const ranking = () => {
  return (
    <Box
      display='flex'
      flexDir='column'
      alignItems='center'
      h='calc(100vh - 60px)'
      overflowY='scroll'
    >
      <Box w='60vh' py={4} fontSize='lg'>
        <span>Top</span>
        <select className='mx-2 w-14 px-1'>
          {[5, 10, 15].map((i) => (
            <option>{i}</option>
          ))}
        </select>
        <span>thumbnail</span>
      </Box>
      <Grid as='main' flexGrow={1} fontSize='lg' rowGap={8}>
        {videos.map(({ url, charisma, video_url, owner_id }, i) => (
          <GridItem position='relative'>
            <Thumbnail url={url} />
            <ul className='pb-2 pt-5'>
              <li>
                charisma: <span className='font-semibold'>{charisma}</span>
              </li>
              <li>
                submitted by <span className='font-semibold text-primary'>{owner_id}</span>
              </li>
            </ul>
            <Box
              w={16}
              h={16}
              top={0}
              right={0}
              fontSize='4xl'
              display='grid'
              placeItems='center'
              position='absolute'
              shadow='lg'
              bgColor='white'
            >
              <span>{i + 1}</span>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ranking;
