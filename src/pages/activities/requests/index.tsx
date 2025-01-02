import { Card, ContentHeader } from '../../../shared/ui';
import { ContentHeaderLayout } from '../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import React from 'react';
import { UserRequestsTable } from '../../../features/activities/user-requests-table/ui/RequestsTable/UserRequestsTable';
import { PaginateActivities } from '../../../features/activities/paginate-activities';
import { SearchActivities } from '../../../features/activities/search-activities';
import { ApprovalUserRequestModal } from '../../../features/activities/approval-modal/ui/ApprovalUserRequestModal';

export default function RequestsPage() {
  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Activity Requests'}
          brief={'Where you manage member requests'}
        />
      </ContentHeaderLayout>

      <SearchActivities />
      <PaginateActivities />
      <UserRequestsTable />
      <ApprovalUserRequestModal />
    </Card>
  );
}
