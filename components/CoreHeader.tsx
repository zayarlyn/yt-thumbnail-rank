import Link from 'next/link';
import { AuthStoreType, useAuthStore } from '../store/auth';
import { signOutUser } from '../lib/firebaseUtils';
import { Box, Flex, useToast, UseToastOptions } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';

const CoreHeader = () => {
  const { user } = useAuthStore() as AuthStoreType;
  const toast = useToast();

  const handleSignOut = async () => {
    await Promise.all([signOutUser(), fetch('/api/logout')]);
    toast(toastOptions);
  };

  return (
    <Box as='header' bgColor='white' zIndex={5} position='sticky' top={0}>
      <Box display='flex' justifyContent='space-between' mx='auto' w='90%' py={4} fontSize='lg'>
        <Box display='flex' gap={4}>
          <Link href='/' scroll={false}>
            <ChakraLink _hover={{ textDecoration: 'none' }} fontWeight='bold'>
              <svg
                width='auto'
                height='27'
                viewBox='0 0 70 36'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.2488 7.18182H15.4157L20.3908 16.5781H20.6039L25.579 7.18182H30.7459L22.7878 21.2869V29H18.2069V21.2869L10.2488 7.18182Z'
                  fill='black'
                />
                <path
                  d='M44.0526 29V7.18182H52.6605C54.3082 7.18182 55.7145 7.47656 56.8793 8.06605C58.0511 8.64844 58.9425 9.47585 59.5533 10.5483C60.1712 11.6136 60.4801 12.8672 60.4801 14.3089C60.4801 15.7578 60.1676 17.0043 59.5426 18.0483C58.9176 19.0852 58.0121 19.8807 56.826 20.4347C55.647 20.9886 54.2195 21.2656 52.5433 21.2656H46.7798V17.5582H51.7976C52.6783 17.5582 53.4098 17.4375 53.9922 17.196C54.5746 16.9545 55.0078 16.5923 55.2919 16.1094C55.5831 15.6264 55.7287 15.0263 55.7287 14.3089C55.7287 13.5845 55.5831 12.9737 55.2919 12.4766C55.0078 11.9794 54.571 11.603 53.9815 11.3473C53.3991 11.0845 52.6641 10.9531 51.7763 10.9531H48.6655V29H44.0526ZM55.8352 19.071L61.2578 29H56.1655L50.8601 19.071H55.8352Z'
                  fill='black'
                />
                <path
                  d='M26.5458 10.9851V7.18182H44.4648V10.9851H37.7852V29H33.2255V10.9851H26.5458Z'
                  fill='black'
                />
              </svg>
            </ChakraLink>
          </Link>
          <Link href='/ranking/5'>
            <ChakraLink _hover={{ color: 'purple.500' }}>ranking</ChakraLink>
          </Link>
        </Box>
        <Flex columnGap={4}>
          {user === undefined ? null : user ? (
            <>
              <Link href={'/profile/' + user.uid}>
                <ChakraLink _hover={{ color: 'purple.500' }}>profile</ChakraLink>
              </Link>
              <ChakraLink type='button' onClick={handleSignOut} _hover={{ color: 'purple.500' }}>
                sign out
              </ChakraLink>
            </>
          ) : (
            <Link href='/signin'>
              <ChakraLink _hover={{ color: 'purple.500' }}>sign in</ChakraLink>
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default CoreHeader;

const toastOptions: UseToastOptions = {
  description: 'successfully logged out',
  status: 'success',
  duration: 2000,
  position: 'top',
};
