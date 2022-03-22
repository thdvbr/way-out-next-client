import React, { useEffect } from 'react';
import Head from 'next/head';
import { useCurrentWidth, Breakpoint } from 'react-socks';
import { motion, useAnimation } from 'framer-motion';
import _ from 'lodash';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AlertPreview from './alert-preview';
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
} from './index';
import Header from './header';
import { joinVariants, adVariants } from '../utils/animation';

export default function Layout({ preview, bottomAds, children }) {
  const width = useCurrentWidth();
  const infoVariants = {
    opened: { x: width > 500 ? '-30vw' : 0 },
    closed: { x: 0 },
  };
  const { infoIsOpen, joinIsOpen } = useAppContext();
  const { asPath, pathname } = useRouter();

  const randomSlice1 = _.sample(bottomAds);
  const { ref, inView } = useInView();
  const animation = useAnimation();
  // let randomSlice1;
  // useEffect(() => {
  //   randomSlice1 = _.sample(bottomAds);
  //   console.log(randomSlice1);
  // }, [])

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    }
    if (!inView) {
      animation.start('hidden');
    }
  }, [inView, animation]);

  // if yOffset === 0 && color: gold
  return (
    <>
      {/* <Meta /> */}
      <motion.div
        className="min-h-screen"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
      >
        {preview && <AlertPreview />}
        {/* <motion.div
          initial={false}
          variants={infoVariants}
          animate={infoIsOpen ? 'opened' : 'closed'}
          transition={{ type: 'spring', duration: 1 }}> */}
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
          <div className={pathname === '/search' ? 'fixed bottom-0' : undefined}>
            <Subscribe />
            {randomSlice1 && (
              <motion.div
                className="flex justify-center px-3 mb-16 md:px-8 ml:px-20 lg:px-28"
                ref={ref}
                animate={animation}
                variants={adVariants}
                initial="hidden">
                <BottomAdImage
                  image={randomSlice1.adImageMobile}
                  url={randomSlice1.adUrl}
                  width={500}
                />
              </motion.div>
            )}
          </div>
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
            <main className="w-screen inset-0 z-0 -mt-3">{children}</main>
            {randomSlice1 && (
              <motion.div
                className="flex justify-center px-3 mb-16 md:px-8 ml:px-20 lg:px-28"
                ref={ref}
                animate={animation}
                variants={adVariants}
                initial="hidden">
                <BottomAdImage
                  image={randomSlice1.adImage}
                  url={randomSlice1.adUrl}
                  width={1360}
                />
              </motion.div>
            )}
          </motion.div>
        </Breakpoint>
        {/* </motion.div> */}
      </motion.div>
    </>
  );
}
