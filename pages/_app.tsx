import '../styles/globals.css';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContext } from 'next/app';
import CoreHeader from '../components/CoreHeader';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '../store/auth';
import RightDrawer from '../components/RightDrawer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <CoreHeader />
        <RightDrawer />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;

 MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
 }