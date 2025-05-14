'use client';
import { Dispatch, SetStateAction } from 'react';

export default function KidsPartyBook({
  children,
  setBookModal,
}: {
  children: string;
  bookModal: boolean;
  setBookModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <button
        className="bg-red-500 mt-5 py-3 px-4 font-bold rounded-2xl"
        onClick={() => setBookModal((prevBookModal) => !prevBookModal)}
      >
        {children}
      </button>
    </>
  );
}
