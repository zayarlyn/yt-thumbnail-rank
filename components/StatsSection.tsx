import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatUpArrow,
  StatDownArrow,
} from '@chakra-ui/react';
import { ViewIcon, StarIcon } from '@chakra-ui/icons';

interface Props {
  seen: number;
  pt: number;
}

const StatsSection: React.FC<Props> = ({ seen, pt }) => {
  const rating = seen && pt ? (pt * 100) / seen : 0;
  const ratingIcon = rating >= 50 ? StatUpArrow : StatDownArrow;

  return (
    <StatGroup
      pt={['4vw', 5, 2]}
      display={['flex', 'flex', 'grid']}
      gridTemplateColumns='1fr 1fr'
      columnGap={[4, 12]}
      rowGap={3}
      mb={2}
    >
      {[
        { title: 'Seen', value: seen, Icon: ViewIcon },
        { title: 'Clicked', value: pt, Icon: StarIcon },
        { title: 'Rating', value: rating.toFixed(2), Icon: ratingIcon },
      ].map(({ title, value, Icon }) => (
        <Stat>
          <StatLabel display='flex' alignItems='center' columnGap={2}>
            {title} <Icon />
          </StatLabel>
          <StatNumber>{value}</StatNumber>
        </Stat>
      ))}
    </StatGroup>
  );
};

export default StatsSection;
