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
      <nav className="sm:py-2 ml:py-3 flex relative justify-between sm:w-full">
        <button
          type="button"
          onClick={handleSearchOpen}
          className={` ${searchIsOpen && "search-active" } search sm:float-left inline-block`}>
          <span className="sm:float-left">
            <FiSearch className="search-icon" />
          </span>
        </button>
        <div>
          <Link href="/interviews">
            <a
              href="/interviews"
              className={`${router.pathname == "/interviews" && "interviews-active"} sm:float-left inline-block sm:py-0 interviews inline-block`} >
              Interviews
            </a>
          </Link>
        </div>
        <div>
          <Link href="/stuff-we-like">
            <a href="/stuff-we-like" className={`${router.pathname == "/stuff-we-like" && "stuff-we-like-active"}  sm:py-0 stuff-we-like`}>
            Reviews&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </Link>
        </div>
        <div>
          <Link href="/radio">
            <a
              href="/radio"
              className={`${router.pathname == "/radio" && "radio-active"} sm:py-0 radio sm:float-left inline-block`}>
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
        className={`${
          searchIsOpen ? 'is-search-visible mb-4' : 'header-search'
        } w-full`}>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavbarDesktop;
