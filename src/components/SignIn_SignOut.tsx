import React from 'react';
import Button from './Button';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

type Props = { onToggleModal: (modal: string) => void };

const SISO_Desktop: FC<Props> = ({ onToggleModal }) => {
  const session = useSession();
  const { status } = session;
  if (status === 'authenticated') {
    return (
      <Button
        type='button'
        onClick={() => {
          signOut({ redirect: false });
        }}
        className='hidden text-sm leading-none sm:hidden md:hidden lg:inline-block ml-auto border border-kino-white hover:kino-red'>
        Sign Out
      </Button>
    );
  } else if (status === 'unauthenticated') {
    return (
      <Button
        type='button'
        onClick={() => {
          onToggleModal('login');
        }}
        className='hidden text-sm leading-none sm:hidden md:hidden lg:inline-block ml-auto border border-kino-white hover:kino-red'>
        Sign In
      </Button>
    );
  }
};

const SISO_Mobile: FC<Props> = ({ onToggleModal }) => {
  const session = useSession();
  const { status } = session;
  if (status === 'authenticated') {
    return (
      <Button
        type='button'
        onClick={() => {
          signOut({ redirect: false });
        }}
        className='border border-kino-white'>
        Sign Out
      </Button>
    );
  } else if (status === 'unauthenticated') {
    return (
      <Button
        type='button'
        onClick={() => {
          onToggleModal('login');
        }}
        className='className="w-fit text-sm px-4 py-1 border border-kino-white hover:bg-kino-red transition rounded-full'>
        Sign In
      </Button>
    );
  }
};

export { SISO_Desktop, SISO_Mobile };
