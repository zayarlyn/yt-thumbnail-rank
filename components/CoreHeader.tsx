import Link from 'next/link';

const CoreHeader = () => {
  return (
    <header>
      <div className='flex-x w-11/12 mx-auto py-4 text-lg'>
        <div className='flex gap-4'>
          <Link href='/' scroll={false}>
            <a className='font-bold'>YT</a>
          </Link>
          <Link href='/ranking'>
            <a>ranking</a>
          </Link>
        </div>
        <nav>sign in</nav>
      </div>
    </header>
  );
};

export default CoreHeader;
