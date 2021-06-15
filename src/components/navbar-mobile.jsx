import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './logo-svg';

const NavbarMobile = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="sticky top-0 z-10 font-title text-18">
      <nav className="sticky top-0 z-10 bg-white py-6 flex relative flex-wrap justify-between">
        <span className="self-center">Search</span>
        <Logo />
        <button type="button" onClick={handleClick} className="sm:hidden">
          <span>Menu</span>
        </button>
        <div
          className={`${
            active ? 'absolute' : 'hidden'
          } -right-8`}
          style={{ bottom: '-15rem' }}
        >
          {/* TODO: fix hide overflow */}
          <div className="flex flex-col pl-4 pr-8 mobile-navbar-box">
            <Link href="/interviews">
              <a href="/interviews" className="py-4">
                Interviews
              </a>
            </Link>
            <Link href="/stuff-we-like">
              <a href="/stuff-we-like" className="py-4">
                Stuff We Like
              </a>
            </Link>
            <Link href="/radio">
              <a href="/radio" className="py-4">
                Radio
              </a>
            </Link>
            <Link href="/">
              <a href="/info" className="py-4">
                Info
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
