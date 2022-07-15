import Link from 'next/link';
import { AuthStoreType, useAuthStore } from '../store/auth';
import { signOutUser } from '../lib/firebaseUtils';
import { Box, Flex } from '@chakra-ui/react';
import { Link as Clink } from '@chakra-ui/react';

const CoreHeader = () => {
  const { user: isAuthenticated } = useAuthStore() as AuthStoreType;

  return (
    <header>
      <Box display='flex' justifyContent='space-between' mx='auto' w='90%' py={4} fontSize='lg'>
        <Box display='flex' gap={4}>
          <Link href='/' scroll={false}>
            <Clink _hover={{ textDecoration: 'none' }} fontWeight='bold'>
              YT
            </Clink>
          </Link>
          <Link href='/ranking/5'>
            <Clink>ranking</Clink>
          </Link>
        </Box>
        <Flex columnGap={4}>
          {isAuthenticated ? (
            <>
              <Link href={`/profile/${isAuthenticated.uid}`}>
                <Clink>profile</Clink>
              </Link>
              <button onClick={signOutUser}>sign out</button>
            </>
          ) : (
            <Link href='/signin'>
              <a>sign in</a>
            </Link>
          )}
        </Flex>
      </Box>
    </header>
  );
};

export default CoreHeader;
