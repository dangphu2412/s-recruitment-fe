import React from 'react';
import { LogWorkStatus } from '../../../../entities/activities/config/constants/log-work-status.enum';
import { DropDownMultipleCheckboxSelection } from '../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';
import { useActivityLogListStore } from '../../../../entities/activities/models/activity-log.model';

export function StatusFilterDialog(): React.ReactElement {
  const value = useActivityLogListStore(state => state.values.workStatus);
  const toggleValue = useActivityLogListStore(state => state.toggleValue);

  const options = [
    { id: LogWorkStatus.LATE, name: 'Late' },
    { id: LogWorkStatus.ON_TIME, name: 'On time' },
    { id: LogWorkStatus.NOT_FINISHED, name: 'Not finished' }
  ];

  return (
    <DropDownMultipleCheckboxSelection
      title={'Status'}
      value={value}
      options={options}
      onSelect={option => toggleValue('workStatus', option.id)}
    />
  );
}
