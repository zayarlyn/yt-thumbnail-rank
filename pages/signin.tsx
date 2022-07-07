import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { app } from '../firebaseconfig';
import { useAuthStore, AuthStoreType } from '../store/auth';
import { actionCodeSettings, isSignInLink } from '../firebaseUtils';

const signin = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthStore() as AuthStoreType;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const LINKED_EMAIL = window.localStorage.getItem('emailForSignIn') || '';
      const EMAIL_LINK = window.location.href;
      if (!LINKED_EMAIL || !isSignInLink(EMAIL_LINK)) return;
      await signInWithEmailLink(getAuth(app), LINKED_EMAIL, EMAIL_LINK);
      router.push('/');
    })();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    // await sendSignInLinkToEmail(getAuth(app), email, actionCodeSettings);
    // window.localStorage.setItem('emailForSignIn', email);
    // setLoading(false);
    setIsSent(true);
  };

  if (isAuthenticated === 'unknown') {
    return null; // add loader
  }

  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <Box as='main' display='grid' placeItems='center' h='calc(100vh - 60px)'>
      {isSent ? (
        <Box>
          <Text>
            A sign in link is sent to <Text color='teal.400' as='span'>{email}.</Text>
          </Text>
        </Box>
      ) : (
        <FormControl padding={8} maxW={80} borderWidth='2px' borderRadius='lg'>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} id='email' type='email' />
          <FormHelperText>Email to receive sign-in link</FormHelperText>
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
      )}
    </Box>
  );
};

export default signin;
