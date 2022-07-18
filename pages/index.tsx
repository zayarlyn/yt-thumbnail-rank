import { useState } from 'react';
import type { NextPage } from 'next';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { fetchThumbnails, ThumbNail, TFType, FisherYatesRandomize } from '../lib/firebaseUtils';
import ThumbWithDescr from '../components/ThumbWithDescr';

const Home: NextPage<{ thumbnails: ThumbNail[] }> = ({ thumbnails }) => {
  const [index, setIndex] = useState(0);
  console.log(thumbnails);

  const handleThumbClick = () => {
    setIndex((prev) => prev + 2);
  };

  return (
    <Box display='grid' placeItems='center' h='calc(100vh - 59px)'>
      <Head>
        <title>yt thumbnail rank</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {index < thumbnails.length ? (
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
              const { id, yt_link, descr } = thumbnails[index + i];
              return (
                <ThumbWithDescr
                  onClick={handleThumbClick}
                  thumb_id={id}
                  yt_link={yt_link}
                  descr={descr ?? ''}
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
  const data = await fetchThumbnails({ type: TFType.NORM });
  const len = data.length;
  const thumbnails = [...FisherYatesRandomize(data), ...FisherYatesRandomize(data)]; // shuffle and merge
  if (thumbnails[len].id === thumbnails[len - 1].id) {
    console.log('switched');
    thumbnails[len] = thumbnails[2]; // handle the case where the end of the first array is equal to the start of the second array
  }
  return { props: { thumbnails: FisherYatesRandomize(thumbnails) } };
}
