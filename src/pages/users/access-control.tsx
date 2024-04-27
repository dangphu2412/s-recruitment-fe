import React, { ReactElement } from 'react';
import { ContentLayout } from '../../shared/ui';
import { AccessControlList } from '../../features/access-controls/access-managements';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <AccessControlList />
    </ContentLayout>
  );
}
