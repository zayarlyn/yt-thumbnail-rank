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
import { useAuthStore, AuthStoreType } from '../store/auth';
import { handleLogin, isSignInLink, sendSignInLink, signInWithLink } from '../lib/firebaseUtils';
import SpinningLoader from '../components/SpinningLoader';

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
    case T.EMAIL:
      return { ...state, email: action.value };
    case T.SEND:
      return { ...state, isSent: true };
    case T.LOADING:
      return { ...state, loading: !state.loading };
    case T.ERROR:
      return { ...state, err: action.value };
    case T.AUTH:
      return { ...state, authenticating: !state.authenticating };
    default:
      return state;
  }
};

const defaultValue = {
  email: '',
  isSent: false,
  loading: false,
  authenticating: false,
  err: '',
};

export default function signin() {
  const [{ email, isSent, loading, err, authenticating }, dispatch] = useReducer(
    formReducer,
    defaultValue
  );

  const { user: isAuthenticated } = useAuthStore() as AuthStoreType;
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const LINKED_EMAIL = window.localStorage.getItem('emailForSignIn');
      const EMAIL_LINK = window.location.href;
      if (!LINKED_EMAIL || !(await isSignInLink())) return;
      dispatch({ type: T.AUTH, value: '' });
      const { user } = await signInWithLink(LINKED_EMAIL, EMAIL_LINK);
      await handleLogin(user);
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
    toast(toastOptions);
    router.push('/');
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
        <SpinningLoader />
      ) : isSent ? (
        <Box>
          <Text>
            A sign in link is sent to{' '}
            <Text color='teal.400' as='span'>
              {email}.
            </Text>
            <Text>Please check the spam folder if you don't see one :(</Text>
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
}

const toastOptions: UseToastOptions = {
  description: 'successfully logged in',
  status: 'success',
  duration: 2000,
  position: 'top',
};
