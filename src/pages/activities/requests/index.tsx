import { Card, ContentHeader } from '../../../shared/ui';
import { ContentHeaderLayout } from '../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import React from 'react';
import { UserRequestsTable } from '../../../features/activities/user-requests-table/ui/RequestsTable/UserRequestsTable';
import { ApprovalUserRequest } from '../../../features/activities/approval-modal/ui/ApprovalUserRequest';

export default function RequestsPage() {
  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Activity Requests'}
          brief={'Where you manage member requests'}
        />
      </ContentHeaderLayout>

      <UserRequestsTable />
      <ApprovalUserRequest />
    </Card>
  );
}
