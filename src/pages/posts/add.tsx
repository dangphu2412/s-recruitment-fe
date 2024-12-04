import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { AddPostForm } from '../../features/posts/add-post/ui/AddPostForm';
import { BackButton } from '../../shared/ui/Button/BackButton';

export default function AddPostPage(): ReactElement {
  return (
    <div className={'space-y-2'}>
      <Card className={'space-y-4'}>
        <BackButton />

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
