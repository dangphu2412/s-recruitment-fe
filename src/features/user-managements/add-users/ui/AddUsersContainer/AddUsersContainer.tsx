import React from 'react';
import { AddUserDrawer } from './AddUserDrawer';
import { AddButton } from '../../../../../shared/ui/Button';
import { HeaderDrawerAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export function AddUsersContainer(): React.ReactElement {
  return (
    <HeaderDrawerAction
      id={'create-user'}
      triggerButton={AddButton}
      content={AddUserDrawer}
    />
  );
}
