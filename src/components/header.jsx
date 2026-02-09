import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/state';

// hyperlink for donate? and join goes to..?

export default function Header({ theme }) {
  const { joinIsOpen, setJoinIsOpen, setInfoIsOpen } = useAppContext();
  return (
    <header>
      <div className="flex relative flex-wrap -top-10 justify-between pt-16 mb-14 font-main xl:text-22.5 lg:text-17 sm:text-17 xl:pb-6">
        <span className="z-50 button-underline">Donate</span>
        <button
          type="button"
          onClick={() => {
            setJoinIsOpen(!joinIsOpen);
            setInfoIsOpen(false);
          }}
          className="z-50 button-underline">
          Join
        </button>
        <Link
          href="/"
          className="absolute left-0 right-0 flex justify-center top-4 sm:top-7 xl:top-8">
          <div
            className={
              theme === 'dark' ? 'logo-container-dark' : 'logo-container'
            }
            alt="Logo"
          />
          <div className="gif" />
        </Link>
      </div>
    </header>
  );
}
