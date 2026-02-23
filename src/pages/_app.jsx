import React from 'react';
import Head from 'next/head';
import '../../styles/index.css';
import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { AppWrapper } from '../context/state';

function MyApp({ Component, pageProps, router }) {
  const { pageData, staffData, bottomAds, sideAds, ...rest } = pageProps;
  return (
    <>
      {' '}
      <Head>
        <link rel="icon" href="/assets/favicons/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicons/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicons/apple-touch-icon.png"
        />
        <link
          rel="android-chrome-192x192"
          sizes="192x192"
          href="/assets/favicons/android-chrome-192x192.png"
        />
      </Head>
      <AnimatePresence exitBeforeEnter initial={false}>
        <AppWrapper
          pageData={pageData}
          staffData={staffData}
          bottomAds={bottomAds}
          sideAds={sideAds}>
          <Component {...rest} key={router.route} />
        </AppWrapper>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
