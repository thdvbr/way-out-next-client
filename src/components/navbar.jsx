import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <nav className="sticky top-0 z-10 bg-white py-6 flex relative flex-wrap justify-between font-title text-13.5 sm:text-15 lg:text-17">
      <span>Search</span>
      <button type="button" onClick={handleClick} className="sm:hidden"><span>Menu</span></button>
      <div className={`${active ? 'flex' : 'hidden'
        } flex-col sm:flex sm:flex-row`}>
        <Link href="/interviews">
          <a href="/interviews" className="sm:flex-auto">
            Interviews
          </a>
        </Link>
        <Link href="/stuff-we-like">
          <a href="/stuff-we-like" className="sm:flex-auto">
            Stuff We Like
          </a>
        </Link>
        <Link href="/radio">
          <a href="/radio" className="sm:flex-auto">
            Radio
          </a>
        </Link>
        <Link href="/">
          <a href="/info" className="sm:flex-auto">
            Info
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
