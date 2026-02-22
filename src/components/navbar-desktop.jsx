/* eslint-disable */

import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/state';
import SearchBar from './search-bar';

const NavbarDesktop = ({ theme = 'light', page = '' }) => {
  const {
    searchIsOpen,
    setSearchIsOpen,
    infoIsOpen,
    setInfoIsOpen,
    setJoinIsOpen,
  } = useAppContext();

  const isDark = theme === 'dark';
  const isRadioMain = page === 'radiomain';
  const borderClass = isDark
    ? isRadioMain
      ? 'border-t border-white'
      : `border-t border-white ${!searchIsOpen ? 'border-b' : ''}`
    : '';

  const handleSearchOpen = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  const router = useRouter();
  useEffect(() => {
    if (!router.asPath.startsWith('/search')) {
      setSearchIsOpen(false);
    }
  }, [router.asPath]);

  return (
    <div className="px-3 sticky top-0 font-title sm:text-15 lg:text-17 xl:text-22.5">
      <nav
        className={`relative flex justify-between sm:py-2 ml:py-3 sm:w-full ${borderClass}`}>
        <button
          type="button"
          onClick={handleSearchOpen}
          className={` ${searchIsOpen && 'search-active'} search`}>
          <span>
            <FiSearch className="search-icon" />
          </span>
        </button>
        <div>
          <Link href="/interviews" className="relative sm:py-0 group">
            Interviews
            <img
              src="/assets/icons/cross-interviews.svg"
              className={`absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${router.pathname == '/interviews' && 'opacity-100'}`}
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link
            href="/stuff-we-like"
            className={`sm:py-0 relative group inline-block mr-6`}>
            Opinions
            <img
              src="/assets/icons/cross-opinions.svg"
              className={`absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${router.pathname == '/stuff-we-like' && 'opacity-100'}`}
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link href="/radio" className={`sm:py-0 relative group`}>
            <span>Radio</span>
            <img
              src="/assets/icons/cross-radio.svg"
              className={`absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${router.pathname == '/radio' && 'opacity-100'}`}
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
          className={`sm:py-0 relative group`}>
          <span>Info</span>
          <img
            src="/assets/icons/cross-info.svg"
            className={`absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none ${infoIsOpen && 'opacity-100'}`}
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
