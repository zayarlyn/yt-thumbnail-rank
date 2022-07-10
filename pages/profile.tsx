import { NextPage } from 'next';
import { Box, VStack, Text } from '@chakra-ui/react';
import ProfileField from '../components/ProfileField';
import UserDetail from '../components/UserDetail';

const profile: NextPage = () => {
  return (
    <Box display='Grid' mt={12} placeItems='center'>
      <Box w='min(35rem, 90%)' mx='auto'>
        <UserDetail />
      </Box>
    </Box>
  );
};

export default profile;
