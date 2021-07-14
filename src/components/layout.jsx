import React from 'react';
import AlertPreview from './alert-preview';
import Footer from './footer';
import { useAppContext } from '../context/state';
import { AnimatePresence, motion } from 'framer-motion';
import Meta from './meta';

const variants = {
  opened: { x: -645 },
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
          <main style={{ "left": infoIsOpen && "-645px"}} className="relative w-screen inset-0 mx-5 sm:mx-8 md:mx-10 lg:mx-20 xl:mx-24 z-0">{children}</main>
          </motion.div>
      </div>
      <Footer />
    </>
  );
}
