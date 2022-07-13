import '../styles/globals.css';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContext } from 'next/app';
import CoreHeader from '../components/CoreHeader';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import AuthProvider from '../store/auth';
import RightDrawer from '../components/RightDrawer';

const breakpoints = {
  sm: '420px',
  md: '900px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({breakpoints})
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
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