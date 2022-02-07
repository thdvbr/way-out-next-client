import React, { useEffect } from 'react';
import Head from 'next/head';
import { useCurrentWidth, Breakpoint } from 'react-socks';
import { motion, useAnimation } from 'framer-motion';
import _ from 'lodash';
import { useInView } from 'react-intersection-observer';
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
  const randomSlice1 = _.sample(bottomAds);
  const { ref, inView } = useInView();
  const animation = useAnimation();

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
      <div className="min-h-screen">
        {preview && <AlertPreview />}
        <motion.div
          initial={false}
          variants={infoVariants}
          animate={infoIsOpen ? 'opened' : 'closed'}
          transition={{ type: 'spring', duration: 1 }}>
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
              <main className="w-screen inset-0 z-0">{children}</main>
              {bottomAds && (
                <motion.div
                  className="flex justify-center px-3 mb-16 md:px-8 ml:px-14 lg:px-16"
                  ref={ref}
                  animate={animation}
                  variants={adVariants}
                  initial="hidden">
                  {width > 500 ? (
                    <BottomAdImage
                      image={randomSlice1.adImage}
                      url={randomSlice1.adUrl}
                      width={1360}
                    />
                  ) : (
                    <BottomAdImage
                      image={randomSlice1.adImageMobile}
                      url={randomSlice1.adUrl}
                      width={500}
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          </Breakpoint>
        </motion.div>
      </div>
    </>
  );
}
