import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './logo-svg';
import SearchBar from './search-bar';
import { useAppContext } from '../context/state';

const NavbarMobile = () => {
  const { handleSearch, handleSearchOpen, searchIsOpen } = useAppContext();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div className="sticky top-0 z-10 font-title text-18">
      <nav className="sticky top-0 z-10 bg-white py-6 flex relative flex-wrap justify-between">
        <button type="button" onClick={handleSearchOpen}>
          <span className="self-center">Search</span>
        </button>
        <Logo />
        <div className={`${searchIsOpen ? 'absolute' : 'hidden'}`}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <button type="button" onClick={handleClick} className="sm:hidden">
          <span>Menu</span>
        </button>
        <div
          className={`${menuIsOpen ? 'absolute' : 'hidden'} -right-8`}
          style={{ bottom: '-15rem' }}>
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
