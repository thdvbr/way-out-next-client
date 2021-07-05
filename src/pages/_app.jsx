import React from 'react';
import '../../styles/index.css';
import { AnimatePresence } from 'framer-motion';
import { AppWrapper } from '../context/state';

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <AppWrapper>
        <Component {...pageProps} key={router.route} />
      </AppWrapper>
    </AnimatePresence>
  );
}

export default MyApp;
