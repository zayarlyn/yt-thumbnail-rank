import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { getAuth, sendSignInLinkToEmail, signInWithEmailLink, User } from 'firebase/auth';
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
} from '@chakra-ui/react';
import type { UseToastOptions } from '@chakra-ui/react';
import { app } from '../firebaseconfig';
import { useAuthStore, AuthStoreType } from '../store/auth';
import {
  actionCodeSettings,
  isNewUser,
  isSignInLink,
  MetaData,
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
  err: string;
}

enum T {
  EMAIL = 'EMAIL',
  SEND = 'SEND',
  LOADING = 'LOADING',
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
    default:
      return state;
  }
};

const signin = () => {
  const [{ email, isSent, loading, err }, dispatch] = useReducer(formReducer, {
    email: '',
    isSent: false,
    loading: false,
    err: '',
  });

  
  const { user: isAuthenticated } = useAuthStore() as AuthStoreType;
  const router = useRouter();
  const toast = useToast();
  
  useEffect(() => {
    (async () => {
      const LINKED_EMAIL = window.localStorage.getItem('emailForSignIn') || '';
      const EMAIL_LINK = window.location.href;
      if (!LINKED_EMAIL || !isSignInLink(EMAIL_LINK)) return;
      const { user } = await signInWithEmailLink(getAuth(app), LINKED_EMAIL, EMAIL_LINK);
      const isNew = !isNewUser(user.metadata as MetaData);
      await Promise.all([
        handleApiLogin(user),
        isNew ? updatePublicUser({ email: user.email as string }) : [],
      ]);
      toast(toastOptions);
      router.push('/');
    })();
  }, []);
  
  const handleSignIn = async () => {
    if (!email) return dispatch({type: T.ERROR, value: "email can't be empty"});
    dispatch({type: T.LOADING, value: ''})
    await sendSignInLinkToEmail(getAuth(app), email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    dispatch({type: T.LOADING, value: ''})
    dispatch({type: T.SEND, value: ''})
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
      {isSent ? (
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
