import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from 'src/shared/models/next.types';
import { DocumentOverview } from '../../features/documents/document-overviews/ui/document-overview';
import { PublicLayout } from '../../widgets/public-layout/ui/PublicLayout/PublicLayout';

const DocumentPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Thông báo S-Group</title>
      </Head>

      <DocumentOverview />
    </>
  );
};

DocumentPage.getLayout = page => <PublicLayout>{page}</PublicLayout>;

export default DocumentPage;
