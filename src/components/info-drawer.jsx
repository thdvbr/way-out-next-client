import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCurrentWidth } from 'react-socks';
import { MdClose } from 'react-icons/md';
import { Content, Staff } from './index';

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

const InfoDrawer = ({ preview }) => {

  const width = useCurrentWidth();
  const { infoIsOpen, setInfoIsOpen, pagesData, staffsData } = useAppContext();
  const { about, contact } = pagesData;
  const { x, y } = useCustomMouse();
  const [aboutIsOpen, setAboutIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [staffIsOpen, setStaffIsOpen] = useState(false);

  const toggleAbout = () => {
    contactIsOpen && toggleContact();
    staffIsOpen && toggleStaff();
    setAboutIsOpen(!aboutIsOpen);
  };

  const toggleContact = () => {
    aboutIsOpen && toggleAbout();
    staffIsOpen && toggleStaff();
    setContactIsOpen(!contactIsOpen);
  };

  const toggleStaff = () => {
    aboutIsOpen && toggleAbout();
    contactIsOpen && toggleContact();
    setStaffIsOpen(!staffIsOpen);
  };

  const toggleInfo = () => {
    aboutIsOpen && toggleAbout();
    contactIsOpen && toggleContact();
    staffIsOpen && toggleStaff();
    setInfoIsOpen(!infoIsOpen);
  };
  // const target = useRef(null);
  // const mouse = useMouse(target, {
  //     fps: 60,
  //     enterDelay: 100,
  //     leaveDelay: 100,
  // });
  const moveToTop = () => {
    document.body.classList.add('no-scroll');
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };
  // TODO: what to do when user opens info drawer in the middle of the screen?
  useEffect(() => {
    infoIsOpen ? moveToTop() : document.body.classList.remove('no-scroll');
  }, [infoIsOpen]);

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
            className="fixed info-box top-0 w-full h-full z-40"
            style={
              width > 500
                ? { right: '-30vw', maxWidth: '35vw' }
                : { right: 0, maxWidth: '100vw' }
            }>
            <div
              className="absolute top-0 p-5 radial-gradient"
              style={{
                background: `radial-gradient(farthest-side at ${x}px ${y}px, #FFFF00, #C4C4C4`,
              }}>
              {/* <div>{JSON.stringify(mouse, null, 2)}</div> */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-6 p-3 ">
                <button type="button" onClick={toggleInfo}>
                  <MdClose size={32} />
                </button>
              </div>
              <div className="p-2 sm:p-6 pt-20 sm:pt-24 flex">
                <div className="w-8/12">
                  {aboutIsOpen && <Content body={about.body} />}
                  {contactIsOpen && <Content body={contact.body} />}
                  {staffIsOpen && (
                    <div className="grid grid-flow-row grid-cols-2 gap-4">
                      {staffsData.map((staff) => (
                        <div key={staff._id}>
                          <Staff name={staff.staffName} role={staff.role} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="w-4/12">
                  <div className="text-23 lg:text-25 font-title text-right">
                    <button type="button" onClick={toggleAbout}>
                      {about.title}
                    </button>
                    <span className="br"></span>
                    <button type="button" onClick={toggleContact}>
                      {contact.title}
                    </button>
                    <span className="br"></span>
                    <button type="button" onClick={toggleStaff}>
                      Staff
                    </button>
                  </div>
                </div>
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
            onClick={toggleInfo}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default InfoDrawer;
