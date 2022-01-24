import React from 'react';
import Link from 'next/link';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../context/state';

export default function HeaderGold() {
  const { scrollYProgress } = useViewportScroll();
  const { joinIsOpen, setJoinIsOpen , setInfoIsOpen} = useAppContext();
  // returns where Y is in a range, from 0 to 1
  // second array [0,1] = where our start and end of scroll is
  const opacity = useTransform(scrollYProgress, [-1, 0.03], [0, 1]);
  return (
    <header>
      <div className="flex relative -top-10 flex-wrap justify-between pt-16 mb-14 font-main xl:text-22.5 lg:text-17 md:text-17">
        <span className="z-50 button-underline">Donate</span>
        <button
          type="button"
          onClick={() => { setJoinIsOpen(!joinIsOpen); setInfoIsOpen(false) }}
          className="z-50 button-underline">
          Join
        </button>
        <Link href="/">
          <a
            href="/"
            className="flex absolute left-0 right-0 top-4 sm:top-6 lg:top-5 xl:top-3 justify-center z-40">
            {/* <Logo /> */}
            <div className="logo-container sticky top-0"/>
            <div className="gif"/>
          </a>
        </Link>
{/* fixed positioning doesnt work if parent div uses translate */}
        {/* <motion.div
          style={{ opacity }}
          className="fixed ">
          {/* <LogoGold /> */}
          {/* <div className="logo-gold-container" /> */}
        {/* </motion.div> */} 
      </div>
    </header>
  );
}
