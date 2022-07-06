import Link from 'next/link';
import { AuthStoreType, useAuthStore } from '../store/auth';
import { signOutUser } from '../firebaseUtils';

const CoreHeader = () => {
  const { isAuthenticated } = useAuthStore() as AuthStoreType;
console.log(isAuthenticated);

  return (
    <header>
      <div className='flex-x mx-auto w-11/12 py-4 text-lg'>
        <div className='flex gap-4'>
          <Link href='/' scroll={false}>
            <a className='font-bold'>YT</a>
          </Link>
          <Link href='/ranking'>
            <a>ranking</a>
          </Link>
        </div>
        <nav>
          {isAuthenticated ? (
            <button onClick={signOutUser}>sign out</button>
          ) : (
            <Link href='/signin'>
              <a>sign in</a>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default CoreHeader;
