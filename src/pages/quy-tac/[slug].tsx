import React from 'react';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { NextPageWithLayout } from 'src/shared/models/next.types';
import { PublicLayout } from '../../widgets/public-layout/ui/PublicLayout/PublicLayout';
import { RuleDetail } from '../../features/documents/rule-details/ui/RuleDetail';

const RulePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Quy tắc ở S-Group</title>
      </Head>

      <Container maxW="container.xl">
        <RuleDetail />
      </Container>
    </>
  );
};

RulePage.getLayout = page => <PublicLayout>{page}</PublicLayout>;

export default RulePage;
