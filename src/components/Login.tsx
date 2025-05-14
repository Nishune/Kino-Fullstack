'use client';

import { useState, FormEvent } from 'react';
import { FC } from 'react';
import Button from './Button';
import { signIn } from 'next-auth/react';

type Props = {
  showModal: string;
  onToggleModal: () => void;
  onResetForm: (event: FormEvent<HTMLFormElement>) => void;
};

const Login: FC<Props> = ({ showModal, onToggleModal, onResetForm }) => {
  const [error, setError] = useState<string>('');
  const resetError = () => {
    if (error !== '') {
      setError('');
    }
  };

  return (
    <div>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-51 ${showModal}`}
        onClick={() => {
          onToggleModal();
        }}></div>
      <div
        className={`w-full max-w-100 flex items-center z-999 bg-neutral-800 top-1/4 bottom-1/4.5 text-white p-8 rounded-xl shadow-lg fixed flex-col right-2 left-2 ml-auto mr-auto overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${showModal}`}>
        <h2 className='text-2xl font-bold mt-4 mb-6'>Login</h2>
        <form
          className=''
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            try {
              const sign = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false,
              });

              if (!sign?.ok) {
                const error = sign?.error;
                if (error !== null && error !== undefined) {
                  setError(error);
                  return;
                } else {
                  setError('Invalid credentials');
                }
              } else {
                onResetForm(event);
                onToggleModal();
              }
            } catch (error) {
              throw new Error('Error signing in!');
            }
          }}>
          <input
            onChange={resetError}
            type='email'
            placeholder='email...'
            name='email'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
          />
          <input
            onChange={resetError}
            type='password'
            placeholder='password...'
            name='password'
            className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
          />
          <small className='block pb-4 mr-auto ml-auto'>{error}</small>
          <Button type='submit' className='block mr-auto ml-auto'>
            Login
          </Button>
          <p
            className='hover:text-gray-300 text-center mt-4 cursor-pointer'
            onClick={() => {
              onToggleModal();
            }}>
            Close
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
