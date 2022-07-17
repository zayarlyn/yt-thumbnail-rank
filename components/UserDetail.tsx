import { Box, VStack, Text } from '@chakra-ui/react';
import { UserData } from '../lib/firebaseUtils';
import ProfileField from './ProfileField';
import UserPfp from './UserPfp';

interface Props {
  userData: UserData;
  isPrivate?: boolean;
}

const UserDetail: React.FC<Props> = ({ userData, isPrivate }) => {
  const { username: uname, uid, photoUrl, email, clicked, seen } = userData;
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
            <Box pl={2}>
              email:
              <Text as='span' ml={2} fontWeight='medium'>
                {email}
              </Text>
            </Box>
            <Box pl={2}>
              clicked:
              <Text as='span' ml={2} fontWeight='medium'>
                {clicked}
              </Text>
            </Box>
            <Box pl={2}>
              seen:
              <Text as='span' ml={2} fontWeight='medium'>
                {seen}
              </Text>
            </Box>
          </>
        ) : (
          <Box pl={2}>
            username:
            <Text as='span' ml={2} fontWeight='medium'>
              {username}
            </Text>
          </Box>
        )}
        <Box pl={2}>
          thumbnails:
          <Text as='span' ml={2} fontWeight='medium'>
            {7}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserDetail;

// https://i.pinimg.com/736x/b3/43/cb/b343cbb24c0954a5dd04c79fe6c36abe.jpg
// https://avatars.githubusercontent.com/u/1332805?v=4
