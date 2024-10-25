import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { UserGroupTable } from '../../features/user-managements/user-groups-table';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { AddUserGroupContainer } from '../../features/user-managements/add-user-groups';

export default function UserGroupsPage(): ReactElement {
  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'User Groups Management'}
          brief={'Where you manage our organization user groups'}
        />

        <HeaderActionGroup>
          <AddUserGroupContainer />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <UserGroupTable />
    </Card>
  );
}
