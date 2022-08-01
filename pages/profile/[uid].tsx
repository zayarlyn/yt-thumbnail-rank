import { InferGetServerSidePropsType } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { Box, Divider } from '@chakra-ui/react';
import { sessionOptions } from '../../lib/ironSessionConfig';
import { getUserDetails } from '../../lib/firestoreUtils';
import UserDetail from '../../components/profile/UserDetail';
import UserThumbnails from '../../components/profile/UserThumbnails';

const profile = ({ isPrivate, userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <Box display='Grid' placeItems='center'>
      {userData && (
        <Box as='main' w='min(42rem, 90%)' mx='auto'>
          <UserDetail isPrivate={isPrivate} userData={userData} />
          <Divider />
          <UserThumbnails thumbIds={userData.thumbnails} />
        </Box>
      )}
    </Box>
  );
};

export default profile;

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  const isPrivate = req.session.user?.uid === query.uid;
  const userData = await getUserDetails(query.uid as string);
  return { props: { isPrivate, userData  } };
}, sessionOptions);
