import React from 'react';
import Head from 'next/head';
import '../../styles/index.css';
import { AnimatePresence } from 'framer-motion';
import { UIProvider } from '../context/ui-context';
import { DataProvider } from '../context/data-context';

function MyApp({ Component, pageProps, router }) {
  const {
    pageData, staffData, bottomAds, sideAds, ...rest
  } = pageProps;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        {/* remove this line before launch for SEO!! */}
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="WAY OUT is an independent magazine and platform for artists, eccentrics, and experts."
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <AnimatePresence exitBeforeEnter initial={false}>
        <UIProvider>
          <DataProvider
            pageData={pageData}
            staffData={staffData}
            bottomAds={bottomAds}
            sideAds={sideAds}>
            <Component {...rest} key={router.route} />
          </DataProvider>
        </UIProvider>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
