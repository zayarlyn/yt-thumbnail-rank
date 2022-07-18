import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Text,
  Heading,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import type { UseToastOptions } from '@chakra-ui/react';
import type { User } from 'firebase/auth';
import { useAuthStore, AuthStoreType } from '../store/auth';
import {
  isNewUser,
  isSignInLink,
  MetaData,
  sendSignInLink,
  signInWithLink,
  updatePublicUser,
} from '../lib/firebaseUtils';

const handleApiLogin = async (user: User) => {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ user });
  return await fetch('/api/login', { method: 'POST', headers, body });
};

interface S {
  email: string;
  isSent: boolean;
  loading: boolean;
  authenticating: boolean;
  err: string;
}

enum T {
  EMAIL = 'EMAIL',
  SEND = 'SEND',
  LOADING = 'LOADING',
  AUTH = 'AUTH',
  ERROR = 'ERROR',
}

interface A {
  type: T;
  value: string;
}

const formReducer = (state: S, action: A) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.value };
    case 'SEND':
      return { ...state, isSent: !state.isSent };
    case 'LOADING':
      return { ...state, loading: !state.loading };
    case 'ERROR':
      return { ...state, err: action.value };
    case 'AUTH':
      return { ...state, authenticating: !state.authenticating };
    default:
      return state;
  }
};

const signin = () => {
  const [{ email, isSent, loading, err, authenticating }, dispatch] = useReducer(formReducer, {
    email: '',
    isSent: false,
    loading: false,
    authenticating: false,
    err: '',
  });

  const { user: isAuthenticated } = useAuthStore() as AuthStoreType;
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const LINKED_EMAIL = window.localStorage.getItem('emailForSignIn') || '';
      const EMAIL_LINK = window.location.href;
      if (!LINKED_EMAIL || !(await isSignInLink(EMAIL_LINK))) return;
      dispatch({ type: T.AUTH, value: '' });
      const { user } = await signInWithLink(LINKED_EMAIL, EMAIL_LINK);
      const isNew = isNewUser(user.metadata as MetaData);
      await Promise.all([
        handleApiLogin(user),
        isNew ? updatePublicUser({ email: user.email as string }) : [],
      ]);
      dispatch({ type: T.AUTH, value: '' });
      toast(toastOptions);
      router.push('/');
    })();
  }, []);

  const handleSignIn = async () => {
    if (!email) return dispatch({ type: T.ERROR, value: "email can't be empty" });
    dispatch({ type: T.LOADING, value: '' });
    try {
      await sendSignInLink(email);
      window.localStorage.setItem('emailForSignIn', email);
      dispatch({ type: T.LOADING, value: '' });
      dispatch({ type: T.SEND, value: '' });
    } catch (err) {
      dispatch({ type: T.ERROR, value: (err as Error).message });
    }
  };

  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <Box
      as='main'
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      h='calc(100vh - 60px)'
    >
      {authenticating ? (
        <Flex mb={20} flexDir='column' alignItems='center'>
          <Text mb={2}>authenticating</Text>
          <Spinner />
        </Flex>
      ) : isSent ? (
        <Box>
          <Text>
            A sign in link is sent to{' '}
            <Text color='teal.400' as='span'>
              {email}.
            </Text>
          </Text>
        </Box>
      ) : (
        <>
          <Heading>Sign in with email</Heading>
          <Text color='gray.600'>(no password required)</Text>
          <FormControl
            isInvalid={!!err}
            mt={8}
            padding={8}
            maxW={80}
            borderWidth='2px'
            borderRadius='lg'
          >
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input
              onChange={(e) => dispatch({ type: T.EMAIL, value: e.target.value })}
              id='email'
              type='email'
            />
            {err ? (
              <FormErrorMessage>{err}</FormErrorMessage>
            ) : (
              <FormHelperText>Email to receive sign-in link</FormHelperText>
            )}
            <Button
              isLoading={loading}
              onClick={handleSignIn}
              width='100%'
              colorScheme='teal'
              marginTop={8}
              type='submit'
            >
              sign in
            </Button>
          </FormControl>
        </>
      )}
    </Box>
  );
};

export default signin;

const toastOptions: UseToastOptions = {
  description: 'successfully logged in',
  status: 'success',
  duration: 2000,
  position: 'top',
};
