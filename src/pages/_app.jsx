import React from 'react';
import '../../styles/index.css';
import { BreakpointProvider } from 'react-socks';
import { AnimatePresence } from 'framer-motion';
import { AppWrapper } from '../context/state';

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <AppWrapper>
        <BreakpointProvider>
          <Component {...pageProps} key={router.route} />
        </BreakpointProvider>
      </AppWrapper>
    </AnimatePresence>
  );
}

export default MyApp;
