import { Card, ContentHeader } from '../../../shared/ui';
import React from 'react';
import { ContentHeaderLayout } from '../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { MyRequestsTable } from '../../../features/activities/requests/my/my-requests-table/ui/MyRequestsTable/MyRequestsTable';
import { AddActivityRequestContainer } from '../../../features/activities/requests/my/add-activity-request';
import { HeaderActionGroup } from '../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { MyDetailRequest } from '../../../features/activities/requests/my/my-detail-request/ui/MyDetailRequest';
import { UserGuideButton } from '../../../shared/user-guide/UserGuideButton';
import { MyActivityGuideSteps } from '../../../features/activities/requests/my/user-guide/activity-guide';
import { SearchMyActivities } from '../../../features/activities/requests/my/search-my-activities';

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
          <UserGuideButton
            feature={'my-requests'}
            steps={MyActivityGuideSteps}
          />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <SearchMyActivities />
      <MyRequestsTable />
      <MyDetailRequest />
    </Card>
  );
}
