import React from 'react';
import Thumbnail from '../components/Thumbnail';

const videos = [
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    charisma: 2340,
    video_url: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    owner_id: 'mira yoshi',
  },
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    charisma: 2340,
    video_url: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    owner_id: 'mira yoshi',
  },
  {
    url: 'https://img.youtube.com/vi/sgZjbk9eH6g/hqdefault.jpg',
    charisma: 2340,
    video_url: 'www.youtube.com/watch?v=Otr3Up8wRn0',
    owner_id: 'mira yoshi',
  },
];

const ranking = () => {
  return (
    <main className='flex h-[calc(100vh-60px)] flex-col items-center overflow-y-scroll'>
      <div className='w-[60vh] py-4 text-left text-lg'>
        <span>Top</span>
        <select className='w-14 px-1 mx-2'>
          {[5, 10, 15].map((i) => (
            <option>{i}</option>
          ))}
        </select>
        <span>thumbnail</span>
      </div>
      <main className='grid grow grid-rows-2 gap-y-8 text-lg'>
        {videos.map(({ url, charisma, video_url, owner_id }, i) => (
          <div className='relative'>
            <Thumbnail url={url} />
            <ul className='pb-2 pt-5'>
              <li>
                charisma: <span className='font-semibold'>{charisma}</span>
              </li>
              <li>
                submitted by <span className='font-semibold text-primary'>{owner_id}</span>
              </li>
            </ul>
            <div className='absolute top-0 right-0 grid h-16 w-16 place-items-center bg-slate-400 text-4xl shadow-md'>
              <span>{i + 1}</span>
            </div>
          </div>
        ))}
      </main>
    </main>
  );
};

export default ranking;
