import React from 'react';
import Link from 'next/link';
import { useUIContext } from '../context/ui-context';

// hyperlink for donate? and join goes to..?

export default function Header({ theme }) {
  const { joinIsOpen, setJoinIsOpen, setInfoIsOpen } = useUIContext();
  return (
    <header>
      <div className="flex relative flex-wrap -top-10 justify-between pt-16 mb-14 font-main xl:text-22.5 lg:text-17 sm:text-17 xl:pb-6">
        <a
          href="https://buy.stripe.com/test_cNibJ1dCzfO93BY7WNfAc00 "
          target="_blank"
          rel="noopener noreferrer"
          className="z-50 button-underline">
          Donate
        </a>
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
