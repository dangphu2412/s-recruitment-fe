import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../../shared/ui';
import { RoleSettings } from '../../../features/user-managements/user-roles-setting';

export default function RoleSettingsPage(): ReactElement {
  return (
    <Card>
      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </Card>
  );
}
