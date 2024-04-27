import React, { ReactElement } from 'react';
import { ContentLayout, ContentHeader } from '../../../shared/ui';
import { RoleSettings } from '../../../features/user-managements/user-roles-setting';

export default function RoleSettingsPage(): ReactElement {
  return (
    <ContentLayout>
      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </ContentLayout>
  );
}
