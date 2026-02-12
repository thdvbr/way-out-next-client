/* eslint-disable */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { sample } from '../utils/random';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AlertPreview from './alert-preview';
import Header from './header';
import { adVariants } from '../utils/animation';
import { useAppContext } from '../context/state';
// eslint-disable-next-line import/no-cycle
import {
  InfoDrawer,
  NavbarMobile,
  NavbarDesktop,
  SectionSeparator,
  Container,
  Subscribe,
  BottomAdImage,
  Footer,
} from './index';
import { joinVariants } from '../utils/animation';
import useWindowWidth from '../utils/useWindowWidth';

export default function PostLayout({ preview, children, theme }) {
  const width = useWindowWidth();
  const { isTop, searchIsOpen, joinIsOpen, setJoinIsOpen, bottomAdData } =
    useAppContext();
  const { asPath } = useRouter();
  const [randomSliceBottomAd, setRandomSliceBottomAd] = useState({});
  const { ref } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if (preview) {
      setJoinIsOpen(true);
    }
  }, []);

  useEffect(() => {
    console.log('Layout useEffect triggered!', { bottomAdData, asPath });
    if (bottomAdData && bottomAdData.length > 0) {
      const newRandomSlice = sample(bottomAdData);
      setRandomSliceBottomAd(newRandomSlice);
    }
  }, [bottomAdData, asPath]);

  return (
    <>
      {/* <Meta /> */}
      <div className="min-h-screen">
        {preview && <AlertPreview />}
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
                <NavbarMobile theme={theme} />
                <InfoDrawer />
              </Container>
            </div>
            <main className="inset-0 z-0 w-screen">{children}</main>
          </>
        )}
        {/* desktop */}
        {width >= 500 && (
          <>
            <InfoDrawer />
            <motion.div
              initial={false}
              variants={joinVariants}
              animate={joinIsOpen ? 'opened' : 'closed'}
              transition={{ type: 'spring', duration: 0.5 }}>
              <Subscribe />

              <Container>
                <div className="px-3">
                  <Header theme={theme} />
                </div>

                <div className="sticky z-30 top-80">
                  {/* need to figure out how to change colours to gold when its preview mode  */}
                  <div style={{ color: isTop && '#8A7536' }}>
                    <NavbarDesktop theme={theme} />
                    <Link
                      href="/"
                      className="absolute left-0 right-0 flex justify-center top-18">
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
          </>
        )}
        <div ref={ref}>
          {randomSliceBottomAd && (
            <Container>
              <motion.div
                className="flex justify-center px-3 mt-10"
                animate={animation}
                variants={adVariants}
                initial="hidden">
                {width > 500 ? (
                  <BottomAdImage
                    image={randomSliceBottomAd.adImage}
                    url={randomSliceBottomAd.adUrl}
                    width={1360}
                  />
                ) : (
                  <BottomAdImage
                    image={randomSliceBottomAd.adImageMobile}
                    url={randomSliceBottomAd.adUrl}
                    width={500}
                  />
                )}
              </motion.div>
            </Container>
          )}
          <Footer />
          {/* </motion.div> */}
        </div>
      </div>
    </>
  );
}
