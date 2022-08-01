import { Box, VStack } from '@chakra-ui/react';
import type { UserDetails } from '../../lib/firestoreUtils';
import ProfileField from './ProfileField';
import ProfileStatBox from './ProfileStatBox';
import UserPfp from './UserPfp';

interface Props {
  userData: UserDetails;
  isPrivate?: boolean;
}

const UserDetail: React.FC<Props> = ({ userData, isPrivate }) => {
  const { username: uname, uid, photoUrl, email, clicked, seen, thumbnails } = userData;
  const username = uname ?? uid?.slice(0, 9) ?? '';

  return (
    <Box
      my={6}
      position='relative'
      display={['block', 'flex']}
      alignItems='center'
      columnGap={{ sm: '4vw' }}
    >
      <UserPfp isPrivate={isPrivate} username={username ?? ''} photoUrl={photoUrl ?? ''} />
      <VStack align='stratch' flexGrow={{ sm: 1 }} p={2} mt={[4, 0]} spacing={[3, 2]}>
        {isPrivate ? (
          <>
            <ProfileField value={username} label='username' />
            {['email', 'clicked', 'seen'].map((data) => (
              <ProfileStatBox key={data} value={userData[data]} label={data} />
            ))}
          </>
        ) : (
          <ProfileStatBox label='username' value={username} />
        )}
        <ProfileStatBox label='thumbnails' value={thumbnails?.length ?? 0} />
      </VStack>
    </Box>
  );
};

export default UserDetail;

// https://i.pinimg.com/736x/b3/43/cb/b343cbb24c0954a5dd04c79fe6c36abe.jpg
// https://avatars.githubusercontent.com/u/1332805?v=4
