import React from 'react';
import '../../styles/index.css';
import { AppWrapper } from '../context/state';

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp;
