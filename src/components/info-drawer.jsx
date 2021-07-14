import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../context/state';

const InfoDrawer = () => {
  const { infoIsOpen } = useAppContext();

  return (
        <>
              <div
                  transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  className="fixed info-box text-white shadow-lg top-0 w-full h-screen p-5 z-10"
                 style={{ "right" : "-645px"}}>
            <h1>This is the info drawer</h1>
          </div>
        </>

  );
};

export default InfoDrawer;
