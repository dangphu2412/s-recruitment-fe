import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from 'src/shared/models/next.types';
import { PublicLayout } from '../../widgets/public-layout/ui/PublicLayout/PublicLayout';
import { CategoryOverview } from '../../features/documents/category/ui/CategoryOverview';

const CategoryPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Danh mục ở S-Group</title>
      </Head>

      <CategoryOverview />
    </>
  );
};

CategoryPage.getLayout = page => <PublicLayout>{page}</PublicLayout>;

export default CategoryPage;
