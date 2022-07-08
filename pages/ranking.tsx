import {
  Box,
  Grid,
  GridItem,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  StatArrow,
  StatUpArrow,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { StarIcon, TriangleUpIcon, ViewIcon } from '@chakra-ui/icons';
import Thumbnail from '../components/Thumbnail';
import { fetchThumbnails, TFType, ThumbNail } from '../firebaseUtils';
import { NextPage } from 'next';

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
            <option>{i}</option>
          ))}
        </select>
        <span>thumbnail</span>
      </Box>
      <Grid as='main' w='90%' flexGrow={1} fontSize='lg' rowGap={16}>
        {rankings.map(({ by, at, pt, seen, yt_link }, i) => {
          const d = new Date(at);
          if (!seen || !pt) return null;

          return (
            <GridItem position='relative' borderRadius={5} p={3} borderWidth={1}>
              <Thumbnail v_link={yt_link} />
              <StatGroup className='pb-2 pt-5'>
                <Stat>
                  <StatLabel>
                    Seen <ViewIcon />
                  </StatLabel>
                  <StatNumber>{seen}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>
                    clicked <StarIcon mb={0.8} />
                  </StatLabel>
                  <StatNumber>{pt}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>
                    Rating <StatUpArrow />
                  </StatLabel>
                  <StatNumber>{((pt * 100) / seen).toFixed(2)}%</StatNumber>
                </Stat>
              </StatGroup>
              <Box mt={4} display='flex' justifyContent='space-between'>
                <Text fontSize='sm'>
                  submitted by <span className='font-semibold text-primary'>{'by'}</span>
                </Text>
                <Flex fontSize={12}>
                  <Text>{d.toLocaleDateString()}</Text>
                  <Text fontSize={14} lineHeight={1.1} fontWeight='medium' mx={1.5}>
                    at
                  </Text>
                  <Text>{d.toLocaleTimeString()}</Text>
                </Flex>
              </Box>
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
                bgColor='black'
                color='white'
              >
                <span>{i + 1}</span>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ranking;

export async function getServerSideProps() {
  const rankings = await fetchThumbnails({ type: TFType.RANK });
  return { props: { rankings } };
}
