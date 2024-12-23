import '../../styles/globals.scss';
import '../../styles/color.scss';
import '../../styles/typography.module.scss';
import { SystemProvider } from 'src/config/system-provider/system.provider';
import { AppPropsWithLayout } from 'src/shared/models/next.types';
import { AdminLayout } from '../widgets/admin-layout';
import { useHandleError } from '../shared/models/error';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const handleError = useHandleError();

  const renderLayout =
    Component.getLayout ?? (page => <AdminLayout>{page}</AdminLayout>);

  return (
    <SystemProvider onError={handleError} pageProps={pageProps}>
      <Head>
        <title>S-Group</title>
      </Head>
      {renderLayout(<Component {...pageProps} />)}
    </SystemProvider>
  );
}

export default MyApp;
