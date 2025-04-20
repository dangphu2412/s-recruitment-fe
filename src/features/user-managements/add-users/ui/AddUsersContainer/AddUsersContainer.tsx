import React from 'react';
import { AddUserDrawer } from './AddUserDrawer';
import { AddButton } from '../../../../../shared/ui/Button';
import { HeaderDrawerAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { StepIds } from '../../../user-guide/user-management-guide';

export function AddUsersContainer(): React.ReactElement {
  return (
    <HeaderDrawerAction
      id={StepIds.BTN_ADD_USER}
      triggerButton={AddButton}
      content={AddUserDrawer}
    />
  );
}
