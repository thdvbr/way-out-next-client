import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { useAppContext } from '../context/state';
import InfoSvg from './info-svg';

// TODO: Use text from CMS;
// TODO: Sign up form?

const InfoDrawer = () => {
  const { infoIsOpen, setInfoIsOpen } = useAppContext();

  return (
    <AnimatePresence>
      {infoIsOpen && (
        <>
          <motion.div
            initial={{ x: '100%' }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed info-box top-0 w-full h-screen z-10"
            style={{ right: '-17vw' }}>
            <InfoSvg />
            <div className="absolute z-20 top-0 p-5">
              <div className="absolute top-0 right-0 p-3 ">
                <button
                  type="button"
                  onClick={() => setInfoIsOpen((infoIsOpen) => !infoIsOpen)}>
                  <MdClose size={32} />
                </button>
              </div>
              <div className="p-10">
                <h1 className="lg:text-22.5 font-title">About</h1>
                <br />
                <div className="pr-32">
                  <h2 className="lg-text-19 font-secondary">
                    Way Out is an online magazine, initiated with the intention
                    of tracking an ever expanding network of artists.
                  </h2>
                  <br />
                  <h2 className="lg-text-19 font-secondary">
                    We believe thatconversation is the purest form of
                    communication and best vehicle for the transfer of
                    information.
                  </h2>
                  <br />
                </div>
                <h1 className="lg:text-22.5 font-title">Staff</h1>
                <br />
                <div className="grid grid-flow-col grid-cols-3 grid-rows-6 gap-4">
                  <div>staff1</div>
                  <div>staff2</div>
                  <div>staff3</div>
                  <div>staff4</div>
                  <div>staff5</div>
                  <div>staff6</div>
                  <div>staff7</div>
                  <div>staff8</div>
                  <div>staff9</div>
                  <div>staff10</div>
                  <div>staff11</div>
                  <div>staff12</div>
                  <div>staff13</div>
                  <div>staff14</div>
                  <div>staff15</div>
                  <div>staff16</div>
                  <div>staff17</div>
                </div>
                <br />
                <h1 className="lg:text-22.5 font-title">Contact</h1>
                <br />
                <h2 className="lg:text-16 font-agrandir">
                  marissa@wayoutmagazine.com
                </h2>
                <br />
                <h1 className="lg:text-22.5 font-title">Join</h1>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
            onClick={() => setInfoIsOpen((infoIsOpen) => !infoIsOpen)}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default InfoDrawer;
