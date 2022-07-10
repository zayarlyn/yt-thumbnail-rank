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
  Heading,
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
      const detail = await signInWithEmailLink(getAuth(app), LINKED_EMAIL, EMAIL_LINK);
      console.log(detail);
      router.push('/');
    })();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    await sendSignInLinkToEmail(getAuth(app), email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    setLoading(false);
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
    <Box as='main' display='flex' flexDir='column' alignItems='center' justifyContent='center' h='calc(100vh - 60px)'>
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
          <FormControl mt={8} padding={8} maxW={80} borderWidth='2px' borderRadius='lg'>
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
        </>
      )}
    </Box>
  );
};

export default signin;


const ur = {
    "user": {
        "uid": "u0B7XAIUSHUUg1pWqLW1atuyv2w2",
        "email": "lzayar91@gmail.com",
        "emailVerified": true,
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "lzayar91@gmail.com",
                "displayName": null,
                "email": "lzayar91@gmail.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AOEOulYQyGyT2igOCwGzhLzDuw3xxeRL8v4xK94RRB0e40m5HG_qaiCnbMDN8z9gnlJHUeK18T4cKJCt_8v9e73hpbmz5EzyFnJawUrvETpYxbZ0LAx6eUxSJfP93UeqzcDQ9iP_qzYCAbdY_d4YjVUq56AaVPAikqPOFXsxmc0_juQiIAx_9f6exAdTS04l8blSmx5I_tAcAX02rrH99y1ShSxQ1q34-Q",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwYTdhYTlkNzg5MmI1MmE4YzgxMzkwMzIzYzVjMjJlMTkwMzI1ZDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veXQtdGh1bWJuYWlsLXJhbmsiLCJhdWQiOiJ5dC10aHVtYm5haWwtcmFuayIsImF1dGhfdGltZSI6MTY1NzM0NDk1OCwidXNlcl9pZCI6InUwQjdYQUlVU0hVVWcxcFdxTFcxYXR1eXYydzIiLCJzdWIiOiJ1MEI3WEFJVVNIVVVnMXBXcUxXMWF0dXl2MncyIiwiaWF0IjoxNjU3MzQ0OTU4LCJleHAiOjE2NTczNDg1NTgsImVtYWlsIjoibHpheWFyOTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibHpheWFyOTFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mKeV0AynwBEMTavEbyl5Z2N6kwRNo2j10qnTG9TmL7eKXlCYSHAMbvNquK3Hlsxm7phskZr-5_rAndf-A6KvLtps38-NYj2YZjocCGHh2se8TCQz9QzGcMXQhUK97PpkqRK-zcbZq5n_4YVei-KH-ogsIfzDhlKfQi2PVU0kQLjAmbBS6o0gRKLpDDVF5ZOXdHdthccQneK4vNVr8ZjqAcXmTHnNpNKvx2VWNObSXM-Dr_VUooMQ7PuqZ6iRp_Oy7ulZnbKPDzKDzB8zQe9ww_Y5vpbjh209L9DDRiaqA3JiDFvrGnPFWfM7wXV2Mwc37lHCzFy_f0Ys0iXOuSi3Nw",
            "expirationTime": 1657348558548
        },
        "createdAt": "1657093315807",
        "lastLoginAt": "1657344958261",
        "apiKey": "AIzaSyDkbxXTj8p_ls2M-PFd9JOqAFtj7rEGRdU",
        "appName": "[DEFAULT]"
    },
    "providerId": null,
    "_tokenResponse": {
        "kind": "identitytoolkit#EmailLinkSigninResponse",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwYTdhYTlkNzg5MmI1MmE4YzgxMzkwMzIzYzVjMjJlMTkwMzI1ZDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veXQtdGh1bWJuYWlsLXJhbmsiLCJhdWQiOiJ5dC10aHVtYm5haWwtcmFuayIsImF1dGhfdGltZSI6MTY1NzM0NDk1OCwidXNlcl9pZCI6InUwQjdYQUlVU0hVVWcxcFdxTFcxYXR1eXYydzIiLCJzdWIiOiJ1MEI3WEFJVVNIVVVnMXBXcUxXMWF0dXl2MncyIiwiaWF0IjoxNjU3MzQ0OTU4LCJleHAiOjE2NTczNDg1NTgsImVtYWlsIjoibHpheWFyOTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibHpheWFyOTFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mKeV0AynwBEMTavEbyl5Z2N6kwRNo2j10qnTG9TmL7eKXlCYSHAMbvNquK3Hlsxm7phskZr-5_rAndf-A6KvLtps38-NYj2YZjocCGHh2se8TCQz9QzGcMXQhUK97PpkqRK-zcbZq5n_4YVei-KH-ogsIfzDhlKfQi2PVU0kQLjAmbBS6o0gRKLpDDVF5ZOXdHdthccQneK4vNVr8ZjqAcXmTHnNpNKvx2VWNObSXM-Dr_VUooMQ7PuqZ6iRp_Oy7ulZnbKPDzKDzB8zQe9ww_Y5vpbjh209L9DDRiaqA3JiDFvrGnPFWfM7wXV2Mwc37lHCzFy_f0Ys0iXOuSi3Nw",
        "email": "lzayar91@gmail.com",
        "refreshToken": "AOEOulYQyGyT2igOCwGzhLzDuw3xxeRL8v4xK94RRB0e40m5HG_qaiCnbMDN8z9gnlJHUeK18T4cKJCt_8v9e73hpbmz5EzyFnJawUrvETpYxbZ0LAx6eUxSJfP93UeqzcDQ9iP_qzYCAbdY_d4YjVUq56AaVPAikqPOFXsxmc0_juQiIAx_9f6exAdTS04l8blSmx5I_tAcAX02rrH99y1ShSxQ1q34-Q",
        "expiresIn": "3600",
        "localId": "u0B7XAIUSHUUg1pWqLW1atuyv2w2",
        "isNewUser": false
    },
    "operationType": "signIn"
}