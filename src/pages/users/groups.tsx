import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { UserGroupTable } from '../../features/user-managements/user-groups-table';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import {
  HeaderDrawerAction,
  HeaderActionGroup
} from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { AddButton } from '../../shared/ui/Button';
import { AddUserGroupDrawer } from '../../features/user-managements/add-user-groups/ui/AddUserGroupDrawer/AddUserGroupDrawer';

export default function UserGroupsPage(): ReactElement {
  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'User Groups Management'}
          brief={'Where you manage our organization user groups'}
        />

        <HeaderActionGroup>
          <HeaderDrawerAction
            id={'create-groups'}
            triggerButton={AddButton}
            content={AddUserGroupDrawer}
          />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <UserGroupTable />
    </Card>
  );
}
