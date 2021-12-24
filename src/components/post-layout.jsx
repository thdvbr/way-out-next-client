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
  HeaderGold,
} from './index';

export default function PostLayout({ preview, children }) {
  const width = useCurrentWidth();
  const variants = {
    opened: { x: width > 500 ? '-30vw' : 0 },
    closed: { x: 0 },
  };
  const { infoIsOpen, isTop } = useAppContext();

  return (
    <>
      {/* <Meta /> */}
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
          <Breakpoint customQuery="(min-width: 500px)">
            <Container>
              <HeaderGold />
              <SectionSeparator />
              <InfoDrawer />
            </Container>
          </Breakpoint>
          
          <div className="sticky top-0 z-30">
            <Container>
              <Breakpoint customQuery="(max-width: 500px)">
                <NavbarMobile />
                <InfoDrawer />
              </Breakpoint>
              <Breakpoint customQuery="(min-width: 500px)">
                <div style={{ color: isTop && '#8A7536' }}>
                  <NavbarDesktop />
                </div>
              </Breakpoint>
            </Container>
          </div>
          <main className="w-screen inset-0 z-0">{children}</main>
        </motion.div>
      </div>
      <Breakpoint customQuery="(min-width: 500px)">
        <Footer />
      </Breakpoint>
    </>
  );
}
