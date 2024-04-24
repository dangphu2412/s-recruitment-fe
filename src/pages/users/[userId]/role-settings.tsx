import React, { ReactElement } from 'react';
import { ContentHeader } from '../../../shared/ui/Header';
import { ContentLayout } from '../../../shared/ui/Box';
import { RoleSettings } from '../../../entities/user/ui/components/RoleSettings/RoleSettings';

export default function RoleSettingsPage(): ReactElement {
  return (
    <ContentLayout>
      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </ContentLayout>
  );
}
