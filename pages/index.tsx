import { useState, useReducer } from 'react';
import type { NextPage } from 'next';
import { AppInitialProps } from 'next/app';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { fetchThumbnails, ThumbNail, parseVideoId } from '../firebaseUtils';
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
  console.log('pop', thumbnails);
  const [{ left, right, next }, dispatch] = useReducer(indiceReducer, {
    left: 0,
    right: 1,
    next: 2,
  });

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
            <Thumbnail
              active
              id={thumbnails[left].id}
              dispatch={dispatch}
              type={IndiceActionType.LEFT}
              url={`https://img.youtube.com/vi/${parseVideoId(thumbnails[left].yt_link)}/maxresdefault.jpg`}
            />
            <Thumbnail
              active
              id={thumbnails[right].id}
              dispatch={dispatch}
              type={IndiceActionType.RIGHT}
              url={`https://img.youtube.com/vi/${parseVideoId(thumbnails[right].yt_link)}/maxresdefault.jpg`}
            />
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
  const thumbnails = await fetchThumbnails();
  return { props: { thumbnails } };
}
