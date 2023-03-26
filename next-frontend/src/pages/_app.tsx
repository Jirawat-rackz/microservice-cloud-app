import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import Providers from '@/providers';
import '@/styles/globals.css';
import connectPocketBase from '@/helpers/connect-pocketbase.helper';
import { useRouter } from 'next/router';
import axios from 'axios';

export const pb = connectPocketBase();

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [pb.authStore.isValid]);

  return (
    <React.Fragment>
      <Head>
        <title>X-Stack</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </React.Fragment>
  );
};

export default App;
