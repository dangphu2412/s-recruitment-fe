import '../../styles/globals.scss';
import '../../styles/color.scss';
import '../../styles/typography.module.scss';
import { SystemProvider } from 'src/config/system-provider/system.provider';
import { AppPropsWithLayout } from 'src/shared/models/next.types';
import { AdminLayout } from '../widgets/admin-layout';
import { useExceptionHandler } from '../shared/models/exception';
import React from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/next';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const handleError = useExceptionHandler();

  const renderLayout =
    Component.getLayout ?? (page => <AdminLayout>{page}</AdminLayout>);

  return (
    <SystemProvider onError={handleError} pageProps={pageProps}>
      <Head>
        <title>S-Group</title>
      </Head>
      {renderLayout(<Component {...pageProps} />)}
      <Analytics mode="production" />
    </SystemProvider>
  );
}

export default MyApp;
