import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppContext } from '../context/state';
import SearchBar from './search-bar';

const NavbarDesktop = () => {
  const { handleSearch, handleSearchOpen, searchIsOpen, infoIsOpen, setInfoIsOpen } = useAppContext();

  return (
    <div className="sticky top-0 z-10 font-title sm:text-15 lg:text-17 xl:text-22.5">
      <nav className="sticky top-0 z-10 bg-white py-3 flex relative flex-wrap justify-between sm:w-full sm:justify-items-end">
        <button type="button" onClick={handleSearchOpen} className="sm:w-1/5 search">
          <span>Search</span>
        </button>
        <Link href="/interviews">
          <a href="/interviews" className="sm:flex-auto sm:py-0 interviews">
            Interviews
          </a>
        </Link>
        <Link href="/stuff-we-like">
          <a href="/stuff-we-like" className="sm:flex-auto sm:py-0 stuff-we-like">
            Stuff We Like
          </a>
        </Link>
        <Link href="/">
          <a href="/radio" className="sm:flex-auto sm:py-0 radio">
            Radio
          </a>
        </Link>
        <button type="button" onClick={() => setInfoIsOpen(!infoIsOpen)} className="sm:flex-auto sm:py-0 info">
            <span>Info</span>
        </button>
      </nav>
      <motion.div className={`${searchIsOpen ? 'flex' : 'hidden'} w-full`}>
        <SearchBar onSearch={handleSearch} />
      </motion.div>
    </div>
  );
};

export default NavbarDesktop;
