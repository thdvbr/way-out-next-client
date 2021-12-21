import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './logo-svg';
import SearchBar from './search-bar';
import { useAppContext } from '../context/state';
import { debounce } from '../utils/helpers';

const NavbarMobile = () => {
  const {
    handleSearch,
    handleSearchOpen,
    searchIsOpen,
    infoIsOpen,
    setInfoIsOpen,
  } = useAppContext();
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleClick = () => {
    // setMenuIsOpen(!menuIsOpen);
    setVisible(!visible);
  };

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    }
    // Q: Show menu when scrolling up or no? 
    // setVisible(
    //   (prevScrollPos > currentScrollPos
    //     && prevScrollPos - currentScrollPos > 70)
    // );
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <div className="font-title text-15">
      <nav className="bg-white flex relative flex-wrap justify-between">
        <button type="button" onClick={handleSearchOpen} className="pb-8 pt-4">
          <span className="self-center">Search</span>
        </button>
        <div className="self-center flex justify-center w-7/12">
          {!searchIsOpen ? (
            <Link href="/">
            <a href="/">
            <Logo />
            </a>
            </Link>
          ) : (
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: -30 }}
              transition={{ ease: 'easeOut', duration: 0.7 }}
              className="w-full">
              <SearchBar onSearch={handleSearch} />
            </motion.div>
          )}
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="sm:hidden pb-8 pt-4">
          <span>Menu</span>
        </button>
        <div
          className={`${
            visible ? 'absolute' : 'hidden'
          } -right-4`}
          style={{ bottom: '-13.7rem' }}>
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
              onClick={() => setInfoIsOpen(!infoIsOpen)}>
              <span>Info</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
