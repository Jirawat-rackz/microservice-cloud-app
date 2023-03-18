import React from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Providers from '@/providers';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useAuth } from '@/providers/auth.provider';
import LayoutProvider from '@/providers/layout.provider';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <React.Fragment>
      <Head>
        <title>X Stack</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Providers>
            <LayoutProvider>
              <Component {...pageProps} />
            </LayoutProvider>
          </Providers>
        </Hydrate>
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default App;
