import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from 'src/shared/models/next.types';
import { PublicLayout } from '../../widgets/public-layout/ui/PublicLayout/PublicLayout';
import { RuleDetail } from '../../features/documents/rule-details/ui/RuleDetail';

const RulePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Thông báo ở S-Group</title>
      </Head>

      <RuleDetail />
    </>
  );
};

RulePage.getLayout = page => <PublicLayout>{page}</PublicLayout>;

export default RulePage;
