import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { FullLoader } from '../../shared/ui/Loader/Full/FullLoader';
import { PostOverviewTable } from '../../features/posts/posts-table';
import { PaginatePostContainer } from '../../features/posts/paginate-posts';

export default function PostOverviewPage(): ReactElement {
  return (
    <Card className={'space-y-4'}>
      <FullLoader isLoading={false} />
      <ContentHeader
        main={'Posts management'}
        brief={'Where you can create, update and change posts'}
      />
      <PaginatePostContainer />
      <PostOverviewTable />
    </Card>
  );
}
