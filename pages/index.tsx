import { useReducer } from 'react';
import type { NextPage } from 'next';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { fetchThumbnails, ThumbNail, parseVideoId, TFType, FisherYatesRandomize } from '../lib/firebaseUtils';
import Thumbnail from '../components/Thumbnail';

export enum IndiceActionType {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface State {
  left: number;
  right: number;
  next: number;
}

export interface IndiceAction {
  type: IndiceActionType;
}

const indiceReducer = ({ left, right, next }: State, action: IndiceAction) => {
  switch (action.type) {
    case 'LEFT':
      return { left, right: next, next: next + 1 };
    case 'RIGHT':
      return { left: next, right, next: next + 1 };
    default:
      return { left, right, next };
  }
};

const Home: NextPage<{ thumbnails: ThumbNail[] }> = ({ thumbnails }) => {
  const [{ left, right, next }, dispatch] = useReducer(indiceReducer, {
    left: 0,
    right: 1,
    next: 2,
  });

  return null;
  return (
    <Box display='grid' h='calc(100vh - 6rem)' flexDir='column' placeItems='center'>
      <Head>
        <title>yt thumb</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {next <= thumbnails.length ? (
        <Box as='main' w='full' maxW={['25rem', '25rem', '77rem']} mt={{sm: 6, md: 4}} mb={{lg: 20}} px={4}>
          <Heading textAlign='center' fontSize={{sm: '2xl', md: '3xl'}}>
            Which one draw your attention?
          </Heading>
          <Flex flexDir={['column', 'column', 'row']} columnGap='min(5vw, 3rem)' rowGap={12} mt={[8, 8, 16]} mb={4}>
            {[
              { dir: left, type: IndiceActionType.LEFT },
              { dir: right, type: IndiceActionType.RIGHT },
            ].map(({ dir, type }) => (
              <Thumbnail
              key={dir}
                active
                id={thumbnails[dir].id}
                dispatch={dispatch}
                type={type}
                v_link={thumbnails[dir].yt_link}
              />
            ))}
          </Flex>
        </Box>
      ) : (
        <Text w='40vh' textAlign='center'>
          No more thumbnails for now. <button>submit</button> your own or touch some grass
        </Text>
      )}
    </Box>
  );
};

export default Home;

export async function getServerSideProps() {
  const thumbnails = await fetchThumbnails({ type: TFType.NORM });
  return { props: { thumbnails: FisherYatesRandomize(thumbnails) } };
}
