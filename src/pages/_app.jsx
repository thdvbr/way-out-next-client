import React from 'react';
import Head from 'next/head';
import '../../styles/index.css';
import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { getClient } from '../utils/sanity.server';
import {
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery,
} from '../utils/queries';
import { AppWrapper } from '../context/state';

function MyApp({
  Component,
  pageProps,
  router,
  pageData,
  staffData,
  bottomAds,
  sideAds,
}) {
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
          sideAds={sideAds}
        >
          <Component {...pageProps} key={router.route} />
        </AppWrapper>
      </AnimatePresence>
    </>
  );
}
MyApp.getInitialProps = async (appContext) => {
  const preview = false; // default to false
  const pageProps = await App.getInitialProps(appContext);
  const pageData = await getClient(preview).fetch(pageQuery);
  const staffData = await getClient(preview).fetch(staffQuery);
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  const sideAds = await getClient(preview).fetch(sideAdQuery);
  return {
    ...pageProps,
    pageData,
    staffData,
    bottomAds,
    sideAds,
  };
};

export default MyApp;
