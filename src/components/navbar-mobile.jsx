import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './logo-svg';
import SearchBar from './search-bar';
import { useAppContext } from '../context/state';
import { debounce } from '../utils/helpers';

const NavbarMobile = ({ theme = 'light' }) => {
  const {
    infoIsOpen, setInfoIsOpen, searchIsOpen, setSearchIsOpen,
  } = useAppContext();
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black text-white' : 'bg-white text-black';

  const handleSearchOpen = () => {
    setSearchIsOpen(!searchIsOpen);
  };

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
  }, 10);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <div className="font-title text-15">
      <nav className={`relative flex flex-wrap justify-between ${bgClass}`}>
        <button type="button" onClick={handleSearchOpen} className="pt-4 pb-8">
          <span className="self-center">Search</span>
        </button>
        <div className="flex self-center justify-center w-7/12">
          {!searchIsOpen ? (
            <Link href="/">
              <Logo theme={theme} />
            </Link>
          ) : (
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: -30 }}
              transition={{ ease: 'easeOut', duration: 0.7 }}
              className="w-full"
            >
              <SearchBar />
            </motion.div>
          )}
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="pt-4 pb-8 lg:hidden"
        >
          <span>Menu</span>
        </button>
        <div
          className={`${visible ? 'absolute' : 'hidden'} -right-4`}
          style={{ bottom: '-13.15rem' }}
        >
          {/* TODO: fix hide overflow */}
          <div
            className={`flex flex-col pl-4 pr-8 ${isDark ? 'mobile-navbar-box-dark' : 'mobile-navbar-box'}`}
          >
            <Link href="/interviews" className="py-4 interviews">
              Interviews
            </Link>
            <Link href="/stuff-we-like" className="py-4 stuff-we-like">
              Reviews
            </Link>
            <Link href="/radio" className="py-4 radio">
              Radio
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
