import React, { ReactElement } from 'react';
import { ContentLayout } from 'src/system/app/internal/components/Box';
import { ContentHeader } from 'src/system/app/internal/components/Header';
import { RoleSettings } from 'src/user/app/components/RoleSettings/RoleSettings';

export default function RoleSettingsPage(): ReactElement {
  return (
    <ContentLayout>
      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </ContentLayout>
  );
}
