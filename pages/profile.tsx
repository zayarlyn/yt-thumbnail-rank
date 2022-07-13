import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { AuthStoreType, useAuthStore } from '../store/auth';
import UserDetail from '../components/UserDetail';

const profile: NextPage = () => {
  const { user } = useAuthStore() as AuthStoreType;

  return (
    <Box display='Grid' placeItems='center'>
      {user && (
        <Box w='min(42rem, 90%)' mx='auto'>
          <UserDetail user={user}/>
        </Box>
      )}
    </Box>
  );
};

export default profile;
