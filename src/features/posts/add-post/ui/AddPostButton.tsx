import React from 'react';
import { useRouter } from 'next/router';
import { AddButton } from '../../../../shared/ui/Button';

export function AddPostButton(): React.ReactElement {
  const { push } = useRouter();

  function handleNavigateToAddPost() {
    push('/posts/add');
  }

  return <AddButton onClick={handleNavigateToAddPost} />;
}
