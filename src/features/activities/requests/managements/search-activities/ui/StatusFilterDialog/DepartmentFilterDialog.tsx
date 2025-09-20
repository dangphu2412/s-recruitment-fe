import React from 'react';
import { useActivityRequestStore } from '../../../../../../../entities/activities/models/activity-request.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';
import { REQUEST_ACTIVITY_STATUS_DIALOG_MODEL } from '../../../../../../../entities/activities/config/constants/request-activity-status.enum';

export function StatusFilterDialog(): React.ReactElement {
  const value = useActivityRequestStore(state => state.status);
  const toggleValues = useActivityRequestStore(state => state.toggleValues);

  return (
    <DropDownMultipleCheckboxSelection
      title={'Status'}
      value={value}
      options={REQUEST_ACTIVITY_STATUS_DIALOG_MODEL}
      onSelect={status => toggleValues('status', status.id)}
    />
  );
}
