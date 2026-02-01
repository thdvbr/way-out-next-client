/* eslint-disable */

import React, { useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AlertPreview from './alert-preview';
import Header from './header';
import { useAppContext } from '../context/state';
import {
  InfoDrawer,
  NavbarMobile,
  NavbarDesktop,
  Container,
  Subscribe,
  Footer,
} from './index';
import { joinVariants } from '../utils/animation';
import useWindowWidth from '../utils/useWindowWidth';

export default function RadioLayout({ preview, children, theme }) {
  const width = useWindowWidth();
  const { joinIsOpen, setJoinIsOpen } = useAppContext();

  useEffect(() => {
    // Don't open join on radio pages
    setJoinIsOpen(false);
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        {preview && <AlertPreview />}
        <Head>
          <title>Way Out Mag - Radio</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        {/* MOBILE */}
        {width < 500 && (
          <>
            <div className="top-0 z-30 flex-shrink-0">
              <Container>
                <NavbarMobile theme={theme} />
                <InfoDrawer />
              </Container>
            </div>
            <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
          </>
        )}

        {/* DESKTOP */}
        {width >= 500 && (
          <motion.div
            style={{ marginBottom: '-60px' }}
            initial={false}
            variants={joinVariants}
            animate={joinIsOpen ? 'opened' : 'closed'}
            transition={{ type: 'spring', duration: 0.5 }}
            className="flex flex-col flex-1 min-h-0">
            <Subscribe />

            <div className="flex-shrink-0">
              <Container>
                <Header theme={theme} />
              </Container>
              <InfoDrawer />

              <Container>
                <NavbarDesktop theme={theme} />
              </Container>

              <main className="flex-1 min-h-0 px-3 mx-auto mb-32 xl:container md:px-8 ml:px-40">
                {children}
              </main>
            </div>
          </motion.div>
        )}

        {/* Footer section - constrained height */}
        <div className="relative flex-shrink-0 h-28">
          {/* Sticky Player */}
          <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-black border-t border-white">
            sticky player
          </div>

          {/* Footer - translateY pulls it up into view */}
          <div className="absolute left-0 right-0">
            <Footer theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}
