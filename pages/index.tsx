import type { NextPage } from 'next';
import Head from 'next/head';
import Thumbnail from '../components/Thumbnail';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col items-center mt-6'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-medium'>Which one draw your attention?</h1>
      <main className='grid grid-rows-2 gap-y-12 mt-8'>
        <Thumbnail active url='https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg' />
        <Thumbnail active url='https://img.youtube.com/vi/Zmjjx7n5toY/hqdefault.jpg' />
      </main>
    </div>
  );
};

export default Home;
//
