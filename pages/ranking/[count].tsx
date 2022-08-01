import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Tab, TabList, Tabs } from '@chakra-ui/react';
import { fetchThumbnails, ThumbNail } from '../../lib/firestoreUtils';
import ThumbnailList from '../../components/ThumbnailList';
import Head from 'next/head';

interface SSProps {
  rankings: ThumbNail[];
  selected: number;
}

const ranking: NextPage<SSProps> = ({ rankings, selected }) => {
  const router = useRouter();

  return (
    <Box
      display='flex'
      flexDir='column'
      alignItems='center'
      h='calc(100vh - 60px)'
      overflowY='scroll'
    >
      <Head>
        <title>leaderboard</title>
      </Head>
      <Flex
        fontSize={['md', 'lg']}
        fontWeight='medium'
        alignItems='center'
        py={4}
        mt={4}
        maxW={['27rem', '27rem', 'none']}
        w={['90%', '90%', '41rem', '47rem']}
      >
        Top
        <Tabs size={['sm', 'md']} defaultIndex={selected - 1} mx={3} variant='solid-rounded'>
          <TabList>
            {[5, 10, 15].map((i) => (
              <Tab
                key={i}
                onClick={() => router.push(i + '')}
                _selected={{ borderRadius: 4, bgColor: 'teal.200' }}
              >
                {i}
              </Tab>
            ))}
          </TabList>
        </Tabs>
        thumbnails
      </Flex>
      <ThumbnailList thumbnails={rankings} />
    </Box>
  );
};

export default ranking;

export async function getServerSideProps({ query }: { query: { count: number } }) {
  const LIMIT = query.count;
  if (LIMIT > 15 || isNaN(LIMIT))
    return { redirect: { destination: '/ranking/5', permanent: false } };
  const rankings = await fetchThumbnails({ type: 'RANK', LIMIT });

  return { props: { rankings, selected: (LIMIT / 5) | 0 } };
}
