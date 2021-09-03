import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './logo-svg';
import SearchBar from './search-bar';
import { useAppContext } from '../context/state';

const NavbarMobile = () => {
  const {
    handleSearch,
    handleSearchOpen,
    searchIsOpen,
    infoIsOpen,
    setInfoIsOpen,
  } = useAppContext();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div className="font-title text-18">
      <nav className="bg-white flex relative flex-wrap justify-between">
        <button type="button" onClick={handleSearchOpen} className="pb-8 pt-4">
          <span className="self-center">Search</span>
        </button>
        <div className="self-center flex justify-center w-7/12">
          {!searchIsOpen ? (
            <Logo />
          ) : (
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: -30 }}
              transition={{ ease: 'easeOut', duration: 0.7 }}
              className="w-full"
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>
          )}
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="sm:hidden pb-8 pt-4"
        >
          <span>Menu</span>
        </button>
        <div
          className={`${menuIsOpen ? 'absolute' : 'hidden'} -right-8`}
          style={{ bottom: '-15.9rem' }}
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
            <button
              className="py-4 text-left"
              type="button"
              onClick={() => setInfoIsOpen(!infoIsOpen)}
            >
              <span>Info</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
