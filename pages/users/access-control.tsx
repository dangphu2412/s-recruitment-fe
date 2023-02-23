import React, { ReactElement } from 'react';
import { ContentLayout } from '@modules/shared/components/Box';
import { AccessControlList } from '@modules/user/components/AccessControlList/AccessControlList';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { RoleAssignment } from '@modules/user/components/RoleAssignment/RoleAssignment';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <Tabs isLazy={true}>
        <TabList>
          <Tab>Access Control</Tab>

          <Tab>Role Assignment</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AccessControlList />
          </TabPanel>

          <TabPanel>
            <RoleAssignment />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ContentLayout>
  );
}
