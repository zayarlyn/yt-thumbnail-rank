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
    <GridItem key={yt_link} position='relative' borderRadius={5} p={3} borderWidth={1}>
      <Thumbnail v_link={yt_link} />
      <StatGroup className='pb-2 pt-5'>
        <Stat>
          <StatLabel>
            Seen <ViewIcon />
          </StatLabel>
          <StatNumber>{seen}</StatNumber>
        </Stat>
        <Stat>
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
      <Box mt={4} display='flex' justifyContent='space-between'>
        <Text fontSize='sm'>
          submitted by <span className='font-semibold text-primary'>{'by'}</span>
        </Text>
        <Flex fontSize={12}>
          <Text>{d.toLocaleDateString()}</Text>
          <Text fontSize={14} lineHeight={1.3} fontWeight='medium' mx={1.5}>
            at
          </Text>
          <Text>{d.toLocaleTimeString()}</Text>
        </Flex>
      </Box>
      <Box
        w={16}
        h={16}
        top={0}
        right={0}
        fontSize='4xl'
        display='grid'
        placeItems='center'
        position='absolute'
        shadow='lg'
        bgColor='black'
        color='white'
      >
        <span>{idx + 1}</span>
      </Box>
    </GridItem>
  );
};

export default ThumbNailStats;
