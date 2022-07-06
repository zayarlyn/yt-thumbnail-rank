import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CoreHeader from '../components/CoreHeader';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '../store/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <CoreHeader />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
