import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const [activeItem, setActiveItem] = useState(null);

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black text-white' : 'bg-white text-black';

  const router = useRouter();
  useEffect(() => {
    if (!router.asPath.startsWith('/search')) {
      setSearchIsOpen(false);
    }
  }, [router.asPath]);

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
          style={{ bottom: '-13.07rem' }}
        >
          {/* TODO: fix hide overflow */}
          <div
            className={`flex flex-col pl-4 pr-8 ${isDark ? 'mobile-navbar-box-dark' : 'mobile-navbar-box'}`}
          >
            <Link
              href="/interviews"
              className="relative block py-4"
              onTouchStart={() => setActiveItem('interviews')}
              onTouchEnd={() => setActiveItem(null)}
            >
              <span className="relative inline-block group">
                Interviews
                <img
                  src="/assets/icons/cross-interviews.svg"
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${activeItem === 'interviews' ? 'opacity-100' : 'opacity-0'}`}
                  alt=""
                />
              </span>
            </Link>

            <Link
              href="/stuff-we-like"
              className="relative block py-4"
              onTouchStart={() => setActiveItem('opinions')}
              onTouchEnd={() => setActiveItem(null)}
            >
              <span className="relative inline-block group">
                Opinions
                <img
                  src="/assets/icons/cross-opinions.svg"
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${activeItem === 'opinions' ? 'opacity-100' : 'opacity-0'}`}
                  alt=""
                />
              </span>
            </Link>

            <Link
              href="/radio"
              className="relative block py-4"
              onTouchStart={() => setActiveItem('radio')}
              onTouchEnd={() => setActiveItem(null)}
            >
              <span className="relative inline-block group">
                Radio
                <img
                  src="/assets/icons/cross-radio.svg"
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${activeItem === 'radio' ? 'opacity-100' : 'opacity-0'}`}
                  alt=""
                />
              </span>
            </Link>

            <button
              className="relative block w-full py-4 text-left"
              type="button"
              onClick={() => setInfoIsOpen(!infoIsOpen)}
              onTouchStart={() => setActiveItem('info')}
              onTouchEnd={() => setActiveItem(null)}
            >
              <span className="relative inline-block group">
                Info
                <img
                  src="/assets/icons/cross-info.svg"
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${activeItem === 'info' ? 'opacity-100' : 'opacity-0'}`}
                  alt=""
                />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
