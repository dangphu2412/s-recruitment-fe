import React from 'react';
import { AddUserDrawer } from './AddUserDrawer';
import { AddButton } from '../../../../../shared/ui/Button';
import { HeaderAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export function AddUsersContainer(): React.ReactElement {
  return (
    <HeaderAction
      id={'create-user'}
      triggerButton={AddButton}
      content={AddUserDrawer}
    />
  );
}
