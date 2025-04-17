import React, { ReactElement } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { RolePermissionsView } from './RolePermissionView';
import { UserRoleAssignmentView } from './UserRoleAssignment';
import { ContentHeader } from '../../../../../shared/ui';

export function IAMList(): ReactElement {
  return (
    <div className="container mx-auto py-6">
      <ContentHeader
        main={'Identity And Access Management'}
        brief={'Where you manipulate application identity & access managements'}
      />
      <div className="mt-6 rounded-lg border bg-white shadow">
        <Tabs defaultValue="role-permissions" className="w-full" isLazy>
          <div className="px-6 py-4">
            <TabList>
              <Tab value="role-permissions">Role Permissions</Tab>
              <Tab value="user-roles">User Role Assignment</Tab>
            </TabList>
          </div>
          <TabPanels>
            <TabPanel className="p-6">
              <RolePermissionsView />
            </TabPanel>

            <TabPanel className="p-6">
              <UserRoleAssignmentView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
