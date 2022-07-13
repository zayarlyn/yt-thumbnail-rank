import { Box, VStack, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import ProfileField from './ProfileField';
import UserPfp from './UserPfp';

const UserDetail = ({ user }: { user: User }) => {
  const username = user?.displayName ?? user?.uid.slice(0, 9) ?? '';

  return (
    <Box mt={[6]} position='relative' display={['block','flex']} alignItems='center' columnGap={{sm: '4vw'}}>
      <UserPfp username={username} photoUrl={user.photoURL} />
      <VStack align='stratch' flexGrow={{sm: 1}} p={2} mt={[4, 0]} spacing={[3, 2]}>
        <ProfileField value={username} label='username' />
        {/* <ProfileField value='FryMyRice' label='channel' /> */}
        <Box pl={2}>
          clicked:
          <Text as='span' ml={2} fontWeight='medium'>
            {56}
          </Text>
        </Box>
        <Box pl={2}>
          thumbnails:
          <Text as='span' ml={2} fontWeight='medium'>
            {7}
          </Text>
        </Box>
        <Box pl={2}>
          email:
          <Text as='span' ml={2} fontWeight='medium'>
            {user.email}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserDetail;

// https://i.pinimg.com/736x/b3/43/cb/b343cbb24c0954a5dd04c79fe6c36abe.jpg
// https://avatars.githubusercontent.com/u/1332805?v=4
