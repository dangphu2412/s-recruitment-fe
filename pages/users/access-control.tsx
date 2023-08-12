import React, { ReactElement } from 'react';
import { ContentLayout } from 'src/shared/components/Box';
import { AccessControlList } from 'src/user/components/AccessControlList/AccessControlList';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <AccessControlList />
    </ContentLayout>
  );
}
