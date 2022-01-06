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

export default function Layout({ preview, children }) {
  const width = useCurrentWidth();
  const variants = {
    opened: { x: width > 500 ? '-30vw' : 0 },
    closed: { x: 0 },
  };
  const { infoIsOpen } = useAppContext();

  // if yOffset === 0 && color: gold
  return (
    <>
      {/* <Meta /> */}
      <Breakpoint s up>
        <Subscribe />
      </Breakpoint>
      <div className="min-h-screen">
        {preview && <AlertPreview />}
        <motion.div
          initial={false}
          variants={variants}
          animate={infoIsOpen ? 'opened' : 'closed'}
          transition={{ type: 'spring', duration: 1 }}>
          <Head>
            <title>Way Out Mag</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div className="sticky top-0 z-30">
            <Container>
              <Breakpoint customQuery="(max-width: 500px)">
                <NavbarMobile />
                <InfoDrawer />
              </Breakpoint>
            </Container>
          </div>
          <Breakpoint customQuery="(min-width: 500px)"></Breakpoint>
          <Container>
            <Breakpoint customQuery="(min-width: 500px)">
              <Header />
              <SectionSeparator />
              <InfoDrawer />
              <NavbarDesktop />
            </Breakpoint>
          </Container>

          <main className="w-screen inset-0 z-0">{children}</main>
        </motion.div>
      </div>
    </>
  );
}
