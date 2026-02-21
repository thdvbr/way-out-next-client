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
      <div
        className={
          width < 1025
            ? 'flex flex-col h-screen overflow-hidden h-screen-safe'
            : ''
        }>
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
            <div className="top-0 flex-shrink-0 z-60">
              <Container>
                <NavbarMobile theme={theme} />
                <InfoDrawer />
              </Container>
            </div>
            <main className="flex flex-1 min-h-0 mx-auto overflow-y-auto ">
              {children}
            </main>
            <div
              className="relative flex-shrink-0 sticky-footer-radio"
              style={{
                paddingBottom: 'env(safe-area-inset-bottom)',
                height: showPlayer ? '109.38px' : '50.38px',
              }}>
              {/* Sticky Player - only show if showPlayer is true */}
              {/* Always render the widget, but hide until showPlayer is true */}
              <div
                className="absolute top-0 left-0 right-0 z-1 mixcloud-widget"
                style={{
                  height: '60px',
                  zIndex: 30, // Higher z-index
                  pointerEvents: 'auto', // Ensure clicks work
                  /* The commented out code `// visibility: showPlayer ? 'visible' : 'hidden', // height: showPlayer ?
'60px' : 0,` is setting the visibility and height of an element based on the value of the
`showPlayer` prop. */
                  visibility: showPlayer ? 'visible' : 'hidden',
                  height: showPlayer ? '60px' : 0,
                }}>
                <MixcloudWidget url={url} />
              </div>
              <div className="absolute left-0 right-0">
                <Footer theme={theme} showPlayer={showPlayer} />
              </div>
            </div>
          </>
        )}

        {/* DESKTOP */}
        {width >= 1025 && (
          <>
            <div className="overflow-hidden">
              <InfoDrawer />
              <motion.div
                initial={false}
                variants={joinVariants}
                animate={joinIsOpen ? 'opened' : 'closed'}
                transition={{ type: 'spring', duration: 0.5 }}>
                <Subscribe />

                <div className="flex-shrink-0">
                  <Container>
                    <div className="px-3">
                      <Header theme={theme} />
                    </div>
                    <NavbarDesktop theme={theme} />

                    <main className="my-8">{children}</main>
                  </Container>
                  <Footer theme={theme} showPlayer={showPlayer} />
                </div>
              </motion.div>
            </div>
            {/* Mixcloud fixed to bottom of viewport */}
            <div
              className="fixed bottom-0 left-0 right-0 z-40"
              style={{
                visibility: showPlayer ? 'visible' : 'hidden',
                height: showPlayer ? '60px' : 0,
              }}>
              <MixcloudWidget url={url} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
