import {
  GridItem,
  Box,
  Flex,
  Text,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatUpArrow,
  StatDownArrow,
  ChakraProps,
} from '@chakra-ui/react';
import { ViewIcon, StarIcon } from '@chakra-ui/icons';
import { ThumbNail } from '../firebaseUtils';
import Thumbnail from './Thumbnail';

interface Props extends ThumbNail {
  idx: number;
}

const ThumbNailStats: React.FC<Props> = ({ id, yt_link, pt, seen, at, by, idx }) => {
  if (!seen || !pt) return null;
  const d = new Date(at);
  const rating = (pt * 100) / seen;

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
        <Thumbnail v_link={yt_link} />
        <Box {...badgeProps as ChakraProps}>
          <span>{idx + 1}</span>
        </Box>
      </Box>
      <Box pl={{ md: 2 }} w={{ md: '15rem' }}>
        <StatGroup
          pt={['4vw', 5, 2]}
          display={['flex', 'flex', 'grid']}
          gridTemplateColumns='1fr 1fr'
          columnGap={12}
          rowGap={{ lg: 3 }}
        >
          <Stat>
            <StatLabel>
              Seen <ViewIcon />
            </StatLabel>
            <StatNumber>{seen}</StatNumber>
          </Stat>
          <Stat mb={4}>
            <StatLabel>
              clicked <StarIcon mb={0.8} />
            </StatLabel>
            <StatNumber>{pt}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Rating {rating >= 50 ? <StatUpArrow /> : <StatDownArrow />}</StatLabel>
            <StatNumber>{rating.toFixed(2)}%</StatNumber>
          </Stat>
        </StatGroup>
        <Box
          mt={[0, 4, 6, 16]}
          display='flex'
          flexWrap='wrap'
          columnGap={6}
          rowGap={1}
          alignItems='center'
          justifyContent='space-between'
        >
          <Text fontSize={[13, 'sm']}>
            submitted by <span className='font-semibold text-primary'>{by ?? 'a contributer'}</span>
          </Text>
          <Flex fontSize={12}>
            <Text>{d.toLocaleDateString()}</Text>
            <Text fontSize={14} lineHeight={1.3} fontWeight='medium' mx={1.5}>
              at
            </Text>
            <Text>{d.toLocaleTimeString()}</Text>
          </Flex>
        </Box>
      </Box>
    </GridItem>
  );
};

export default ThumbNailStats;

const badgeProps = {
  w: [12, 16],
  h: [12, 16],
  top: 0,
  right: 0,
  fontSize: '4xl',
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
  shadow: 'lg',
  bgColor: 'black',
  color: 'white',
};
