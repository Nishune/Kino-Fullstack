'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Register from './Register';
import Login from './Login';
import { SISO_Desktop, SISO_Mobile } from './SignIn_SignOut';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setLoginModal] = useState<string>('hidden');
  const [showRegisterModal, setRegisterModal] = useState<string>('hidden');
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const resetForm = (event: FormEvent<HTMLFormElement>) => {
    const userForm = event.target as HTMLFormElement;
    userForm.reset();
  };

  const toggleModal = (modal: string) => {
    if (modal === 'login') {
      showLoginModal === 'hidden' ? setLoginModal('') : setLoginModal('hidden');
    } else {
      showRegisterModal === 'hidden' ? setRegisterModal('') : setRegisterModal('hidden');
    }
  };

  return (
    <header className='mx-3 my-1 rounded-lg sticky top-0 z-50 bg-kino-darkred'>
      <nav className='rounded-lg overflow-hidden p-1 mx-auto w-full max-w-screen-xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link
              href='/'
              onClick={() => setIsOpen(false)}
              className='transition-transform duration-200 hover:scale-105'>
              <Image src='/kinoLogo.png' alt='Kino Logo' width={66} height={40} className='w-[66px] h-[40px]' />
            </Link>
            <Link
              href='/'
              onClick={() => setIsOpen(false)}
              className={`text-lg leading-none block py-1 hover:text-kino-darkgrey ${
                isActive('/') ? 'font-bold' : ''
              }`}>
              KINO CINEMA
            </Link>
          </div>

          <div className='hidden lg:block'>
            <ul className='flex gap-6 mx-6'>
              {[
                { href: '/current-movies', text: 'Current Movies' },
                { href: '/upcoming-movies', text: 'Upcoming Movies' },
                { href: '/cinema-experiences', text: 'Cinema Experiences' },
                { href: '/kids-party', text: 'Kids Party' },
                { href: '/member', text: 'Member' },
                { href: '/about', text: 'About us' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-base hover:text-kino-darkgrey ${
                      isActive(item.href) ? 'text-kino-white font-bold underline' : ''
                    }`}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <SISO_Desktop onToggleModal={toggleModal} />

          <button onClick={() => setIsOpen(prev => !prev)} className='lg:hidden p-2 rounded-md ml-auto'>
            <svg
              width='1.5em'
              height='1.5em'
              strokeWidth='1.5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-white'>
              <path d='M3 5H21' stroke='currentColor' strokeLinejoin='round' />
              <path d='M3 12H21' stroke='currentColor' strokeLinejoin='round' />
              <path d='M3 19H21' stroke='currentColor' strokeLinejoin='round' />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className='w-full bg-kino-darkred text-center py-6 flex flex-col items-center justify-center gap-4 lg:hidden'>
            <ul className='flex flex-col gap-4'>
              {[
                { href: '/current-movies', text: 'Current Movies' },
                { href: '/upcoming-movies', text: 'Upcoming Movies' },
                { href: '/cinema-experiences', text: 'Cinema Experience' },
                { href: '/kids-party', text: 'Kids Party' },
                { href: '/member', text: 'Member' },
                { href: '/about', text: 'About us' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg hover:text-kino-darkgrey ${
                      isActive(item.href) ? 'text-kino-white font-bold underline' : ''
                    }`}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            <div className='mt-4'>
              <SISO_Mobile onToggleModal={toggleModal} />
            </div>
          </div>
        )}
      </nav>

      <Register showRegisterModal={showRegisterModal} onToggleModal={toggleModal} onResetForm={resetForm} />
      <Login showLoginModal={showLoginModal} onToggleModal={toggleModal} onResetForm={resetForm} />
    </header>
  );
};

export default Header;
