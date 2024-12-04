import React, { ReactElement } from 'react';
import { Card } from '../../shared/ui';
import { IAMList } from '../../features/access-controls/access-managements';

export default function IAMPage(): ReactElement {
  return (
    <Card>
      <IAMList />
    </Card>
  );
}
