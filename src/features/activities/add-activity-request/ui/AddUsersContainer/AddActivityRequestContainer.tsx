import React from 'react';
import { AddActivityRequestModal } from './AddUserDrawer';
import { AddButton } from '../../../../../shared/ui/Button';
import { HeaderModalAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export function AddActivityRequestContainer(): React.ReactElement {
  return (
    <HeaderModalAction
      id={'create-activity-request'}
      triggerButton={AddButton}
      content={AddActivityRequestModal}
    />
  );
}
