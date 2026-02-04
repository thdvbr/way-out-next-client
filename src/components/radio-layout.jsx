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
  MixcloudWidget,
} from './index';
import { joinVariants } from '../utils/animation';
import useWindowWidth from '../utils/useWindowWidth';

export default function RadioLayout({
  preview,
  children,
  theme,
  url,
  showPlayer,
}) {
  const width = useWindowWidth();
  const { joinIsOpen, setJoinIsOpen } = useAppContext();

  useEffect(() => {
    // Don't open join on radio pages
    setJoinIsOpen(false);
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden h-screen-safe">
        {preview && <AlertPreview />}
        <Head>
          <title>Way Out Mag - Radio</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width viewport-fit=cover"
          />
        </Head>

        {/* MOBILE and TABLETS */}
        {width < 1025 && (
          <>
            <div className="top-0 z-30 flex-shrink-0">
              <Container>
                <NavbarMobile theme={theme} />
                <InfoDrawer />
              </Container>
            </div>
            <main className="flex flex-1 min-h-0 mx-auto overflow-y-auto ">
              {children}
            </main>
          </>
        )}

        {/* DESKTOP */}
        {width >= 1025 && (
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
                <div className="px-3">
                  <Header theme={theme} />
                </div>
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
        <div
          className="relative flex-shrink-0 sticky-footer-radio"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {/* Sticky Player - only show if showPlayer is true */}
          {showPlayer && (
            <div className="absolute top-0 left-0 right-0 z-50 mixcloud-widget">
              <MixcloudWidget url={url} />
            </div>
          )}

          {/* Footer - translateY pulls it up into view */}
          <div className="absolute left-0 right-0">
            <Footer theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}
