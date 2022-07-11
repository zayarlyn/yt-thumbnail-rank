import { useState, useReducer } from 'react';
import type { NextPage } from 'next';
import { AppInitialProps } from 'next/app';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { fetchThumbnails, ThumbNail, parseVideoId, TFType } from '../firebaseUtils';
import Thumbnail from '../components/Thumbnail';

const THUMBNAILS = [
  '/thumb-1.jpg',
  '/thumb-2.jpg',
  '/thumb-3.jpg',
  '/thumb-4.jpg',
  '/thumb-5.jpg',
  '/thumb-6.jpg',
  '/thumb-7.jpg',
];

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
    <Box display='flex' flexDir='column' alignItems='center' mt={6}>
      <Head>
        <title>yt thumb</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {next <= thumbnails.length ? (
        <Box as='main' w='min(35rem, 90%)' mt={8} px={4}>
          <Heading fontSize='2xl'>Which one draw your attention?</Heading>
          <Grid flexGrow={1} rowGap={12} mt={12}>
            {[
              { dir: left, type: IndiceActionType.LEFT },
              { dir: right, type: IndiceActionType.RIGHT },
            ].map(({ dir, type }) => (
              <Thumbnail
                active
                id={thumbnails[dir].id}
                dispatch={dispatch}
                type={type}
                v_link={thumbnails[dir].yt_link}
              />
            ))}
          </Grid>
        </Box>
      ) : (
        <Text w='40vh' mt='30vh' textAlign='center'>
          No more thumbnails for now. <button>submit</button> your own or touch some grass
        </Text>
      )}
    </Box>
  );
};

export default Home;
//'https://img.youtube.com/vi/Zmjjx7n5toY/hqdefault.jpg'

export async function getServerSideProps() {
  const thumbnails = await fetchThumbnails({ type: TFType.NORM });
  return { props: { thumbnails } };
}
