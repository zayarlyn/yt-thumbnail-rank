import { Flex, Text, Spinner } from '@chakra-ui/react';

type Props = {
  msg?: string;
  styling?: { [key: string]: string | number };
};

const SpinningLoader = ({ msg, styling }: Props) => {
  return (
    <Flex {...styling} flexDir='column' alignItems='center'>
      <Text mb={3}>{msg ?? 'authenticating'}</Text>
      <Spinner />
    </Flex>
  );
};

export default SpinningLoader;
