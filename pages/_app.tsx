import React, { useEffect } from 'react';

import type { AppProps } from 'next/app';

import { setFontSize } from 'utils/common';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setFontSize();
    window.addEventListener('resize', setFontSize);
    return () => {
      window.removeEventListener('resize', setFontSize);
    };
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
