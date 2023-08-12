import React, { ReactElement } from 'react';
import { ContentLayout } from 'src/shared/components/Box';
import { ContentHeader } from 'src/shared/components/Header';
import { RoleSettings } from 'src/user/components/RoleSettings/RoleSettings';

export default function RoleSettingsPage(): ReactElement {
  return (
    <ContentLayout>
      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </ContentLayout>
  );
}
