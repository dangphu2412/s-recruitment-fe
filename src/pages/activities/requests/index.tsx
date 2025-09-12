import { Card, ContentHeader } from '../../../shared/ui';
import { ContentHeaderLayout } from '../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import React, { useEffect } from 'react';
import { UserRequestsTable } from '../../../features/activities/user-requests-table/ui/RequestsTable/UserRequestsTable';
import { PaginateActivities } from '../../../features/activities/paginate-activities';
import { SearchActivities } from '../../../features/activities/search-activities';
import { ApprovalUserRequestModal } from '../../../features/activities/approval-modal/ui/ApprovalUserRequestModal';
import { HeaderActionGroup } from '../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { UploadFileButtonWidget } from '../../../widgets/upload-file/UploadFileButtonWidget';
import { activityRequestApiClient } from '../../../entities/activities/api/activity-request-api.client';
import { useQueryClient } from 'react-query';
import {
  ACTIVITY_REQUESTS_QUERY_KEY,
  useActivityRequestStore
} from '../../../entities/activities/models/activity-request.model';
import { DetailRequest } from '../../../features/activities/detail-request/ui/DetailRequest';

export default function RequestsPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      useActivityRequestStore.setState(
        useActivityRequestStore.getInitialState()
      );
    };
  }, []);

  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Activity Requests'}
          brief={'Where you manage member requests'}
        />
        <HeaderActionGroup>
          <UploadFileButtonWidget
            id={'upload-file'}
            title={'Upload File to Add User Requests'}
            resource={'upload-requests'}
            mutateFn={activityRequestApiClient.uploadRequests}
            accept={'.xlsx'}
            description={
              <>
                <p>
                  Only <b>.xlsx</b> files are supported
                </p>
                <p>The file must contain exactly one sheet</p>
                <p>
                  The sheet must follow the specified{' '}
                  <a
                    className={'underline'}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      'https://docs.google.com/spreadsheets/d/1_zp1fd9jufVg8VZkU3ulWTR2DPZh9kMcKqzZoVxzxfU/edit?gid=0#gid=0'
                    }
                  >
                    format
                  </a>
                </p>
              </>
            }
            onSuccess={() => {
              queryClient.invalidateQueries([ACTIVITY_REQUESTS_QUERY_KEY]);
            }}
          >
            Import Request Activities
          </UploadFileButtonWidget>
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <SearchActivities />
      <PaginateActivities />
      <UserRequestsTable />
      <ApprovalUserRequestModal />
      <DetailRequest />
    </Card>
  );
}
