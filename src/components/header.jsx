import React from 'react';
import Link from 'next/link';
import Logo from './logo-svg';
import { useAppContext } from '../context/state';

// hyperlink for donate? and join goes to..?

export default function Header() {
  const { joinIsOpen, setJoinIsOpen } = useAppContext();
  return (
    <header>
      <div className="flex relative flex-wrap justify-between pt-16 mb-40 font-main xl:text-22.5 lg:text-17 md:text-17">
        <span className="z-50">Donate</span>
        <button type="button" onClick={() => setJoinIsOpen(!joinIsOpen)} className="z-50">
          Join
        </button>
        <Link href="/">
          <a
            href="/"
            className="flex absolute left-0 right-0 justify-center z-40">
            <Logo />
          </a>
        </Link>
      </div>
    </header>
  );
}
