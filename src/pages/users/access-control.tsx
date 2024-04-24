import React, { ReactElement } from 'react';
import { ContentLayout } from '../../shared/ui/Box';
import { AccessControlList } from '../../entities/user/ui/components/AccessControlList/AccessControlList';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <AccessControlList />
    </ContentLayout>
  );
}
