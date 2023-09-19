import React, { ReactElement } from 'react';
import { ContentLayout } from 'src/system/app/internal/components/Box';
import { AccessControlList } from 'src/user/app/components/AccessControlList/AccessControlList';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <AccessControlList />
    </ContentLayout>
  );
}
