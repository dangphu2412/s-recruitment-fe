import React, { ReactElement } from 'react';
import { ContentLayout } from '../../src/shared/ui/Box';
import { AccessControlList } from '../../src/entities/user/ui/components/AccessControlList/AccessControlList';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <AccessControlList />
    </ContentLayout>
  );
}
