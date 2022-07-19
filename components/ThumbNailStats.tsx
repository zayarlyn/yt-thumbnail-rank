import {
  GridItem,
  Box,
  Flex,
  Text,
  ChakraProps,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ThumbNail } from '../lib/firebaseUtils';
import Thumbnail from './Thumbnail';
import useUserData from '../hooks/useUserData';
import Link from 'next/link';
import StatsSection from './StatsSection';

interface Props extends ThumbNail {
  idx: number;
  isProfile?: boolean;
}

const ThumbNailStats: React.FC<Props> = ({ yt_link, pt, seen, at, by, idx, isProfile }) => {
  const publicUser = by ? useUserData({ uid: by }) : null;
  const d = new Date(at);

  return (
    <GridItem
      key={yt_link}
      display={{ md: 'flex' }}
      columnGap={{ md: 4, lg: 5 }}
      borderRadius={5}
      borderWidth={1}
      p={3}
    >
      <Box position='relative' flexGrow={1}>
        <Thumbnail yt_link={yt_link} />
        <Box {...(badgeProps as ChakraProps)}>
          <span>{idx + 1}</span>
        </Box>
        <Box onClick={() => window.open(yt_link, '_blank')} {...(overlayprops as ChakraProps)}>
          <Text fontWeight='medium'>Watch on Youtube</Text>
        </Box>
      </Box>
      <Flex flexDir='column' justifyContent='space-between' pl={{ md: 2 }} w={{ md: '15rem' }}>
        <StatsSection seen={seen} pt={pt}/>
        <Box
          display='flex'
          flexWrap='wrap'
          columnGap={6}
          rowGap={1}
          alignItems='center'
          justifyContent='space-between'
        >
          {isProfile ? null : (
            <Text fontSize={[13, 'sm']}>
              submitted by{' '}
              {publicUser ? (
                <Link href={'/profile/' + by}>
                  <ChakraLink fontWeight='semibold' textColor='purple.500'>
                    {publicUser.username}
                  </ChakraLink>
                </Link>
              ) : (
                <Text as='span' fontWeight='semibold' textColor='purple.500'>
                  a contributer
                </Text>
              )}
            </Text>
          )}
          <Flex fontSize={12}>
            <Text>{d.toLocaleDateString()}</Text>
            <Text fontSize={14} lineHeight={1.3} fontWeight='medium' mx={1.5}>
              at
            </Text>
            <Text>{d.toLocaleTimeString()}</Text>
          </Flex>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default ThumbNailStats;

const common = {
  w: 'full',
  h: 'full',
  position: 'absolute',
  top: 0,
  right: 0,
  bgColor: 'gray.300',
  display: 'grid',
  placeItems: 'center',
};

const badgeProps = {
  ...common,
  w: [12, 16],
  h: [12, 16],
  fontSize: '4xl',
  shadow: 'lg',
  bgColor: 'black',
  color: 'white',
};

const overlayprops = {
  ...common,
  opacity: 0,
  transitionDuration: '200ms',
  cursor: 'pointer',
  _hover: {
    opacity: 0.7,
  },
};
