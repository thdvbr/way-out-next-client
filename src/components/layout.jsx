import React from 'react';
import { useCurrentWidth } from 'react-socks';
import { motion } from 'framer-motion';
import AlertPreview from './alert-preview';
import Footer from './footer';
import { useAppContext } from '../context/state';

export default function Layout({ preview, children }) {
  const width = useCurrentWidth();
  const variants = {
    opened: { x: width > 500 ? '-17vw' : 0 },
    closed: { x: 0 },
  };
  const { infoIsOpen } = useAppContext();
  return (
    <>
      {/* <Meta /> */}
      <div className="min-h-screen">
        {preview && <AlertPreview />}
        <motion.div
          initial={false}
          variants={variants}
          animate={infoIsOpen ? 'opened' : 'closed'}
          transition={{ type: 'spring', duration: 1 }}
        >
          <main className="w-screen inset-0 z-0">{children}</main>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
