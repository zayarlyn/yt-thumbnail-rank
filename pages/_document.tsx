import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900'
          rel='stylesheet'
        />
      </Head>
      <body className='font-inter'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
