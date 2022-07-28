import { Box, Text } from '@chakra-ui/react';

interface Props {
  label: string;
  value: string | number;
}

export default function StatBox({ label, value }: Props) {
  return (
    <Box pl={2}>
      <>
        {label}:
        <Text as='span' ml={2} fontWeight='medium'>
          {value}
        </Text>
      </>
    </Box>
  );
}
