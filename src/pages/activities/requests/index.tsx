import { Card, ContentHeader } from '../../../shared/ui';
import { ContentHeaderLayout } from '../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import React from 'react';
import { UserRequestsTable } from '../../../features/activities/user-requests-table/ui/RequestsTable/UserRequestsTable';
import { PaginateActivities } from '../../../features/activities/paginate-activities';
import { SearchActivities } from '../../../features/activities/search-activities';
import { ApprovalUserRequestModal } from '../../../features/activities/approval-modal/ui/ApprovalUserRequestModal';
import { HeaderActionGroup } from '../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { UploadFileButtonWidget } from '../../../widgets/upload-file/UploadFileButtonWidget';
import { activityRequestApiClient } from '../../../entities/activities/api/activity-request-api.client';

export default function RequestsPage() {
  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Activity Requests'}
          brief={'Where you manage member requests'}
        />
        <HeaderActionGroup>
          <UploadFileButtonWidget
            resource={'upload-requests'}
            mutateFn={activityRequestApiClient.uploadRequests}
          >
            Upload requests
          </UploadFileButtonWidget>
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <SearchActivities />
      <PaginateActivities />
      <UserRequestsTable />
      <ApprovalUserRequestModal />
    </Card>
  );
}
