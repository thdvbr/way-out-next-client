import React from 'react';
import AlertPreview from './alert-preview';
import Footer from './footer';
import { useAppContext } from '../context/state';
import { AnimatePresence, motion } from 'framer-motion';
import Meta from './meta';

const variants = {
  opened: { x: "-17vw" },
  closed: { x: 0}
}
export default function Layout({ preview, children }) {
  const { infoIsOpen } = useAppContext();
  return (
    <>
      {/* <Meta /> */}
      <div className="min-h-screen">
        {preview && <AlertPreview />}
        <motion.div initial={false} variants={variants} animate={infoIsOpen ? 'opened' : 'closed'} transition={{ type: "spring", duration: 1 }}>
          <main className="w-screen inset-0 z-0">{children}</main>
          </motion.div>
      </div>
      <Footer />
    </>
  );
}
