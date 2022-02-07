import React from 'react';
import Head from 'next/head';
import { useCurrentWidth, Breakpoint } from 'react-socks';
import { motion } from 'framer-motion';
import AlertPreview from './alert-preview';
import Footer from './footer';
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
import Header from './header';
import { joinVariants } from '../utils/animation';

export default function Layout({ preview, children }) {
  const width = useCurrentWidth();
  const infoVariants = {
    opened: { x: width > 500 ? '-30vw' : 0 },
    closed: { x: 0 },
  };
  const { infoIsOpen, joinIsOpen } = useAppContext();

  // if yOffset === 0 && color: gold
  return (
    <>
      {/* <Meta /> */}
      <div className="min-h-screen">
        {preview && <AlertPreview />}
        <motion.div
          initial={false}
          variants={infoVariants}
          animate={infoIsOpen ? 'opened' : 'closed'}
          transition={{ type: 'spring', duration: 1 }}>
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
          {/* desktop */}
          <Breakpoint customQuery="(min-width: 500px)">
            <motion.div
              initial={false}
              variants={joinVariants}
              animate={joinIsOpen ? 'opened' : 'closed'}
              transition={{ type: 'linear', duration: 0.3 }}>
              <Subscribe />
              <Container>
                <div className="px-3">
                  <Header />
                  <SectionSeparator />
                </div>
                <InfoDrawer />
                <NavbarDesktop />
              </Container>
              <main className="w-screen inset-0 z-0">{children}</main>
            </motion.div>
          </Breakpoint>
        </motion.div>
      </div>
    </>
  );
}
