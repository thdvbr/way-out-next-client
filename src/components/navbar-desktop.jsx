import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppContext } from '../context/state';
import SearchBar from './search-bar';

const NavbarDesktop = () => {
  const { handleSearch, handleSearchOpen, searchIsOpen } = useAppContext();

  return (
    <div className="sticky top-0 z-10 font-title sm:text-15 lg:text-17">
      <nav className="sticky top-0 z-10 bg-white py-6 flex relative flex-wrap justify-between sm:w-full sm:justify-items-end">
        <button type="button" onClick={handleSearchOpen} className="sm:w-1/5">
          <span>Search</span>
        </button>
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
      <motion.div className={`${searchIsOpen ? 'flex' : 'hidden'} w-full`}>
        <SearchBar onSearch={handleSearch} />
      </motion.div>
    </div>
  );
};

export default NavbarDesktop;
