import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import Content from './content';
import Staff from './staff';
import useWindowWidth from '../utils/useWindowWidth';

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
  const width = useWindowWidth();
  const {
    infoIsOpen, setInfoIsOpen, pageData, staffData,
  } = useAppContext();
  const { about, contact } = pageData;
  const { x, y } = useCustomMouse();
  const [aboutIsOpen, setAboutIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [staffIsOpen, setStaffIsOpen] = useState(false);

  const staffsOdd = staffData.filter((e, i) => i % 2);
  const staffsEven = staffData.filter((e, i) => !(i % 2));

  const toggleSection = (section) => {
    setAboutIsOpen(section === 'about' ? !aboutIsOpen : false);
    setContactIsOpen(section === 'contact' ? !contactIsOpen : false);
    setStaffIsOpen(section === 'staff' ? !staffIsOpen : false);
    setInfoIsOpen(section ? true : !infoIsOpen);
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
    if (infoIsOpen) {
      moveToTop();
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [infoIsOpen]);

  return (
    <AnimatePresence>
      {infoIsOpen && (
        <>
          {/* TODO: Think about what to do with the width of info box */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
            className="fixed w-full h-full info-box z-60"
            style={
              width > 768
                ? { right: 0, maxWidth: '42vw' }
                : { right: 0, maxWidth: '100vw' }
            }
          >
            {/* TODO: Add noise to radial gradiant */}
            <div
              className="absolute top-0 p-5 radial-gradient"
              style={{
                background: `radial-gradient(farthest-side at ${x}px ${y}px, #FFFF00, #C4C4C4)`,
              }}
            >
              {/* <div>{JSON.stringify(mouse, null, 2)}</div> */}
              <div className="absolute p-3 top-2 sm:top-4 xl:top-10 right-2 sm:right-10 md:right-2 lg:right-8 xl:right-20 ">
                <button type="button" onClick={() => toggleSection(false)}>
                  <MdClose size={32} />
                </button>
              </div>
              <div className="flex p-2 pt-20 sm:p-10 sm:pt-32 md:p-2 lg:p-8 md:pt-24 lg:pt-32 xl:p-20 xl:pt-48">
                <div className="w-8/12">
                  {aboutIsOpen && (
                    <div className="pt-2 text-justify text-14 sm:text-18">
                      <Content body={about.body} />
                    </div>
                  )}
                  {contactIsOpen && (
                    <div className="pt-2 text-justify text-14 sm:text-18">
                      <Content body={contact.body} />
                      <Link href="/legal" className="underline font-secondary">
                        Legal
                      </Link>
                    </div>
                  )}
                  {staffIsOpen && (
                    <>
                      <div className="flex justify-between pt-2">
                        <div className="text-left">
                          {staffsOdd.map((staff) => (
                            <div key={staff._id} className="pb-4">
                              <Staff name={staff.staffName} role={staff.role} />
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          {staffsEven.map((staff) => (
                            <div key={staff._id} className="pb-4">
                              <Staff name={staff.staffName} role={staff.role} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-4/12">
                  <div className="text-right text-20 sm:text-27 md:text-22 lg:text-27 font-title">
                    <button
                      type="button"
                      onClick={() => toggleSection('about')}
                    >
                      {about.title}
                    </button>
                    <span className="br" />
                    <button
                      type="button"
                      onClick={() => toggleSection('contact')}
                    >
                      {contact.title}
                    </button>
                    <span className="br" />
                    <button
                      type="button"
                      onClick={() => toggleSection('staff')}
                    >
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
            onClick={() => toggleSection(true)}
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full px-5 bg-transparent"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default InfoDrawer;
