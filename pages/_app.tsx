import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CoreHeader from '../components/CoreHeader';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CoreHeader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
