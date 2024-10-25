import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { FullLoader } from '../../shared/ui/Loader/Full/FullLoader';
import { PostOverviewTable } from '../../features/posts/posts-table';
import { PaginatePostContainer } from '../../features/posts/paginate-posts';
import { AddPostButton } from '../../features/posts/add-post';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export default function PostOverviewPage(): ReactElement {
  return (
    <Card className={'space-y-4'}>
      <FullLoader isLoading={false} />
      <ContentHeaderLayout>
        <ContentHeader
          main={'Posts management'}
          brief={'Where you can create, update and change posts'}
        />
        <HeaderActionGroup>
          <AddPostButton />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <PaginatePostContainer />
      <PostOverviewTable />
    </Card>
  );
}
