/* eslint-disable */

import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { motion, useAnimation } from 'framer-motion';
import { sample } from '../utils/random';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AlertPreview from './alert-preview';
import { useAppContext } from '../context/state';
import useWindowWidth from '../utils/useWindowWidth';

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
import Header from './header';
import { joinVariants, adVariants } from '../utils/animation';

export default function Layout({
  preview,
  children,
  theme = 'light',
  page = '',
}) {
  const width = useWindowWidth();
  const infoVariants = {
    opened: { x: width > 500 ? '-30vw' : 0 },
    closed: { x: 0 },
  };
  const {
    infoIsOpen,
    joinIsOpen,
    setJoinIsOpen,
    bottomAdData,
    errorMsg,
    isLoading,
    hasMorePosts,
    setHasMorePosts,
  } = useAppContext();
  const { asPath, pathname } = useRouter();

  const { ref, inView } = useInView();
  const animation = useAnimation();
  const [randomSliceBottomAd, setRandomSliceBottomAd] = useState({});

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    }
    if (!inView) {
      animation.start('hidden');
    }
  }, [inView, animation]);
  console.log('=== AD RENDER CHECK ===');
  console.log('isLoading:', isLoading);
  console.log('randomSliceBottomAd:', randomSliceBottomAd);
  console.log('hasMorePosts:', hasMorePosts);
  console.log(
    'Should show ad?',
    !isLoading && randomSliceBottomAd && !hasMorePosts
  );
  // run when bottomAdData first loads
  // run on every page navigation = asPath
  // only set the state when theres actually data to work with
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
      <motion.div
        className="min-h-screen"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
      >
        {/* <motion.div
          initial={false}
          variants={infoVariants}
          animate={infoIsOpen ? 'opened' : 'closed'}
          transition={{ type: 'spring', duration: 1 }}> */}
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
            {' '}
            <div className="sticky top-0 z-30">
              <Container>
                <NavbarMobile theme={theme} />
                <InfoDrawer />
              </Container>
            </div>
            <main className="inset-0 z-0 w-screen">{children}</main>
            {page === 'radiomain' ? (
              <Footer theme={theme} />
            ) : (
              <div
                className={`${errorMsg !== '' && 'absolute inset-x-0'}`}
                style={{ bottom: '60px' }}>
                {!isLoading && <Subscribe />}
                {!isLoading && randomSliceBottomAd && !hasMorePosts && (
                  <>
                    <motion.div
                      className="flex justify-center px-3 mb-2"
                      ref={ref}
                      animate={animation}
                      variants={adVariants}
                      initial="hidden">
                      <BottomAdImage
                        image={randomSliceBottomAd.adImageMobile}
                        url={randomSliceBottomAd.adUrl}
                        width={500}
                      />
                    </motion.div>

                    <Footer theme={theme} />
                  </>
                )}
              </div>
            )}{' '}
          </>
        )}
        {/* desktop */}
        {width >= 500 && (
          <motion.div
            className="flex flex-col min-h-screen"
            initial={false}
            variants={joinVariants}
            animate={joinIsOpen ? 'opened' : 'closed'}
            transition={{ type: 'linear', duration: 0.3 }}>
            <Subscribe />
            <Container>
              <div className="px-3">
                <Header theme={theme} />
                <SectionSeparator />
              </div>
              <InfoDrawer />
              <NavbarDesktop theme={theme} page={page} />
            </Container>
            <main className="z-0 flex-1 w-screen -mt-3">{children}</main>
            {page === 'radiomain' ? (
              <Footer theme={theme} />
            ) : (
              <>
                {!isLoading && randomSliceBottomAd && !hasMorePosts && (
                  <>
                    <motion.div
                      className="flex justify-center px-3 mt-10 sm:px-6 md:px-11 ml:px-40 lg:px-44 xl:container xl:mx-auto"
                      ref={ref}
                      animate={animation}
                      variants={adVariants}
                      initial="hidden">
                      <BottomAdImage
                        image={randomSliceBottomAd.adImage}
                        url={randomSliceBottomAd.adUrl}
                        width={1500}
                      />
                    </motion.div>
                    <Footer theme={theme} />
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
