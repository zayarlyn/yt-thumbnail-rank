import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CoreHeader from '../components/CoreHeader';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CoreHeader />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
