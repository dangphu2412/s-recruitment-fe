import React, { ReactElement } from 'react';
import { ContentHeader } from '../../../src/shared/ui/Header';
import { ContentLayout } from '../../../src/shared/ui/Box';
import { RoleSettings } from '../../../src/entities/user/ui/components/RoleSettings/RoleSettings';

export default function RoleSettingsPage(): ReactElement {
  return (
    <ContentLayout>
      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </ContentLayout>
  );
}
