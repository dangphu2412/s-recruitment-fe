import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../../shared/ui';
import { RoleSettings } from '../../../features/user-managements/user-roles-setting';
import { BackButton } from '../../../shared/ui/Button/BackButton';

export default function RoleSettingsPage(): ReactElement {
  return (
    <Card className={'space-y-4'}>
      <BackButton />

      <ContentHeader main={'User Roles'} brief={'Where you setting roles'} />

      <RoleSettings />
    </Card>
  );
}
