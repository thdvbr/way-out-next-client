import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AlertPreview from './alert-preview';
import Header from './header';
import { useAppContext } from '../context/state';
// eslint-disable-next-line import/no-cycle
import {
  InfoDrawer,
  NavbarMobile,
  NavbarDesktop,
  SectionSeparator,
  Container,
  Subscribe,
} from './index';
import { joinVariants } from '../utils/animation';
import useWindowWidth from '../utils/useWindowWidth';

export default function PostLayout({ preview, children }) {
  const width = useWindowWidth();
  // const infoVariants = {
  //   opened: { x: width > 500 ? '-30vw' : 0 },
  //   closed: { x: 0 },
  // };
  const {
    isTop, searchIsOpen, joinIsOpen, setJoinIsOpen,
  } = useAppContext();
  useEffect(() => {
    if (preview) {
      setJoinIsOpen(true);
    }
  }, [preview, setJoinIsOpen]);
  return (
    <>
      {/* <Meta /> */}
      <div className="min-h-screen">
        {preview && <AlertPreview />}
        {/* <motion.div
          initial={false}
          variants={infoVariants}
          animate={infoIsOpen ? 'opened' : 'closed'}
          transition={{ type: 'spring', duration: 1 }}> */}
        <Head>
          <title>Way Out Mag</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {/* MOBILE */}
        {width < 500 && (
          <>
            <div className="sticky top-0 z-30">
              <Container>
                <NavbarMobile />
                <InfoDrawer />
              </Container>
            </div>
            <main className="inset-0 z-0 w-screen">{children}</main>
          </>
        )}
        {/* desktop */}
        {width >= 500 && (
          <motion.div
            initial={false}
            variants={joinVariants}
            animate={joinIsOpen ? 'opened' : 'closed'}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <Subscribe />

            <Container>
              <div className="px-3">
                <Header />
              </div>
              <InfoDrawer />
              <div className="sticky z-30 top-80">
                {/* need to figure out how to change colours to gold when its preview mode  */}
                <div style={{ color: isTop && '#8A7536' }}>
                  <NavbarDesktop />
                  <Link
                    href="/"
                    className="absolute left-0 right-0 flex justify-center top-18"
                  >
                    <div
                      className="mt-3 logo-gold-container"
                      style={{ opacity: isTop ? 1 : 0 }}
                    />
                  </Link>
                </div>
              </div>
              {!searchIsOpen && (
                <div className="px-3">
                  <SectionSeparator />
                </div>
              )}
              <main className="inset-0 z-0">{children}</main>
            </Container>
          </motion.div>
        )}
        {/* </motion.div> */}
      </div>
    </>
  );
}
