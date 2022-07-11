import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { AuthStoreType, useAuthStore } from '../store/auth';
import UserDetail from '../components/UserDetail';

const profile: NextPage = () => {
  const { user } = useAuthStore() as AuthStoreType;

  return (
    <Box display='Grid' mt={12} placeItems='center'>
      {user && (
        <Box w='min(35rem, 90%)' mx='auto'>
          <UserDetail user={user}/>
        </Box>
      )}
    </Box>
  );
};

export default profile;
