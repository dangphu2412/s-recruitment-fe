import { Card, ContentHeader } from '../../../shared/ui';
import React from 'react';
import { ContentHeaderLayout } from '../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { MyRequestsTable } from '../../../features/activities/my-requests-table/ui/MyRequestsTable/MyRequestsTable';
import { AddActivityRequestContainer } from '../../../features/activities/add-activity-request';
import { HeaderActionGroup } from '../../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export default function MyRequestActivityPage() {
  return (
    <Card className={'space-y-4'}>
      <ContentHeaderLayout>
        <ContentHeader
          main={'My requests activity'}
          brief={'Where you manage your activity request'}
        />
        <HeaderActionGroup>
          <AddActivityRequestContainer />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <MyRequestsTable />
    </Card>
  );
}
