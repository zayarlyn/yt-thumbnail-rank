import { NextPage } from 'next';
import { Box, Divider } from '@chakra-ui/react';
import { AuthStoreType, useAuthStore } from '../store/auth';
import UserDetail from '../components/UserDetail';
import useUserData from '../hooks/useUserData';
import UserThumbnails from '../components/UserThumbnails';

const profile: NextPage = () => {
  const { user } = useAuthStore() as AuthStoreType;
  const userData = useUserData({ PRIVATE: true, uid: user?.uid });
  console.log(user, userData);

  return (
    <Box display='Grid' placeItems='center'>
      {user && userData && (
        <Box as='main' w='min(42rem, 90%)' mx='auto'>
          <UserDetail user={user} userData={userData}/>
          <Divider />
          <UserThumbnails thumbIds={userData.thumbnails}/>
        </Box>
      )}
    </Box>
  );
};

export default profile;
