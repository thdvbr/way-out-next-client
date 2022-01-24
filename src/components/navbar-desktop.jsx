import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useAppContext } from '../context/state';
import SearchBar from './search-bar';

const NavbarDesktop = () => {
  const {
    handleSearch,
    handleSearchOpen,
    searchIsOpen,
    infoIsOpen,
    setInfoIsOpen,
    setJoinIsOpen,
  } = useAppContext();

  return (
    <div className="px-3 sticky top-0 font-title sm:text-15 lg:text-17 xl:text-22.5">
      <nav className="py-3 flex relative justify-between sm:w-full">
        <button
          type="button"
          onClick={handleSearchOpen}
          className="search sm:float-left inline-block">
          <span className="sm:float-left">
            <FiSearch className="search-icon" />
          </span>
        </button>
        <div>
          <Link href="/interviews">
            <a
              href="/interviews"
              className="sm:float-left inline-block sm:py-0 interviews inline-block">
              Interviews
            </a>
          </Link>
        </div>
        <div>
          <Link href="/stuff-we-like">
            <a href="/stuff-we-like" className="sm:py-0 stuff-we-like">
              Stuff We Like
            </a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a
              href="/radio"
              className="sm:py-0 radio sm:float-left inline-block">
              <span className="sm:float-left">Radio</span>
            </a>
          </Link>
        </div>
        <button
          type="button"
          onClick={() => {
            setInfoIsOpen(!infoIsOpen);
            setJoinIsOpen(false);
          }}
          className={`sm:py-0 sm:float-left inline-block ${
            infoIsOpen ? 'info-color' : 'info'
          }`}>
          <span className="sm:float-left">Info</span>
        </button>
      </nav>
      <div
        className={`${searchIsOpen ? 'is-search-visible' : 'header-search'} w-full`}>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default NavbarDesktop;
