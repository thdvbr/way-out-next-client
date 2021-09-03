import React from 'react';
import Head from 'next/head';
import { useCurrentWidth, Breakpoint } from 'react-socks';
import { motion } from 'framer-motion';
import AlertPreview from './alert-preview';
import Footer from './footer';
import { useAppContext } from '../context/state';
// eslint-disable-next-line import/no-cycle
import {
  InfoDrawerWithoutSSR,
  NavbarMobile,
  NavbarDesktop,
  SectionSeparator,
  Container,
} from './index';
import Header from './header';

export default function Layout({ preview, children }) {
  const width = useCurrentWidth();
  const variants = {
    opened: { x: width > 500 ? '-30vw' : 0 },
    closed: { x: 0 },
  };
  const { infoIsOpen } = useAppContext();
  return (
    <>
      {/* <Meta /> */}
      <div
        className="min-h-screen">
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
          <div className="sticky top-0 z-30 py-3">
            <Container>
              <Breakpoint xs only>
                <NavbarMobile />
                <InfoDrawerWithoutSSR />
              </Breakpoint>
              <Breakpoint s up>
                <Header />
                <SectionSeparator />
                <NavbarDesktop />
                <InfoDrawerWithoutSSR />
              </Breakpoint>
            </Container>
          </div>
          <main className="w-screen inset-0 z-0">{children}</main>
        </motion.div>
      </div>
      <Breakpoint s up>
        <Footer />
      </Breakpoint>
    </>
  );
}
