import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import Providers from '@/providers';
import '@/styles/globals.css';
import LayoutProvider from '@/providers/layout.provider';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <title>X Stack</title>
      </Head>
      <Providers>
        <LayoutProvider>
          <Component {...pageProps} />
        </LayoutProvider>
      </Providers>
    </React.Fragment>
  );
};

export default App;
