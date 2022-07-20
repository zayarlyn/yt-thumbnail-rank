import Head from 'next/head';
import type { InferGetServerSidePropsType } from 'next';
import { useState, useMemo, useEffect } from 'react';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { AuthStoreType, useAuthStore } from '../store/auth';
import { shuffleThumbs } from '../lib/firebaseUtils';
import { updateViewcountOfThumbsAndUsers, fetchThumbnails } from '../lib/firestoreUtils';
import ThumbWithDescr from '../components/ThumbWithDescr';

const Home = ({ raw_thumbs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuthStore() as AuthStoreType;
  const thumbnails = useMemo(() => shuffleThumbs(raw_thumbs), []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (user === undefined || idx === thumbnails.length) return;
    updateViewcountOfThumbsAndUsers({ user, id1: thumbnails[idx].id, id2: thumbnails[idx + 1].id });
  }, [idx, user]);

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
        <title>yt thumbnail rank</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {user === undefined ? null : idx < thumbnails.length ? (
        <Box as='main' w='full' maxW={['25rem', '25rem', '77rem']} mb={{ lg: 20 }} mx='auto' px={4}>
          <Heading textAlign='center' fontSize={{ sm: '2xl', md: '3xl' }}>
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
                  onClick={handleThumbClick}
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

export async function getServerSideProps() {
  const raw_thumbs = await fetchThumbnails({ type: 'NORM' });
  return { props: { raw_thumbs } };
}
