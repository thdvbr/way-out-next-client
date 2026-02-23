/* eslint-disable */

import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { motion, useAnimation } from 'framer-motion';
import { sample } from '../utils/random';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AlertPreview from './alert-preview';
import { useUIContext } from '../context/ui-context';
import { useDataContext } from '../context/data-context';

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
  showBottomAd = true,
}) {
  const { joinIsOpen, errorMsg, isLoading, hasMorePosts } = useUIContext();
  const { bottomAdData } = useDataContext();
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
  // console.log('=== AD RENDER CHECK ===');
  // console.log('isLoading:', isLoading);
  // console.log('randomSliceBottomAd:', randomSliceBottomAd);
  // console.log('hasMorePosts:', hasMorePosts);
  // console.log(
  //   'Should show ad?',
  //   !isLoading && randomSliceBottomAd && !hasMorePosts
  // );
  // run when bottomAdData first loads
  // run on every page navigation = asPath
  // only set the state when theres actually data to work with
  useEffect(() => {
    // console.log('Layout useEffect triggered!', { bottomAdData, asPath });
    if (bottomAdData && bottomAdData.length > 0) {
      const newRandomSlice = sample(bottomAdData);
      setRandomSliceBottomAd(newRandomSlice);
    }
  }, [bottomAdData, asPath]);

  return (
    <>
      {/* <Meta /> */}
      <div
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
          <link rel="icon" href="/favicon.ico" />
          {/* add favicon to directly in the /public folder - favicon.ico or favicon.png */}
        </Head>
        {/* MOBILE */}
        <div className="block sm:hidden">
          <div className="sticky top-0 z-30">
            <Container>
              <NavbarMobile theme={theme} />
              <InfoDrawer />
            </Container>
          </div>
          <main className="inset-0 z-0 w-screen">{children}</main>
          {showBottomAd ? (
            <div
              className={`${errorMsg !== '' && 'absolute inset-x-0'}`}
              style={{ bottom: '60px' }}>
              <div ref={ref}>
                {!isLoading && !hasMorePosts && (
                  <>
                    <Subscribe />
                    {randomSliceBottomAd && (
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
                    )}
                    <Footer theme={theme} />
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <Subscribe />
              <Footer theme={theme} />
            </>
          )}
        </div>

        {/* desktop */}
        <div className="hidden sm:block">
          <InfoDrawer />
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
              <NavbarDesktop theme={theme} />
            </Container>
            <main className="z-0 flex-1 -mt-3">{children}</main>
            {showBottomAd && (
              <div className="relative mt-10 overflow-visible">
                <div ref={ref}>
                  {!isLoading && randomSliceBottomAd && !hasMorePosts && (
                    <>
                      <Container>
                        <motion.div
                          className="flex justify-center px-3 mt-10"
                          animate={animation}
                          variants={adVariants}
                          initial="hidden">
                          <BottomAdImage
                            image={randomSliceBottomAd.adImage}
                            url={randomSliceBottomAd.adUrl}
                            width={1500}
                          />
                        </motion.div>
                      </Container>
                    </>
                  )}
                </div>
              </div>
            )}
            <Footer theme={theme} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
