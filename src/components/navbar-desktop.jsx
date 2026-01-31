/* eslint-disable */

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/state';
import SearchBar from './search-bar';

const NavbarDesktop = () => {
  const {
    searchIsOpen,
    setSearchIsOpen,
    infoIsOpen,
    setInfoIsOpen,
    setJoinIsOpen,
  } = useAppContext();

  const handleSearchOpen = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  const router = useRouter();

  return (
    <div className="px-3 sticky top-0 font-title sm:text-15 lg:text-17 xl:text-22.5">
      <nav className="relative flex justify-between sm:py-2 ml:py-3 sm:w-full">
        <button
          type="button"
          onClick={handleSearchOpen}
          className={` ${searchIsOpen && 'search-active'} search`}>
          <span>
            <FiSearch className="search-icon" />
          </span>
        </button>
        <div>
          <Link
            href="/interviews"
            className={`${router.pathname == '/interviews' && 'interviews-active'} sm:py-0 interviews`}>
            Interviews
          </Link>
        </div>
        <div>
          <Link
            href="/stuff-we-like"
            className={`${router.pathname == '/stuff-we-like' && 'stuff-we-like-active'}  sm:py-0 stuff-we-like`}>
            Reviews&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Link>
        </div>
        <div>
          <Link
            href="/radio"
            className={`${router.pathname == '/radio' && 'radio-active'} sm:py-0 radio`}>
            <span className="">Radio</span>
          </Link>
        </div>
        <button
          type="button"
          onClick={() => {
            setInfoIsOpen(!infoIsOpen);
            setJoinIsOpen(false);
          }}
          className={`sm:py-0 ${infoIsOpen ? 'info-color' : 'info'}`}>
          <span>Info</span>
        </button>
      </nav>
      <div
        className={`${
          searchIsOpen ? 'is-search-visible mb-4' : 'header-search'
        } w-full`}>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavbarDesktop;
