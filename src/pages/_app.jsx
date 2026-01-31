import React from 'react';
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
  );
}
MyApp.getInitialProps = async (appContext, preview) => {
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
