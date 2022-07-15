import { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { Box, Divider } from '@chakra-ui/react';
import { AuthStoreType, useAuthStore } from '../../store/auth';
import UserDetail from '../../components/UserDetail';
import useUserData from '../../hooks/useUserData';
import UserThumbnails from '../../components/UserThumbnails';
import { sessionOptions } from '../../lib/ironSessionConfig';

const profile = ({ isPrivate }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuthStore() as AuthStoreType;
  const userData = useUserData({ PRIVATE: isPrivate, uid: user?.uid });
  
  return (
    <Box display='Grid' placeItems='center'>
      {user && userData && (
        <Box as='main' w='min(42rem, 90%)' mx='auto'>
          <UserDetail isPrivate={isPrivate} user={user} userData={userData} />
          <Divider />
          <UserThumbnails isPrivate={isPrivate} thumbIds={userData.thumbnails} />
        </Box>
      )}
    </Box>
  );
};

export default profile;

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  return { props: { isPrivate: req.session.user?.uid === query.uid } };
}, sessionOptions);
