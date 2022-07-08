import React from 'react';
import '../../styles/index.css';
import App from 'next/app';
import { BreakpointProvider } from 'react-socks';
import { AnimatePresence } from 'framer-motion';
import { getClient } from '../utils/sanity.server';
import {
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery
} from '../utils/queries';
import { AppWrapper } from '../context/state';

function MyApp({ Component, pageProps, router, pageData, staffData, bottomAdData, sideAdData }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <AppWrapper pageData={pageData} staffData={staffData} bottomAdData={bottomAdData} sideAdData={sideAdData}>
        <BreakpointProvider>
          <Component {...pageProps} key={router.route} />
        </BreakpointProvider>
      </AppWrapper>
    </AnimatePresence>
  );
}
MyApp.getInitialProps = async (appContext, preview) => {
  const pageProps = await App.getInitialProps(appContext);
  const pageData = await getClient(preview).fetch(pageQuery);
  const staffData = await getClient(preview).fetch(staffQuery);
  const bottomAdData = await getClient(preview).fetch(bottomAdQuery);
  const sideAdData =  await getClient(preview).fetch(sideAdQuery);
  return { ...pageProps, pageData, staffData, bottomAdData, sideAdData }
}

export default MyApp;
