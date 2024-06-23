import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { FullLoader } from '../../shared/ui/Loader/Full/FullLoader';
import { AddPostForm } from '../../features/posts/add-post/ui/AddPostForm';

export default function AddPostPage(): ReactElement {
  return (
    <div className={'space-y-2'}>
      <FullLoader isLoading={false} />

      <Card className={'space-y-4'}>
        <ContentHeader
          main={'Add Post'}
          brief={'Where you can add your post'}
        />
      </Card>

      <Card className={'space-y-4'}>
        <AddPostForm />
      </Card>
    </div>
  );
}
