import React from 'react';
import Link from 'next/link';

const NavbarDesktop = () => {
  return (
    <div className="sticky top-0 z-10 font-title sm:text-15 lg:text-17">
      <nav className="sticky top-0 z-10 bg-white py-6 flex relative flex-wrap justify-between sm:w-full sm:justify-items-end">
        <span className="sm:w-1/5">Search</span>
        <Link href="/interviews">
          <a href="/interviews" className="sm:flex-auto sm:py-0">
            Interviews
          </a>
        </Link>
        <Link href="/stuff-we-like">
          <a href="/stuff-we-like" className="sm:flex-auto sm:py-0">
            Stuff We Like
          </a>
        </Link>
        <Link href="/radio">
          <a href="/radio" className="sm:flex-auto sm:py-0">
            Radio
          </a>
        </Link>
        <Link href="/">
          <a href="/info" className="sm:flex-auto sm:py-0">
            Info
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default NavbarDesktop;
