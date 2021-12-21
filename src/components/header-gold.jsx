import React from 'react';
import Link from 'next/link';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Logo from './logo-svg';
import LogoGold from './logo-gold-svg';

export default function HeaderGold() {
  const { scrollYProgress } = useViewportScroll();
  // returns where Y is in a range, from 0 to 1
  // second array [0,1] = where our start and end of scroll is
  const opacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  return (
    <header>
      <div className="flex relative flex-wrap justify-between pt-16 mb-24 font-main xl:text-22.5 lg:text-17 md:text-17">
        <span>Donate</span>
        <span>Join</span>
        <Link href="/">
          <motion.a
            href="/"
            whileHover={{ scale: 1.1, dropShadow: '0px 0px 4px gray' }}
            className="flex absolute left-0 right-0 justify-center z-40">
            <Logo />
          </motion.a>
        </Link>
        <motion.div
          style={{ scale: scale, opacity: opacity }}
          className="flex fixed left-0 right-0 justify-center">
          <LogoGold />
        </motion.div>
      </div>
    </header>
  );
}
