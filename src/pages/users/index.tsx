import React, { ReactElement } from 'react';
import { Card } from 'src/shared/ui/Card';
import { ContentHeader } from 'src/shared/ui/Header';
import { AddUsersContainer } from '../../features/user-managements/add-users';
import { SearchUsersContainer } from '../../features/user-managements/search-users';
import { PaginateUsersContainer } from '../../features/user-managements/paginate-users';
import { UsersOverviewTable } from '../../features/user-managements/users-table';
import { UserPaymentView } from '../../features/user-managements/user-payment-view/ui/UserPaymentView';
import { UpdateUserToMemberContainer } from '../../features/user-managements/update-to-member';
import { ImportUsersContainer } from '../../features/user-managements/import-users';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { activityMdmApiClient } from '../../entities/activities/api/activity-mdm-api.client';
import { UploadFileButtonWidget } from '../../widgets/upload-file/UploadFileButtonWidget';
import { UserGuideButton } from '../../shared/user-guide/UserGuideButton';
import {
  StepIds,
  UserManagementGuideSteps
} from '../../features/user-managements/user-guide/user-management-guide';

export default function AdministratorPage(): ReactElement {
  return (
    <Card>
      <UserGuideButton steps={UserManagementGuideSteps} />

      <ContentHeaderLayout>
        <ContentHeader
          main={'Administrator management'}
          brief={'Where you can create, update and change user active'}
        />

        <HeaderActionGroup>
          <AddUsersContainer />
          <ImportUsersContainer />
          <UpdateUserToMemberContainer />
          <UploadFileButtonWidget
            id={StepIds.BTN_UPLOAD_DEVICE_USERS}
            resource={'upload-logs'}
            mutateFn={activityMdmApiClient.uploadUsers}
          >
            Upload device users
          </UploadFileButtonWidget>
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <div className={'flex flex-col gap-2'}>
        <SearchUsersContainer />
        <PaginateUsersContainer />
        <UsersOverviewTable />
      </div>
      <UserPaymentView />
    </Card>
  );
}
