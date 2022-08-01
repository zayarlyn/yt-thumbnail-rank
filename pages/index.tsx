import Head from 'next/head';
import type { InferGetServerSidePropsType } from 'next';
import { useState, useMemo, useEffect } from 'react';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../lib/ironSessionConfig';
import {
  fetchThumbnails,
  shuffleThumbnails,
  updateViewcountOfThumbsAndUser,
} from '../lib/firestoreUtils';
import ThumbWithDescr from '../components/ThumbWithDescr';

const Home = ({ user, raw_thumbs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const thumbnails = useMemo(() => shuffleThumbnails(raw_thumbs), []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx === thumbnails.length) return;
    const getId = (n: number) => thumbnails[n].id;
    updateViewcountOfThumbsAndUser({ user, thumb1_id: getId(idx), thumb2_id: getId(idx + 1) });
  }, [idx]);

  // the following is only for hydration, wtf
  const [client, setClient] = useState(false);
  useEffect(() => setClient(true), []);
  if (!client) return null;
  //

  const handleThumbClick = () => {
    setIdx((prev) => prev + 2);
  };

  return (
    <Box display='grid' placeItems='center' h='calc(100vh - 59px)'>
      <Head>
        <title>YTR | playground</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {idx < thumbnails.length ? (
        <Box as='main' w='full' maxW={['25rem', '25rem', '77rem']} mb={20} mx='auto' px={4}>
          <Heading textAlign='center' fontSize={['xl', '2xl', '3xl']}>
            Which one would you watch?
          </Heading>
          <Flex
            flexDir={['column', 'column', 'row']}
            justifyContent='space-between'
            rowGap={12}
            mt={[8, 8, 16]}
            mb={4}
          >
            {[0, 1].map((i) => {
              const { id, yt_link, descr } = thumbnails[idx + i];
              return (
                <ThumbWithDescr
                  handleThumbClick={handleThumbClick}
                  user={user}
                  thumb_id={id}
                  yt_link={yt_link}
                  descr={descr}
                  key={i}
                />
              );
            })}
          </Flex>
        </Box>
      ) : (
        <Text w='40vh' textAlign='center'>
          No more thumbnails for now.
          <Link
            onClick={() => window.open('https://knowyourmeme.com/memes/touch-grass', '_blank')}
            display='block'
            textUnderlineOffset={4}
            fontSize='xl'
            fontWeight='medium'
            mt={3}
            textColor='purple.500'
          >
            touch some grass
          </Link>
        </Text>
      )}
    </Box>
  );
};

export default Home;

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const raw_thumbs = await fetchThumbnails({ type: 'NORM' });
  return { props: { user: req.session.user ?? null, raw_thumbs } };
}, sessionOptions);
