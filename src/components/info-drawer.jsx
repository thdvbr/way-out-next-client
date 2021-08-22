import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCurrentWidth } from 'react-socks';
import { MdClose } from 'react-icons/md';
// import useMouse from '@react-hook/mouse-position';
import { useAppContext } from '../context/state';

// TODO: Use text from CMS;
// TODO: Sign up form?

const useCustomMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const handle = (e) => {
      setMousePosition({ x: e.layerX, y: e.layerY });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  });

  return mousePosition;
};

const InfoDrawer = () => {
  const width = useCurrentWidth();
  const { infoIsOpen, setInfoIsOpen } = useAppContext();
  const { x, y } = useCustomMouse();
  // const target = useRef(null);
  // const mouse = useMouse(target, {
  //     fps: 60,
  //     enterDelay: 100,
  //     leaveDelay: 100,
  // });

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
            transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
            className="fixed info-box top-0 w-full h-screen z-30"
            style={
              width > 500
                ? { right: '-17vw', maxWidth: '30vw' }
                : { right: 0, maxWidth: '100vw' }
            }
          >
            <div
              className="absolute top-0 p-5 radial-gradient"
              style={{
                background: `radial-gradient(farthest-side at ${x}px ${y}px, #FFFF00, #C4C4C4`,
              }}
            >
              {/* <div>{JSON.stringify(mouse, null, 2)}</div> */}
              <div className="absolute top-0 right-0 p-3 ">
                <button
                  type="button"
                  onClick={() => setInfoIsOpen((infoIsOpen) => !infoIsOpen)}
                >
                  <MdClose size={32} />
                </button>
              </div>
              <div className="p-10">
                <h1 className="text-24 sm:text-28 lg:text-22.5 font-title">
                  About
                </h1>
                <br />
                <div className="pr-20">
                  <h2 className="leading-none lg:text-19 font-secondary">
                    Way Out is an online magazine, initiated with the intention
                    of tracking an ever expanding network of artists.
                  </h2>
                  <br />
                  <h2 className="leading-none lg:text-19 font-secondary">
                    We believe thatconversation is the purest form of
                    communication and best vehicle for the transfer of
                    information.
                  </h2>
                  <br />
                </div>
                <h1 className="text-24 sm:text-28 lg:text-22.5 font-title">
                  Staff
                </h1>
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
                <h1 className="text-24 sm:text-28 lg:text-22.5 font-title">
                  Contact
                </h1>
                <br />
                <h2 className="lg:text-16 font-agrandir">
                  marissa@wayoutmagazine.com
                </h2>
                <br />
                <h1 className="text-24 sm:text-28 lg:text-22.5 font-title">
                  Join
                </h1>
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
