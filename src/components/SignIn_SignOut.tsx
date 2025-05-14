import React from 'react';
import Button from './Button';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

type Props = { onToggleModal: () => void };

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
        className='hidden text-xs sm:hidden md:hidden lg:inline-block ml-auto border border-kino-white hover:kino-red'>
        Sign Out
      </Button>
    );
  } else if (status === 'unauthenticated') {
    return (
      <Button
        type='button'
        onClick={onToggleModal}
        className='hidden text-xs sm:hidden md:hidden lg:inline-block ml-auto border border-kino-white hover:kino-red'>
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
      <Button type='button' onClick={onToggleModal} className='border border-kino-white'>
        Sign In
      </Button>
    );
  }
};

export { SISO_Desktop, SISO_Mobile };
