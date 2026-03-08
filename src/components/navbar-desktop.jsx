/* eslint-disable */

import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUIContext } from '../context/ui-context';
import SearchBar from './search-bar';

const NavbarDesktop = ({ theme = 'light', page = '' }) => {
  const {
    searchIsOpen,
    setSearchIsOpen,
    infoIsOpen,
    setInfoIsOpen,
    setJoinIsOpen,
  } = useUIContext();

  const isDark = theme === 'dark';
  const router = useRouter();
  const isRadioMain = router.pathname === '/radio';
  const borderClass = isDark
    ? isRadioMain
      ? 'border-t border-white'
      : `border-t border-white ${!searchIsOpen ? 'border-b' : ''}`
    : '';

  const handleSearchOpen = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  useEffect(() => {
    if (!router.asPath.startsWith('/search')) {
      setSearchIsOpen(false);
    }
    setJoinIsOpen(false);
  }, [router.asPath]);

  return (
    <div className="px-3 sticky top-0 font-title sm:text-15 lg:text-17 xl:text-22.5">
      <nav className={`relative flex justify-between sm:w-full ${borderClass}`}>
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
            href="/interview"
            className="relative inline-block px-6 ml-1 sm:py-2 ml:py-3 group">
            Interview
            <img
              src="/assets/icons/cross-interviews.png"
              className={`absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${router.pathname == '/interview' && 'opacity-100'}`}
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link
            href="/opinion"
            className={`sm:py-2 ml:py-3 relative group inline-block px-2 mr-9`}>
            Opinion
            <img
              src="/assets/icons/cross-opinions.png"
              className={`absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${router.pathname == '/opinion' && 'opacity-100'}`}
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link
            href="/radio"
            className={`sm:py-2 ml:py-3 px-2 inline-block  relative group`}>
            <span>Radio</span>
            <img
              src="/assets/icons/cross-radio.png"
              className={`absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${router.pathname == '/radio' && 'opacity-100'}`}
              alt=""
            />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => {
            setInfoIsOpen(!infoIsOpen);
            setJoinIsOpen(false);
          }}
          className={`sm:py-2 ml:py-3 pl-4 pr-1.5 relative group`}>
          <span>Info</span>
          <img
            src="/assets/icons/cross-info.png"
            className={`absolute inset-0 m-auto w-15 h-10 object-contain opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${infoIsOpen && 'opacity-100'}`}
            alt=""
          />
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
