import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
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

  const staffsOdd = staffsData.filter((e, i) => i % 2);
  const staffsEven = staffsData.filter((e, i) => !(i % 2));

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
            className="fixed info-box w-full h-full z-60"
            style={
              width > 768
                ? { right: 0, maxWidth: '42vw' }
                : { right: 0, maxWidth: '100vw' }
            }>
            {/* TODO: Add noise to radial gradiant */}
            <div
              className="absolute top-0 p-5 radial-gradient"
              style={{
                background: `radial-gradient(farthest-side at ${x}px ${y}px, #FFFF00, #C4C4C4)`,
              }}>
              {/* <div>{JSON.stringify(mouse, null, 2)}</div> */}
              <div className="absolute top-2 sm:top-4 xl:top-10 right-2 sm:right-10 md:right-2 lg:right-8 p-3 xl:right-20 ">
                <button type="button" onClick={toggleInfo}>
                  <MdClose size={32} />
                </button>
              </div>
              <div className="p-2 sm:p-10 pt-20 sm:pt-32 md:p-2 lg:p-8 md:pt-24 lg:pt-32 xl:p-20 xl:pt-48 flex">
                <div className="w-8/12">
                  {aboutIsOpen && (
                    <div className="text-justify pt-2 text-14 sm:text-18">
                      <Content body={about.body} />
                    </div>
                  )}
                  {contactIsOpen && (
                    <div className="text-justify pt-2 text-14 sm:text-18">
                      <Content body={contact.body} />
                      <Link href="/legal">
                        <a href="/legal" className="font-secondary underline">Legal</a>
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
                  <div className="text-20 sm:text-27 md:text-22 lg:text-27 font-title text-right">
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
