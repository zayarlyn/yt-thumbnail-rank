import { InferGetServerSidePropsType } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { Box, Divider } from '@chakra-ui/react';
import { AuthStoreType, useAuthStore } from '../../store/auth';
import UserDetail from '../../components/UserDetail';
import UserThumbnails from '../../components/UserThumbnails';
import { sessionOptions } from '../../lib/ironSessionConfig';
import { getUser, UserData } from '../../lib/firebaseUtils';

const profile = ({ isPrivate, userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuthStore() as AuthStoreType;
  
  return (
    <Box display='Grid' placeItems='center'>
      {user && userData && (
        <Box as='main' w='min(42rem, 90%)' mx='auto'>
          <UserDetail isPrivate={isPrivate} userData={userData} />
          <Divider />
          <UserThumbnails isPrivate={isPrivate} thumbIds={userData.thumbnails} />
        </Box>
      )}
    </Box>
  );
};

export default profile;

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  const isPrivate = req.session.user?.uid === query.uid;
  const userData = await getUser(query.uid as string) as UserData;
  return { props: { isPrivate, userData  } };
}, sessionOptions);
