import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>yt-thumbnail-rank</title>
        <meta name="description" content="Find out how charsmatic your thumbnail is"/> 
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          href='https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900'
          rel='stylesheet'
        />
      </Head>
      <body style={{fontFamily: 'Inter,Roboto,sans-serif'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
