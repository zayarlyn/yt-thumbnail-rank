import { useState, useReducer } from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Thumbnail from '../components/Thumbnail';

const thumbnails = [
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
      return { left: next, right, next: next + 1 };
    case 'RIGHT':
      return { left, right: next, next: next + 1 };
    default:
      return { left, right, next };
  }
};

const Home: NextPage = () => {
  const [{ left, right, next }, dispatch] = useReducer(indiceReducer, {
    left: 0,
    right: 1,
    next: 2,
  });

  return (
    <Box display='flex' flexDir='column' alignItems='center' mt={6}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {next >= 7 ? (
        <>
          <Heading fontSize='3xl'>Which one draw your attention?</Heading>

          <Grid as='main' rowGap={12} mt={6}>
            <Thumbnail
              active
              dispatch={dispatch}
              type={IndiceActionType.LEFT}
              url={thumbnails[left]}
            />
            <Thumbnail
              active
              dispatch={dispatch}
              type={IndiceActionType.RIGHT}
              url={thumbnails[right]}
            />
          </Grid>
        </>
      ) : (
        <Text w='40vh' mt='30vh' textAlign='center'>
          no more new thumbnails for now. <button>submit</button> your own or touch some grass
        </Text>
      )}
    </Box>
  );
};

export default Home;
//'https://img.youtube.com/vi/Zmjjx7n5toY/hqdefault.jpg'
