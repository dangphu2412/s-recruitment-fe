import React from 'react';
import { AddActivityRequestModal } from './AddUserDrawer';
import { AddButton } from '../../../../../shared/ui/Button';
import { HeaderModalAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { StepIds } from '../../../user-guide/activity-guide';

export function AddActivityRequestContainer(): React.ReactElement {
  return (
    <HeaderModalAction
      id={StepIds.BTN_ADD_MY_REQUEST}
      triggerButton={AddButton}
      content={AddActivityRequestModal}
    />
  );
}
