import { Box, Flex, Grid, Tab, TabList, Tabs } from '@chakra-ui/react';
import { fetchThumbnails, TFType, ThumbNail } from '../../firebaseUtils';
import { NextPage } from 'next';
import ThumbNailStats from '../../components/ThumbNailStats';
import { useRouter } from 'next/router';

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
      <Flex fontSize={['md','lg']} fontWeight='medium' alignItems='center' py={4} mt={4} {...dimension}>
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
      <Grid as='main' flexGrow={1} fontSize='lg' rowGap={16} mb={20} {...dimension}>
        {rankings?.map((thumbnail, i) => (
          <ThumbNailStats key={thumbnail.id} {...thumbnail} idx={i} />
        ))}
      </Grid>
    </Box>
  );
};

export default ranking;

export async function getServerSideProps({ query }: { query: { count: number } }) {
  const LIMIT = query.count;
  if (LIMIT > 15 || isNaN(LIMIT))
    return { redirect: { destination: '/ranking/5', permanent: false } };
  const rankings = await fetchThumbnails({ type: TFType.RANK, LIMIT });

  return { props: { rankings, selected: (LIMIT / 5) | 0 } };
}

const dimension = {
  maxW: ['27rem', '27rem', 'none'],
  w: ['90%', '90%', '41rem', '47rem'],
};
