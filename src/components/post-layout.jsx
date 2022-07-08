import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrentWidth, Breakpoint } from 'react-socks';
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

export default function PostLayout({ preview, children }) {
  const width = useCurrentWidth();
  const infoVariants = {
    opened: { x: width > 500 ? '-30vw' : 0 },
    closed: { x: 0 },
  };
  const { infoIsOpen, isTop, searchIsOpen, joinIsOpen, setJoinIsOpen } =
    useAppContext();
  useEffect(() => {
    console.log(joinIsOpen);
    if (preview) {
      setJoinIsOpen(true);
    }
  }, []);
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
        <Breakpoint customQuery="(max-width: 499px)">
          <div className="sticky top-0 z-30">
            <Container>
              <NavbarMobile />
              <InfoDrawer />
            </Container>
          </div>
          <main className="w-screen inset-0 z-0">{children}</main>
        </Breakpoint>
        <Breakpoint customQuery="(min-width: 500px)">
          <motion.div
            initial={false}
            variants={joinVariants}
            animate={joinIsOpen ? 'opened' : 'closed'}
            transition={{ type: 'spring', duration: 0.5 }}>
            <Subscribe />

            <Container>
              <div className="px-3">
                <Header />
              </div>
              <InfoDrawer />
              <div className="sticky top-80 z-30">
                {/* need to figure out how to change colours to gold when its preview mode  */}
                <div style={{ color: isTop && '#8A7536' }}>
                  <NavbarDesktop />
                  <Link href="/">
                    <a
                      href="/"
                      className="flex left-0 right-0 top-18 justify-center absolute">
                      <div
                        className="logo-gold-container mt-3"
                        style={{ opacity: isTop ? 1 : 0 }}
                      />
                    </a>
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
        </Breakpoint>
        {/* </motion.div> */}
      </div>
    </>
  );
}
