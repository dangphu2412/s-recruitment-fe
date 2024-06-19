import React, { ReactElement } from 'react';
import { Card } from '../../shared/ui';
import { AccessControlList } from '../../features/access-controls/access-managements';

export default function AccessControlPage(): ReactElement {
  return (
    <Card>
      <AccessControlList />
    </Card>
  );
}
