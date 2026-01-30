import React from 'react';
import dynamic from 'next/dynamic';
import '../../styles/index.css';
import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { getClient } from '../utils/sanity.server';
import {
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery
} from '../utils/queries';
import { AppWrapper } from '../context/state';

// Dynamically import BreakpointProvider so it only runs on the client
const BreakpointProvider = dynamic(
  () => import('react-socks').then((mod) => mod.BreakpointProvider),
  { ssr: false }
);

function MyApp({ Component, pageProps, router, pageData, staffData, bottomAds, sideAds }) {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <AppWrapper pageData={pageData} staffData={staffData} bottomAds={bottomAds} sideAds={sideAds}>
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
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  const sideAds =  await getClient(preview).fetch(sideAdQuery);
  return { ...pageProps, pageData, staffData, bottomAds, sideAds }
}

export default MyApp;
